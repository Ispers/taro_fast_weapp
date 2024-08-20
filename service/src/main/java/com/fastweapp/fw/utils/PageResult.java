package com.fastweapp.fw.utils;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.Data;

import java.util.List;

@Data
public class PageResult<T> {
    // 总记录数
    private Long totalCount;
    // 总页数
    private Long totalPages;
    // 当前页
    private Long current;
    // 结果集
    private List<T> records;

    private PageResult(Long totalCount, Long totalPages, Long current, List<T> records) {
        this.totalCount = totalCount;
        this.totalPages = totalPages;
        this.current = current;
        this.records = records;
    }

    public static <T> PageResult<T> get(Page<T> page) {
        return new PageResult<T>(page.getTotal(), page.getPages(), page.getCurrent(), page.getRecords());
    }

    public static <T> PageResult<T> get(IPage<T> page) {
        return new PageResult<T>(page.getTotal(), page.getPages(), page.getCurrent(), page.getRecords());
    }

}
