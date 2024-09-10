package com.fastweapp.fw.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Role;
import com.fastweapp.fw.domain.dto.RoleDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper
public interface RoleMapper {
    List<Map<String, Object>> selectRoleByUserId(@Param("userId") Long userId);

    IPage<Role> selectRole(Page<Role> page, @Param("dto") RoleDto dto);

    void insertRole(Role role);

    void updateRole(Role role);

    void deleteRole(@Param("ids") Set<Integer> ids);

    void deleteRoleUser(@Param("ids") Set<Integer> ids);

    String selectMenuJsonArrByRoleId(@Param("roleId") Long roleId);

    void updateMenuJsonArr(@Param("menuJsonArr") String menuJsonArr,
                           @Param("roleId") Long roleId);

    void deleteRoleMenu(@Param("roleId") Long roleId);

    void insertRoleMenu(@Param("ids") List<Long> selectedMenuIds,
                        @Param("roleId") Long roleId);
}
