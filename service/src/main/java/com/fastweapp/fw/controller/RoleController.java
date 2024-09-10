package com.fastweapp.fw.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.Role;
import com.fastweapp.fw.domain.dto.RoleBindMenuDto;
import com.fastweapp.fw.domain.dto.RoleDto;
import com.fastweapp.fw.service.RoleService;
import com.fastweapp.fw.utils.PageResult;
import com.fastweapp.fw.utils.ResultResponse;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

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

    @GetMapping("/getRole")
    @Log(module = "角色", events = "获取角色列表")
    public ResultResponse<PageResult<Role>> getRole(Page<Role> page, RoleDto dto) {
        PageResult<Role> res = roleService.getRole(page, dto);
        return ResultResponse.success("获取角色列表成功", res);
    }

    @PostMapping("/addRole")
    @Log(module = "角色", events = "新增角色")
    public ResultResponse<String> addRole(@RequestBody Role role) {
        roleService.addRole(role);
        return ResultResponse.success("新增角色成功");
    }

    @PostMapping("/modifyRole")
    @Log(module = "角色", events = "修改角色")
    public ResultResponse<String> modifyRole(@RequestBody Role role) {
        roleService.modifyRole(role);
        return ResultResponse.success("修改角色成功");
    }

    @PostMapping("/removeRole")
    @Log(module = "角色", events = "删除角色")
    public ResultResponse<String> removeRole(@RequestBody Set<Integer> ids) {
        roleService.removeRole(ids);
        return ResultResponse.success("删除角色成功");
    }

    @GetMapping("/getMenuJsonArr")
    @Log(module = "角色", events = "查询menuJsonArr")
    public ResultResponse<String> getMenuJsonArr(Long roleId) {
        String menuJsonArr = roleService.getMenuJsonArr(roleId);
        return ResultResponse.success("查询menuJsonArr", menuJsonArr);
    }

    @PostMapping("/bindMenu")
    @Log(module = "角色", events = "角色绑定菜单")
    public ResultResponse<String> bindMenu(@RequestBody RoleBindMenuDto dto) {
        roleService.bindMenu(dto);
        return ResultResponse.success("角色绑定菜单成功");
    }
}
