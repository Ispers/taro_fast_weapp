package com.fastweapp.fw.controller;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.service.MenuService;
import com.fastweapp.fw.utils.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

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
