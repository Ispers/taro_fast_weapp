package com.fastweapp.fw.aspect;

import com.alibaba.fastjson.JSONObject;
import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.OperationLog;
import com.fastweapp.fw.jwt.CurrentUser;
import com.fastweapp.fw.service.OperationLogService;
import com.fastweapp.fw.utils.IpUtil;
import com.fastweapp.fw.utils.SecurityUtils;
import io.netty.util.concurrent.FastThreadLocal;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.aspectj.lang.reflect.MethodSignature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Method;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Objects;

/**
 * 系统日志切面
 */
@Aspect
@Component
@Slf4j
public class LogAspect {
    @Autowired
    private OperationLogService operationLogService;

    /**
     * FastThreadLocal 依赖于  netty,如果不想用netty，可以使用jdk自带的 ThreadLocal
     */
    final FastThreadLocal<OperationLog> logFastThreadLocal = new FastThreadLocal<>();
    final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");


    /**
     * 切点---controller下的所有文件
     */
    @Pointcut(value = "execution(* com.umi.admin.controller..*(..)))")
    public void logPointcut() {
    }

    /**
     * 请求前置通知
     */
    @Before("logPointcut()")
    public void beforLogger(JoinPoint joinPoint) {
        // 获取请求参数
        String params = Arrays.toString(joinPoint.getArgs());
        // 获取当前登陆用户
        CurrentUser user = SecurityUtils.getCurrentUser();
        Long userId = null;
        String userName = null;
        String nickname = null;

        if (user != null) {
            userId = user.getUserId();
            userName = user.getUsername();
            nickname = user.getNickname();
        }
        LocalDateTime now = LocalDateTime.now();

        log.info("--------请求前置日志输出开始--------");
        ServletRequestAttributes attributes = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = Objects.requireNonNull(attributes).getRequest();

        log.info("请求访问时间: {}", dateTimeFormatter.format(now));
        // 获取请求url
        String requestUrl = request.getRequestURL().toString();
        log.info("请求url: {}", requestUrl);
        // 获取method
        log.info("请求方式: {}", request.getMethod());
        log.info("请求参数列表: {}", params);
        log.info("操作人ID: {}", userId);

        // 验证请求方法是否带有操作日志注解
        Method signature = ((MethodSignature) joinPoint.getSignature()).getMethod();
        Log log = signature.getAnnotation(Log.class);
        if (log != null) {
            // 操作日志记录
            OperationLog operationLog = OperationLog.getInstance();
            operationLog.setAddTime(now);
            operationLog.setOperationModule(log.module());
            operationLog.setOperationEvents(log.events());
            operationLog.setOperationData(params);
            operationLog.setOperationUrl(requestUrl);
            // 操作人ID
            operationLog.setOperationUserId(userId);
            operationLog.setOperationUsername(userName);
            operationLog.setOperationNickname(nickname);
            // IP地址
            operationLog.setOperationIp(IpUtil.getIpAddr(request));
            logFastThreadLocal.set(operationLog);
        }
    }

    /**
     * 请求后置通知，请求完成会进入到这个方法
     */
    @AfterReturning(value = "logPointcut()", returning = "result")
    public void afterReturningLogger(Object result) {
        // 程序运时间(毫秒)
        log.info("请求结束时间: {}", dateTimeFormatter.format(LocalDateTime.now()));
        log.info("--------后台管理请求后置日志输出完成--------");

        // 保存操作日志
        OperationLog operationLog = logFastThreadLocal.get();
        if (operationLog != null) {
            if (operationLog.getOperationUserId() == null) {
                // 再次尝试获取当前用户信息
                CurrentUser user = SecurityUtils.getCurrentUser();
                if (user != null) {
                    operationLog.setOperationUserId(user.getUserId());
                    operationLog.setOperationUsername(user.getUsername());
                    operationLog.setOperationNickname(user.getNickname());
                }
            }
            operationLog.setOperationStatus(true);
            // 阿里巴巴fastjson
            operationLog.setOperationResult(JSONObject.toJSONString(result));
            // 调用具体的 service 保存到数据库中
            operationLogService.saveOperationLog(operationLog);
            // 移除本地线程数据
            logFastThreadLocal.remove();
        }
    }


    /**
     * 异常通知，请求异常会进入到这个方法
     */
    @AfterThrowing(value = "logPointcut()", throwing = "throwable")
    public void throwingLogger(Throwable throwable) {
        log.error("ErrorMessage：请根据异常产生时间前往异常日志查看相关信息");
        log.error("--------后台管理请求异常日志输出完成--------");

        // 保存操作日志
        OperationLog operationLog = logFastThreadLocal.get();
        if (operationLog != null) {
            operationLog.setOperationStatus(false);
            String throwableStr = throwable.toString();
            if (throwableStr.contains(":")) {
                throwableStr = throwableStr.substring(throwableStr.indexOf(":") + 1);
            }
            operationLog.setOperationResult(throwableStr);
            // 调用具体的 service 保存到数据库中
            operationLogService.saveOperationLog(operationLog);
            // 移除本地线程数据
            logFastThreadLocal.remove();
        }
    }
}
