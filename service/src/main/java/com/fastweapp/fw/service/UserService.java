package com.fastweapp.fw.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.fastweapp.fw.domain.User;
import com.fastweapp.fw.domain.dto.ModifyPasswordDto;
import com.fastweapp.fw.domain.vo.UserVo;

import java.util.Map;

public interface UserService extends IService<User> {
    User selectUserByUserId(Long userId);

    User selectUserByUsernameAndPassword(String username, String password);

    User selectUserByWxOpenId(String openid);

    void wxUserRegister(String openid);

    void centerModifyInfo(User resource);

    void centerModifyPassword(ModifyPasswordDto modifyPasswordDto);

    UserVo selectUserInfo(Long userId);

    void centerModifyAvatar(String avatarUrl);
}
