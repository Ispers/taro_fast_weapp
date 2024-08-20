package com.fastweapp.fw.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;
import java.util.Set;

@Mapper
public interface MenuMapper {
    List<Map<String, Object>> selectMenuByRoleIds(@Param("userId") Long userId);
}
