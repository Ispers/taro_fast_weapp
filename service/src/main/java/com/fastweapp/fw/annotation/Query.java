package com.fastweapp.fw.annotation;

import com.fastweapp.fw.common.QueryType;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * 自定义通用查询注解
 *
 * @author sunmr
 * @date 2024-05-03
 */
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
public @interface Query {
    /**
     * 操作符类型
     */
    QueryType value() default QueryType.EQ;

    /**
     * 字段名称，默认为属性名称的下划线风格,已开启驼峰转下划线，特殊列名需要设置
     */
    String column() default "";

    /**
     * 多字段模糊搜索，仅支持String类型字段，多个用逗号隔开, 如@Query(blurry = "email, username")
     * xxx like "xxx" or yyy like "xxx" or zzz like "xxx"
     */
    String blurry() default "";
}
