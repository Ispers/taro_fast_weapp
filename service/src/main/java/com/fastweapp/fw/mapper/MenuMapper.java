package com.fastweapp.fw.mapper;

import com.fastweapp.fw.domain.dto.AddMenuDto;
import com.fastweapp.fw.domain.dto.MenuDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper
public interface MenuMapper {
    List<Map<String, Object>> selectMenuByRoleIds(@Param("userId") Long userId);

    List<Map<String, Object>> selectMenu(MenuDto dto);

    List<Map<String, Object>> selectIcon(@Param("iconName") String iconName);

    void insertMenu(AddMenuDto dto);

    void updateMenuById(AddMenuDto dto);

    void deleteMenuByids(@Param("ids") Set<Integer> ids);

    void deleteMenuRoles(@Param("ids") Set<Integer> ids);
}
