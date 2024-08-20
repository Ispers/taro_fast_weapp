package com.fastweapp.fw.Interceptor;

import com.alibaba.fastjson.JSON;
import com.fastweapp.fw.common.Constants;
import com.fastweapp.fw.domain.User;
import com.fastweapp.fw.exception.BadRequestException;
import com.fastweapp.fw.jwt.CurrentUser;
import com.fastweapp.fw.jwt.JwtInfo;
import com.fastweapp.fw.jwt.JwtTool;
import com.fastweapp.fw.jwt.RedisKey;
import com.fastweapp.fw.service.UserService;
import com.fastweapp.fw.utils.BeanUtil;
import com.fastweapp.fw.utils.RedisUtils;
import com.fastweapp.fw.utils.SecurityUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.HashMap;

@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Autowired
    private RedisUtils redisUtils;
    @Autowired
    private UserService userService;

    // 在Controller执行之前调用，如果返回false，controller不执行
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setContentType("application/json;charset=UTF-8");
        String tokenName = Constants.TOKEN_NAME;
        // 从请求头获取Token
        String token = request.getHeader(tokenName);
        // 如果前端没有携带token返回json数据
        if (StringUtils.isBlank(token)) {
            PrintWriter pw = response.getWriter();
            HashMap<String, String> res = new HashMap<>();
            res.put("resultCode", "401");
            res.put("resultMsg", "用户未登录");
            pw.write(JSON.toJSONString(res));
            return false;
        }
        // 解析token
        String jwtId = JwtTool.checkJwtToken(token);
        if (jwtId == null) {
            throw new BadRequestException("401", "用户未登录");
        }
        // 获取用户ID
        String tokenUserId = JwtTool.getUserId(token);
        // token存在，但是redis不存在,要么是失效，要么是强制下线
        JwtInfo jwt = (JwtInfo) redisUtils.get(RedisKey.getToken(tokenUserId, jwtId));
        if (jwt == null || !jwt.getToken().equals(token)) {
            throw new BadRequestException("401", "您当前登录的账号已失效，请重新登录");
        }
        // 获取用户ID
        Long userId = jwt.getUserId();
        // 查询用户
        User user = userService.selectUserByUserId(userId);
        // 判断用户是否存在
        if (user == null) {
            throw new BadRequestException("401", "用户不存在");
        }
        // 根据业务需求增加其他判断条件
        // if (user.getIsAdmin()) {
        //     throw new BadRequestException("超级管理员用户已禁用！");
        // }
        // Token续期
        redisUtils.expire(RedisKey.getToken(tokenUserId, jwtId), Constants.TOKEN_EXPIRE_TIME);
        //将登录用户放到ThreadLocal变量变量中，方便业务获取当前登录用户
        CurrentUser currentUser = new CurrentUser();
        String[] ignoreProperties = {"userId"};
        BeanUtil.copyProperties(user, currentUser, ignoreProperties);
        currentUser.setUserId(userId);
        // 当前用户放到ThreadLocal变量变量中
        SecurityUtils.setCurrentUser(currentUser);
        return true;
    }

    //在Controller执行之前调用，如果返回false，controller不执行
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    //页面渲染之后调用，一般用于资源清理操作
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }
}
