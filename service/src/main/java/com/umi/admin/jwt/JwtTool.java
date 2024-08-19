package com.umi.admin.jwt;

import cn.hutool.core.date.DateTime;
import cn.hutool.core.date.DateUtil;
import cn.hutool.core.lang.UUID;
import cn.hutool.jwt.JWT;

import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;

public class JwtTool {
    /**
     * 有效期
     **/
    private static int expDays = 7;

    /**
     * 签发者
     **/
    private static String issuer = "cakeAdmin";

    /**
     * 秘钥
     **/
    private static String key = "MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0";

    /**
     * 有效载荷
     **/
    public interface Payload {
        String userId = "userId";
        String jwtId = "jwtId";
    }

    /**
     * 创建token
     */
    public static JwtInfo createJwtToken(Long userId) {
        String jwtId = UUID.randomUUID().toString();
        try {
            String token = JWT.create()
                    .setIssuer(issuer)
                    .setIssuedAt(DateTime.now())
                    .setJWTId(jwtId)
                    .setCharset(Charset.forName("utf-8"))
                    //有效载荷
                    .setPayload(Payload.userId, userId)
                    .setPayload(Payload.jwtId, jwtId)
                    .setKey(key.getBytes("utf-8"))
                    //7天有效期
                    .setExpiresAt(DateUtil.offsetDay(DateUtil.date(), expDays))
                    .sign();
            JwtInfo jwtInfo = new JwtInfo();
            jwtInfo.setUserId(userId);
            jwtInfo.setJwtId(jwtId);
            jwtInfo.setToken(token);
            return jwtInfo;
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 验证token
     */
    public static String checkJwtToken(String token) {
        JWT jwt = JWT.of(token);
        //如果验证成功
        boolean status;
        try {
            status = jwt.setKey(key.getBytes("utf-8")).verify();
            if (status) {
                Object jwtId = jwt.getPayload(Payload.jwtId);
                if (jwtId != null) {
                    return jwtId.toString();
                }
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 验证token
     */
    public static String getUserId(String token) {
        JWT jwt = JWT.of(token);
        return jwt.getPayload(Payload.userId).toString();
    }
}
