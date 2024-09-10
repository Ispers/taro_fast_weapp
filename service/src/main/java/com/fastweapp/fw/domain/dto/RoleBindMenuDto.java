package com.fastweapp.fw.domain.dto;

import lombok.Data;

import java.util.List;

@Data
public class RoleBindMenuDto {
    private List<Long> selectedMenuIds;
    private String menuJsonArr;
    private Long roleId;
}
