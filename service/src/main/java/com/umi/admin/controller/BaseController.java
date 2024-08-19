package com.umi.admin.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.common.QueryCriteria;

public class BaseController {
    protected <T> Page<T> getPage(QueryCriteria qc, Class<T> type) {
        long _size = 10, _index = 1;

        if (qc.getCurrent() != null) {
            _index = qc.getCurrent();
        }
        if (qc.getSize() != null) {
            _size = qc.getSize();
        }
        return new Page<>(_index, _size);
    }
}
