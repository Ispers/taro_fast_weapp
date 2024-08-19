package com.umi.admin.controller;

import com.umi.admin.annotation.Log;
import com.umi.admin.service.MenuService;
import com.umi.admin.utils.ResultResponse;
import com.umi.admin.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Slf4j
@RestController
@RequestMapping("/api/menu")
@RequiredArgsConstructor
public class MenuController {
    private final MenuService menuService;

    @GetMapping("/getCurrentUserMenuInfo")
    @Log(module = "菜单", events = "获取当前登录用户内部菜单（路由）")
    public ResultResponse<List<Map<String, Object>>> getCurrentUserMenuInfo() {
        List<Map<String, Object>> res = menuService.getCurrentUserMenuInfo();
        return ResultResponse.success("获取当前登录用户内部菜单（路由）信息", res);
    }
}
