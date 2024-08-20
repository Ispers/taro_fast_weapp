package com.fastweapp.fw.domain.qc;

import com.fastweapp.fw.annotation.Query;
import com.fastweapp.fw.common.QueryCriteria;
import com.fastweapp.fw.common.QueryType;
import lombok.Data;

@Data
public class UserQueryCriteria implements QueryCriteria {
    // 查询参数 - 前端传递
    @Query(QueryType.LIKE)
    private String username;

    // 指定字段进行排序 - 后端自己指定，与前端无关
//    @Order(OrderType.DESC)
//    private String createTime;

    // 排序字段(支持多字段排序) - 前端传递 - 示例：sort: userId,desc,createTime,asc
    private String sort;

    // 分页 - 当前页
    private Long current;
    // 分页 - 每页记录数
    private Long size;
}
