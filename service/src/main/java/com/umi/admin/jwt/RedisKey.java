package com.umi.admin.jwt;

/**
 * 生成RedisKey
 */
public interface RedisKey {
    /**
     * token
     */
    String TOKEN = "token:%s:%s";

    static String getToken(String id, String jwtId) {
        return String.format(TOKEN, id, jwtId);
    }
}
