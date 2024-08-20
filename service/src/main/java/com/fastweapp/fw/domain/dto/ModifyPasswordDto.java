package com.fastweapp.fw.domain.dto;

import lombok.Data;

@Data
public class ModifyPasswordDto {
    private String oldPass;
    private String newPass;
}
