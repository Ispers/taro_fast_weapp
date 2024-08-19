package com.umi.admin.domain;

import lombok.Data;

@Data
public class Log {
    private Long id;
    private Long operationUserId;
    private String operationUsername;
    private String operationNickname;
    private String operationModule;
    private String operationEvents;
    private String operationUrl;
    private String operationData;
    private Boolean operationStatus;
    private String operationResult;
    private String operationIp;
    private String addTime;
    private Boolean deleted;
}
