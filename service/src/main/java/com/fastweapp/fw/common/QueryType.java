package com.fastweapp.fw.common;

/**
 * 查询类型枚举类
 *
 * @author sunmr
 */
public enum QueryType {
    /**
     * 等于：=
     */
    EQ,
    /**
     * 不等于：<>
     */
    NE,
    /**
     * 大于等于 >=
     */
    GE,
    /**
     * 大于: >
     */
    GT,
    /**
     * 小于等于：<=
     */
    LE,
    /**
     * 小于：<
     */
    LT,
    /**
     * 全模糊匹配：like '%值%'
     */
    LIKE,
    /**
     * 左模糊匹配：like '%值'
     */
    LIKE_LEFT,
    /**
     * 右模糊匹配：like '值%'
     */
    LIKE_RIGHT,
    /**
     * 在规定多个值内：in
     */
    IN,
    /**
     * 在某个范围内: between 值A and 值B
     */
    BETWEEN,
    /**
     * 非空：is not null
     */
    NOT_NULL
}
