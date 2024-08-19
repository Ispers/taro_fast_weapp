package com.umi.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.umi.admin.domain.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.Map;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    User selectUserByUserId(@Param("userId") Long userId);

    User selectUserByUsernameAndPassword(@Param("username") String username,
                                         @Param("password") String password);

    User selectUserByWxOpenId(@Param("openId") String openId);

    void wxInsertUser(User user);

    Map<String, Object> selectUserInfo(@Param("userId") Long userId);
}
