package com.fastweapp.fw.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Icon;
import com.fastweapp.fw.domain.dto.IconDto;
import com.fastweapp.fw.utils.PageResult;

import java.util.Set;

public interface IconService {
    PageResult<Icon> getIcon(Page<Icon> page, IconDto dto);

    void addIcon(Icon icon);

    void modifyIcon(Icon icon);

    void removeIcon(Set<Integer> ids);
}
