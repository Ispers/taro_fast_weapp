package com.fastweapp.fw.service;

import java.util.List;
import java.util.Map;

public interface RoleService {
    List<Map<String, Object>> getCurrentUserRoleInfo(Long userId);
}
