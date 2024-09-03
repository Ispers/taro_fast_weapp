package com.fastweapp.fw.service;

import com.fastweapp.fw.domain.dto.AddMenuDto;
import com.fastweapp.fw.domain.dto.MenuDto;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface MenuService {
    List<Map<String, Object>> getCurrentUserMenuInfo();

    List<Map<String, Object>> getMenuInfo(MenuDto dto);

    List<Map<String, Object>> getIcons(String iconName);

    void addMenu(AddMenuDto dto);

    void modifyMenu(AddMenuDto dto);

    void removeMenu(Set<Integer> ids);
}
