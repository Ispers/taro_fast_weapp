package com.fastweapp.fw.controller;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.dto.AddMenuDto;
import com.fastweapp.fw.domain.dto.MenuDto;
import com.fastweapp.fw.service.MenuService;
import com.fastweapp.fw.utils.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
    @Log(module = "菜单", events = "获取当前登录用户菜单（路由）")
    public ResultResponse<List<Map<String, Object>>> getCurrentUserMenuInfo() {
        List<Map<String, Object>> res = menuService.getCurrentUserMenuInfo();
        return ResultResponse.success("获取当前登录用户菜单（路由）信息成功", res);
    }

    @GetMapping("/getMenuInfo")
    @Log(module = "菜单", events = "获取菜单（路由）")
    public ResultResponse<List<Map<String, Object>>> getMenuInfo(MenuDto dto) {
        List<Map<String, Object>> res = menuService.getMenuInfo(dto);
        return ResultResponse.success("获取菜单（路由）信息成功", res);
    }

    @GetMapping("/getIcons")
    @Log(module = "菜单", events = "获取图标")
    public ResultResponse<List<Map<String, Object>>> getIcons(@RequestParam String iconName) {
        List<Map<String, Object>> res = menuService.getIcons(iconName);
        return ResultResponse.success("获取图标成功", res);
    }

    @PostMapping("/addMenu")
    @Log(module = "菜单", events = "新增菜单")
    public ResultResponse<String> addMenu(@RequestBody AddMenuDto dto) {
        menuService.addMenu(dto);
        return ResultResponse.success("新增菜单成功");
    }

    @PostMapping("/modifyMenu")
    @Log(module = "菜单", events = "修改菜单")
    public ResultResponse<String> modifyMenu(@RequestBody AddMenuDto dto) {
        menuService.modifyMenu(dto);
        return ResultResponse.success("修改菜单成功");
    }

    @PostMapping("/removeMenu")
    @Log(module = "菜单", events = "删除菜单")
    public ResultResponse<String> removeMenu(@RequestBody Set<Integer> ids) {
        menuService.removeMenu(ids);
        return ResultResponse.success("删除菜单成功");
    }
}
