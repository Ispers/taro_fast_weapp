package com.fastweapp.fw.domain.dto;

import lombok.Data;

@Data
public class AuthUserDto {
    private String username;
    private String password;
    private String code;
    private String uuid = "";
}
