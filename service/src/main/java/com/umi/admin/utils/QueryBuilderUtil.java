package com.umi.admin.utils;

import cn.hutool.core.collection.CollUtil;
import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.ReflectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.umi.admin.annotation.Order;
import com.umi.admin.annotation.Query;
import com.umi.admin.common.OrderType;
import com.umi.admin.common.QueryType;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;

import java.lang.reflect.Field;
import java.util.Collection;
import java.util.List;

@Log4j2
public class QueryBuilderUtil {
    public static <T, K> QueryWrapper<K> build(T criteria, Class<K> entityClazz) {
        QueryWrapper<K> queryWrapper = new QueryWrapper<>();
        Class<?> clazz = criteria.getClass();
        Field[] fields = ReflectUtil.getFields(clazz);
        for (Field field : fields) {
            Query queryAnno = field.getAnnotation(Query.class);
            if (queryAnno == null) {
                continue;
            }
            String propName = field.getName();
            Object propValue = ReflectUtil.getFieldValue(criteria, propName);
            if (ObjectUtil.isEmpty(propValue)) {
                continue;
            }
            QueryType type = QueryType.EQ;
            String blurry = null;
            // 获取Query注解
            if (queryAnno != null) {
                type = queryAnno.value();
                propName = queryAnno.column();
                blurry = queryAnno.blurry();
            }
            String columnName = StringUtils.isBlank(propName) ? field.getName() : propName;
            columnName = StrUtil.toUnderlineCase(columnName);
            // 模糊多字段
            if (ObjectUtil.isNotEmpty(blurry)) {
                List<String> blurs = StrUtil.split(blurry, ",");
                queryWrapper.and(wrapper -> {
                    for (int i = 0; i < blurs.size(); i++) {
                        String column = StrUtil.toUnderlineCase(blurs.get(i));
                        if (i != 0) {
                            wrapper.or();
                        }
                        wrapper.like(column, propValue.toString());
                    }
                });
                continue;
            }
            setQueryWrapper(queryWrapper, type, columnName, propValue);
        }

        // 处理@Order注解排序
        for (Field field : fields) {
            Order orderAnno = field.getAnnotation(Order.class);
            if (orderAnno == null) {
                continue;
            }
            String propName = field.getName();
            OrderType otype = OrderType.ASC;
            // 获取Query注解
            if (orderAnno != null) {
                otype = orderAnno.value();
            }
            String columnName = StringUtils.isBlank(propName) ? field.getName() : propName;
            columnName = StrUtil.toUnderlineCase(columnName);
            if (otype == OrderType.ASC) {
                queryWrapper.orderByAsc(columnName);
            } else {
                queryWrapper.orderByDesc(columnName);
            }
        }

        // 处理sort字段排序  id,desc,age,asc
        for (Field field : fields) {
            if (StrUtil.equals(field.getName(), "sort")) {
                String sortStr = ReflectUtil.getFieldValue(criteria, "sort").toString();
                String[] ss = sortStr.split(",");
                for (int i = 0; i < ss.length; i++) {
                    if (i % 2 == 1) {
                        continue;
                    }
                    if (ss[i + 1].equals("asc")) {
                        queryWrapper.orderByAsc(StrUtil.toUnderlineCase(ss[i]));
                    } else {
                        queryWrapper.orderByDesc(StrUtil.toUnderlineCase(ss[i]));
                    }
                }
                break;
            }
        }

        return queryWrapper;
    }

    private static <T> void setQueryWrapper(QueryWrapper<T> queryWrapper, QueryType type, String propName, Object propValue) {
        switch (type) {
            case EQ:
                queryWrapper.eq(propName, propValue);
                break;
            case GT:
                queryWrapper.gt(propName, propValue);
                break;
            case GE:
                queryWrapper.ge(propName, propValue);
                break;
            case LE:
                queryWrapper.le(propName, propValue);
                break;
            case LT:
                queryWrapper.lt(propName, propValue);
                break;
            case LIKE:
                queryWrapper.like(propName, propValue);
                break;
            case LIKE_LEFT:
                queryWrapper.likeLeft(propName, propValue);
                break;
            case LIKE_RIGHT:
                queryWrapper.likeRight(propName, propValue);
                break;
            case IN:
                if (CollUtil.isNotEmpty((Collection) propValue)) {
                    queryWrapper.in(propName, (Collection) propValue);
                }
                break;
            case NE:
                queryWrapper.ne(propName, propValue);
                break;
            case NOT_NULL:
                queryWrapper.isNotNull(propName);
                break;
            case BETWEEN:
                List<Object> between = (List<Object>) propValue;
                queryWrapper.between(propName, between.get(0), between.get(1));
                break;
            default:
                break;
        }
    }
}
