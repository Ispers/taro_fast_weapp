package com.fastweapp.fw.domain.dto;

import lombok.Data;

@Data
public class AddMenuDto {
    private Long menuId;
    private Long pid;
    private Integer type;
    private String menuName;
    private String page;
    private Integer sort;
    private String icon;
    private String url;
    private Integer hidden;
    private Integer enabled;

    private String createBy;
    private String updateBy;
}
