package com.umi.admin.domain.dto;

import lombok.Data;

@Data
public class ModifyPasswordDto {
    private String oldPass;
    private String newPass;
}
