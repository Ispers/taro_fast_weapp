package com.fastweapp.fw.jwt;

import lombok.Data;

import java.io.Serializable;

@Data
public class CurrentUser implements Serializable {
    private static final long serialVersionUID = -327159787234887122L;
    private String jwtId;
    private Long userId;
    private String wxOpenid;
    private String username;
    private String password;
    private String nickname;
    private String realName;
    private String address;
    private String phone;
    private String email;
    private String birthday;
    private Integer gender;
    private String avatarUrl;
    private Integer enabled;
    private Integer isAdmin;
    private String wxUnionid;
    private String createTime;
    private String createBy;
    private String updateTime;
    private String updateBy;
    private String pwdResetTime;
    private String deleted;
    private String deptId;
}
