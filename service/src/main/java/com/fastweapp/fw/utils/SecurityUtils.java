package com.fastweapp.fw.utils;

import com.fastweapp.fw.jwt.CurrentUser;
import lombok.extern.slf4j.Slf4j;

/**
 * 当前登录的用户操作工具类
 */
@Slf4j
public class SecurityUtils {


    private static final ThreadLocal<CurrentUser> CURRENT_USER = new ThreadLocal<CurrentUser>();

    public static void setCurrentUser(CurrentUser currentUser) {
        CURRENT_USER.set(currentUser);
    }

    /**
     * 获取当前登录的用户
     *
     * @return UserDetails
     */
    public static CurrentUser getCurrentUser() {
        return CURRENT_USER.get();
    }

    /**
     * 获取系统用户名称
     *
     * @return 系统用户名称
     */
    public static String getCurrentUsername() {
        return CURRENT_USER.get().getUsername();
    }

    /**
     * 获取系统用户ID
     *
     * @return 系统用户ID
     */
    public static Long getCurrentUserId() {
        return CURRENT_USER.get().getUserId();
    }

    public static void remove() {
        CURRENT_USER.remove();
    }
}
