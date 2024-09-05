package com.fastweapp.fw.domain.dto;

import lombok.Data;

@Data
public class RoleDto {
    private String name;
    private String code;
    private Integer enabled;
    private String beginDate;
    private String endDate;
}
