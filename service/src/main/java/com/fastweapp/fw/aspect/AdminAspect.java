package com.fastweapp.fw.aspect;

import com.fastweapp.fw.exception.BadRequestException;
import com.fastweapp.fw.jwt.CurrentUser;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.stereotype.Component;

@Aspect
@Component
@Slf4j
public class AdminAspect {
    @Pointcut("@annotation(com.fastweapp.fw.annotation.Admin)")
    public void adminPointcut() {
    }

    @Before("adminPointcut()")
    public void beforLogger(JoinPoint joinPoint) {
        CurrentUser user = SecurityUtils.getCurrentUser();
        if (user.getIsAdmin() == 0) {
            throw new BadRequestException("当前身份无法访问");
        }
    }
}
