package com.umi.admin.controller;


import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.umi.admin.annotation.Log;
import com.umi.admin.domain.User;
import com.umi.admin.domain.qc.UserQueryCriteria;
import com.umi.admin.mapper.UserMapper;
import com.umi.admin.utils.PageResult;
import com.umi.admin.utils.QueryBuilderUtil;
import com.umi.admin.utils.ResultResponse;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test0513")
@Log4j2
public class TestController0513 extends BaseController {
    @Autowired
    private UserMapper mapper;

    @GetMapping("/test1")
    @Log(module = "测试", events = "测试test1")
    public ResultResponse<PageResult<User>> test1(UserQueryCriteria criteria) {
        Page<User> page = getPage(criteria, User.class);
        Page<User> res = mapper.selectPage(page, QueryBuilderUtil.build(criteria, User.class));
        return ResultResponse.success(PageResult.get(res));
    }

    @GetMapping("/test2")
    @Log(module = "测试", events = "测试test1")
    public ResultResponse<Object> test2() {
        return ResultResponse.success("444");
    }
}
