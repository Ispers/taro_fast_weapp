package com.umi.admin.service;


import com.baomidou.mybatisplus.extension.service.IService;
import com.umi.admin.domain.User;
import com.umi.admin.domain.dto.ModifyPasswordDto;

import java.util.Map;

public interface UserService extends IService<User> {
    User selectUserByUserId(Long userId);

    User selectUserByUsernameAndPassword(String username, String password);

    User selectUserByWxOpenId(String openid);

    void wxUserRegister(String openid);

    void centerModifyInfo(User resource);

    void centerModifyPassword(ModifyPasswordDto modifyPasswordDto);

    Map<String, Object> selectUserInfo(Long userId);
}
