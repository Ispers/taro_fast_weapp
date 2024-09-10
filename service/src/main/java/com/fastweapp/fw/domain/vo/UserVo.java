package com.fastweapp.fw.domain.vo;

import lombok.Data;

@Data
public class UserVo {
    private String userId;
    private String wxOpenId;
    private String username;
    private String nickname;
    private String realName;
    private String address;
    private String phone;
    private String email;
    private Integer enabled;
    private String birthday;
    private Integer gender;
    private String avatarUrl;
    private Integer isAdmin;
    private String wxUnionid;
    private String createTime;
    private Long deptId;
    private String deptName;
}
