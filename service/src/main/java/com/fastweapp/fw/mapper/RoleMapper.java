package com.fastweapp.fw.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

@Mapper
public interface RoleMapper {
    List<Map<String, Object>> selectRoleByUserId(@Param("userId") Long userId);
}
