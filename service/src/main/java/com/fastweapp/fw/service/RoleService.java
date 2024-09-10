package com.fastweapp.fw.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Role;
import com.fastweapp.fw.domain.dto.RoleBindMenuDto;
import com.fastweapp.fw.domain.dto.RoleDto;
import com.fastweapp.fw.utils.PageResult;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface RoleService {
    List<Map<String, Object>> getCurrentUserRoleInfo(Long userId);

    PageResult<Role> getRole(Page<Role> page, RoleDto dto);

    void addRole(Role role);

    void modifyRole(Role role);

    void removeRole(Set<Integer> ids);

    String getMenuJsonArr(Long roleId);

    void bindMenu(RoleBindMenuDto dto);
}
