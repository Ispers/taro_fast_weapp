package com.umi.admin.service;

import java.util.List;
import java.util.Map;

public interface RoleService {
    List<Map<String, Object>> getCurrentUserRoleInfo(Long userId);
}
