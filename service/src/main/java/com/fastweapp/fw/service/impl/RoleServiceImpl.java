package com.fastweapp.fw.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Role;
import com.fastweapp.fw.domain.dto.RoleBindMenuDto;
import com.fastweapp.fw.domain.dto.RoleDto;
import com.fastweapp.fw.mapper.RoleMapper;
import com.fastweapp.fw.service.RoleService;
import com.fastweapp.fw.utils.PageResult;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleMapper roleMapper;

    @Override
    public List<Map<String, Object>> getCurrentUserRoleInfo(Long userId) {
        return roleMapper.selectRoleByUserId(userId);
    }

    @Override
    public PageResult<Role> getRole(Page<Role> page, RoleDto dto) {
        IPage<Role> rolePage = roleMapper.selectRole(page, dto);
        return PageResult.get(rolePage);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addRole(Role role) {
        role.setCreateBy(SecurityUtils.getCurrentUsername());
        roleMapper.insertRole(role);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyRole(Role role) {
        role.setUpdateBy(SecurityUtils.getCurrentUsername());
        roleMapper.updateRole(role);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void removeRole(Set<Integer> ids) {
        // 删除用户角色关联
        roleMapper.deleteRoleUser(ids);
        roleMapper.deleteRole(ids);
    }

    @Override
    public String getMenuJsonArr(Long roleId) {
        return roleMapper.selectMenuJsonArrByRoleId(roleId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void bindMenu(RoleBindMenuDto dto) {
        // 记录前端value值-menuJsonArr
        roleMapper.updateMenuJsonArr(dto.getMenuJsonArr(), dto.getRoleId());
        // 删除全部该角色菜单关联关系
        roleMapper.deleteRoleMenu(dto.getRoleId());
        // 添加角色菜单关联关系
        roleMapper.insertRoleMenu(dto.getSelectedMenuIds(), dto.getRoleId());
    }
}
