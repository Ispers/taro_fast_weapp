package com.umi.admin.domain.dto;

import lombok.Data;

@Data
public class OperationLogDto {
    private String username;
    private Boolean operationStatus;
    private String beginDate;
    private String endDate;
}
