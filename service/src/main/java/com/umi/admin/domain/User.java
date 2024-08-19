package com.umi.admin.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

import java.io.Serializable;

@Data
public class User implements Serializable {
    @TableId(type = IdType.AUTO)
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
