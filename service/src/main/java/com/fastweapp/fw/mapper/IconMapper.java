package com.fastweapp.fw.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.fastweapp.fw.domain.Icon;
import com.fastweapp.fw.domain.dto.IconDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Set;

@Mapper
public interface IconMapper {
    IPage<Icon> selectIcon(Page<Icon> page, @Param("dto") IconDto dto);

    void insertIcon(Icon icon);

    void updateIcon(Icon icon);

    void deleteIcon(@Param("ids") Set<Integer> ids);
}
