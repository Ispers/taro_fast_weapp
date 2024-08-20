package com.fastweapp.fw.service.impl;

import com.fastweapp.fw.mapper.RoleMapper;
import com.fastweapp.fw.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {
    private final RoleMapper roleMapper;

    @Override
    public List<Map<String, Object>> getCurrentUserRoleInfo(Long userId) {
        return roleMapper.selectRoleByUserId(userId);
    }
}
