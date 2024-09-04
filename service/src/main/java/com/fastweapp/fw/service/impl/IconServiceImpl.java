package com.fastweapp.fw.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Icon;
import com.fastweapp.fw.domain.Log;
import com.fastweapp.fw.domain.dto.IconDto;
import com.fastweapp.fw.mapper.IconMapper;
import com.fastweapp.fw.service.IconService;
import com.fastweapp.fw.utils.PageResult;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class IconServiceImpl implements IconService {
    private final IconMapper iconMapper;

    @Override
    public PageResult<Icon> getIcon(Page<Icon> page, IconDto dto) {
        IPage<Icon> logPage = iconMapper.selectIcon(page, dto);
        return PageResult.get(logPage);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addIcon(Icon icon) {
        iconMapper.insertIcon(icon);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyIcon(Icon icon) {
        iconMapper.updateIcon(icon);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void removeIcon(Set<Integer> ids) {
        iconMapper.deleteIcon(ids);
    }
}
