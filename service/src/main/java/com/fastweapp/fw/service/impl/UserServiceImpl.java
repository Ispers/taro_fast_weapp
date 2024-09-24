package com.fastweapp.fw.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fastweapp.fw.common.Constants;
import com.fastweapp.fw.domain.User;
import com.fastweapp.fw.domain.dto.ModifyPasswordDto;
import com.fastweapp.fw.domain.vo.UserVo;
import com.fastweapp.fw.exception.BadRequestException;
import com.fastweapp.fw.mapper.UserMapper;
import com.fastweapp.fw.service.UserService;
import com.fastweapp.fw.utils.MD5Util;
import com.fastweapp.fw.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;
import java.util.Random;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
    @Autowired
    private UserMapper userMapper;

    @Override
    public User selectUserByUserId(Long userId) {
        return userMapper.selectUserByUserId(userId);
    }

    @Override
    public User selectUserByUsernameAndPassword(String username, String password) {
        return userMapper.selectUserByUsernameAndPassword(username, password);
    }

    @Override
    public User selectUserByWxOpenId(String openId) {
        return userMapper.selectUserByWxOpenId(openId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void wxUserRegister(String openid) {
        Random random = new Random();
        // 生成6位随机数
        int randomNumber = random.nextInt(900000) + 100000;
        User user = new User();
        user.setWxOpenid(openid);
        user.setNickname("微信用户#" + randomNumber);
        user.setGender(1);
        user.setEnabled(1);
        user.setAvatarUrl(Constants.FILE_PATH + "defaultAvatar.jpg");
        user.setIsAdmin(0);
        userMapper.wxInsertUser(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void centerModifyInfo(User resource) {
        User user = getById(resource.getUserId());
        user.setNickname(resource.getNickname());
        user.setRealName(resource.getRealName());
        user.setGender(resource.getGender());
        user.setBirthday(resource.getBirthday());
        user.setPhone(resource.getPhone());
        user.setEmail(resource.getEmail());
        user.setAddress(resource.getAddress());

        user.setUpdateBy(SecurityUtils.getCurrentUsername());
        user.setUpdateTime(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));
        updateById(user);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void centerModifyPassword(ModifyPasswordDto modifyPasswordDto) {
        String oldPass = modifyPasswordDto.getOldPass();
        User user = getById(SecurityUtils.getCurrentUserId());
        if (!MD5Util.MD5Encode(oldPass, "utf-8").equals(user.getPassword())) {
            throw new BadRequestException("原密码错误");
        }
        String newPass = modifyPasswordDto.getNewPass();
        user.setPassword(MD5Util.MD5Encode(newPass, "utf-8"));
        updateById(user);
    }

    @Override
    public UserVo selectUserInfo(Long userId) {
        return userMapper.selectUserInfo(userId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void centerModifyAvatar(String avatarUrl) {
        userMapper.updateAvatar(avatarUrl, SecurityUtils.getCurrentUserId());
    }
}
