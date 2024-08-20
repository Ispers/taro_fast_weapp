package com.fastweapp.fw.controller;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.User;
import com.fastweapp.fw.domain.dto.ModifyPasswordDto;
import com.fastweapp.fw.exception.BadRequestException;
import com.fastweapp.fw.service.UserService;
import com.fastweapp.fw.utils.ResultResponse;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/center/modify")
    @Log(module = "用户", events = "个人中心-编辑资料")
    public ResultResponse<Object> centerModifyInfo(@RequestBody User resource) {
        if (!resource.getUserId().equals(SecurityUtils.getCurrentUserId())) {
            throw new BadRequestException("信息有误");
        }
        userService.centerModifyInfo(resource);
        return ResultResponse.success("修改成功", null);
    }

    @PostMapping("/center/modifyPass")
    @Log(module = "用户", events = "个人中心-修改密码")
    public ResultResponse<Object> centerModifyPassword(@RequestBody ModifyPasswordDto modifyPasswordDto) {
        userService.centerModifyPassword(modifyPasswordDto);
        return ResultResponse.success("修改成功", null);
    }
}
