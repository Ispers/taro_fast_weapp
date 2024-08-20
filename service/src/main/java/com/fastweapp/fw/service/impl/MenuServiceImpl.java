package com.fastweapp.fw.service.impl;

import com.fastweapp.fw.mapper.MenuMapper;
import com.fastweapp.fw.service.MenuService;
import com.fastweapp.fw.utils.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class MenuServiceImpl implements MenuService {
    private final MenuMapper menuMapper;

    @Override
    public List<Map<String, Object>> getCurrentUserMenuInfo() {
        List<Map<String, Object>> menus = menuMapper.selectMenuByRoleIds(SecurityUtils.getCurrentUserId());

        // 根据sort字段排序
        menus.sort(Comparator.comparingInt(menu -> (Integer) menu.get("sort")));

        List<Map<String, Object>> convertedMenus = new ArrayList<>();
        Map<Long, Map<String, Object>> menuMap = new HashMap<>();

        // 创建一个映射，方便查找子菜单
        for (Map<String, Object> menu : menus) {
            Long menuId = (Long) menu.get("menuId");
            menuMap.put(menuId, menu);
        }

        // 转换菜单并添加到结果列表
        for (Map<String, Object> menu : menus) {
            Long menuId = (Long) menu.get("menuId");
            Long parentId = (Long) menu.get("pid");

            if (parentId == null || parentId == 0) {
                Map<String, Object> newMenu = new HashMap<>();
                newMenu.put("type", menu.get("type"));
                newMenu.put("url", menu.get("url"));
                newMenu.put("page", menu.get("page"));
                newMenu.put("menuName", menu.get("menuName"));
                newMenu.put("icon", menu.get("icon"));
                newMenu.put("pid", menu.get("pid"));
                newMenu.put("menuId", menu.get("menuId"));
                newMenu.put("sort", menu.get("sort"));
                newMenu.put("hidden", !menu.get("hidden").toString().equals("0"));

                // 获取并排序子菜单
                List<Map<String, Object>> children = convertChildren(menuId, menuMap);
                newMenu.put("children", children);

                convertedMenus.add(newMenu);
            }
        }
        convertedMenus.forEach(item -> {
            if(item.get("children").toString().equals("[]")) {
                item.remove("children");
            }
        });
        return convertedMenus;
    }

    private List<Map<String, Object>> convertChildren(Long menuId, Map<Long, Map<String, Object>> menuMap) {
        List<Map<String, Object>> children = new ArrayList<>();

        // 获取所有子菜单项
        List<Map<String, Object>> menuItems = new ArrayList<>(menuMap.values());
        menuItems.removeIf(menu -> !menu.get("pid").equals(menuId));

        // 根据sort字段排序子菜单项
        menuItems.sort(Comparator.comparingInt(menu -> (Integer) menu.get("sort")));

        // 转换并添加排序后的子菜单项
        for (Map<String, Object> menuItem : menuItems) {
            Map<String, Object> newMenu = new HashMap<>();
            newMenu.put("type", menuItem.get("type"));
            newMenu.put("url", menuItem.get("url"));
            newMenu.put("page", menuItem.get("page"));
            newMenu.put("menuName", menuItem.get("menuName"));
            newMenu.put("icon", menuItem.get("icon"));
            newMenu.put("pid", menuItem.get("pid"));
            newMenu.put("menuId", menuItem.get("menuId"));
            newMenu.put("sort", menuItem.get("sort"));
            newMenu.put("hidden", !menuItem.get("hidden").toString().equals("0"));

            List<Map<String, Object>> childChildren = convertChildren(Long.parseLong(menuItem.get("menuId").toString()), menuMap);

            // 只有当子菜单不为空时，才将其添加到父菜单的children列表中
            if (!childChildren.isEmpty()) {
                newMenu.put("children", childChildren);
            }
            children.add(newMenu);
        }
        return children;
    }
}
