package com.fastweapp.fw.domain;

import lombok.Data;

@Data
public class Role {
    private Long roleId;
    private String name;
    private String code;
    private String description;
    private Integer enabled;
    private String createBy;
    private String updateBy;
    private String createTime;
    private String updateTime;
}
