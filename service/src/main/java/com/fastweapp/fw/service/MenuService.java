package com.fastweapp.fw.service;

import com.fastweapp.fw.domain.dto.MenuDto;

import java.util.List;
import java.util.Map;

public interface MenuService {
    List<Map<String, Object>> getCurrentUserMenuInfo();
    List<Map<String, Object>> getMenuInfo(MenuDto dto);
}
