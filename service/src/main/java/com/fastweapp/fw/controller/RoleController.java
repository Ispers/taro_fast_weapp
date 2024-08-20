package com.fastweapp.fw.controller;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.service.RoleService;
import com.fastweapp.fw.utils.ResultResponse;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/role")
@RequiredArgsConstructor
public class RoleController {
    private final RoleService roleService;

    @GetMapping("/getCurrentUserRoleInfo")
    @Log(module = "角色", events = "获取当前登录用户角色信息")
    public ResultResponse<List<Map<String, Object>>> getCurrentUserRoleInfo() {
        List<Map<String, Object>> res = roleService.getCurrentUserRoleInfo(SecurityUtils.getCurrentUserId());
        return ResultResponse.success("获取当前登录用户角色信息成功", res);
    }
}
