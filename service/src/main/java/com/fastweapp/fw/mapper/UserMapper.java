package com.fastweapp.fw.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.fastweapp.fw.domain.User;
import com.fastweapp.fw.domain.vo.UserVo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Update;

import java.util.Map;

@Mapper
public interface UserMapper extends BaseMapper<User> {
    User selectUserByUserId(@Param("userId") Long userId);

    User selectUserByUsernameAndPassword(@Param("username") String username,
                                         @Param("password") String password);

    User selectUserByWxOpenId(@Param("openId") String openId);

    void wxInsertUser(User user);

    UserVo selectUserInfo(@Param("userId") Long userId);

    @Update(" update tb_user set avatar_url = #{avatarUrl} where user_id = #{currentUserId} ")
    void updateAvatar(@Param("avatarUrl") String avatarUrl,
                      @Param("currentUserId") Long currentUserId);
}
