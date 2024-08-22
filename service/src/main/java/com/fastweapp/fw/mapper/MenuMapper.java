package com.fastweapp.fw.mapper;

import com.fastweapp.fw.domain.dto.MenuDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface MenuMapper {
    List<Map<String, Object>> selectMenuByRoleIds(@Param("userId") Long userId);

    List<Map<String, Object>> selectMenu(MenuDto dto);
}
