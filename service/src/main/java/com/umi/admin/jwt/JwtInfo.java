package com.umi.admin.jwt;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class JwtInfo implements Serializable {
    /**
     * 唯一凭证
     */
    private String jwtId;
    /**
     * 用户ID
     */
    private Long userId;
    /**
     * token
     */
    private String token;
}
