package com.umi.admin.common;

/**
 * 所有分页查询条件vo都要实现该接口
 *
 * @author sunmr
 */
public interface QueryCriteria {
    Long getCurrent();

    Long getSize();
}
