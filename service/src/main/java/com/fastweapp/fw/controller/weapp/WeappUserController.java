package com.fastweapp.fw.controller.weapp;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.jwt.CurrentUser;
import com.fastweapp.fw.utils.ResultResponse;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/weapp/user")
@RequiredArgsConstructor
public class WeappUserController {
    @GetMapping("/info")
    @Log(module = "微信-用户", events = "获取用户信息")
    public ResultResponse<CurrentUser> wxLogin() {
        CurrentUser user = SecurityUtils.getCurrentUser();
        user.setPassword(null);
        return ResultResponse.success("获取用户信息成功", user);
    }
}
