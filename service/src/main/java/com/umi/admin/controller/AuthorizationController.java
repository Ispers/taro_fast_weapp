package com.umi.admin.controller;

import cn.hutool.core.util.IdUtil;
import com.alibaba.fastjson.JSONObject;
import com.umi.admin.annotation.Log;
import com.umi.admin.common.Constants;
import com.umi.admin.domain.User;
import com.umi.admin.domain.dto.AuthUserDto;
import com.umi.admin.exception.BadRequestException;
import com.umi.admin.jwt.CurrentUser;
import com.umi.admin.jwt.JwtInfo;
import com.umi.admin.jwt.JwtTool;
import com.umi.admin.jwt.RedisKey;
import com.umi.admin.service.UserService;
import com.umi.admin.utils.*;
import com.wf.captcha.SpecCaptcha;
import com.wf.captcha.base.Captcha;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthorizationController {
    private final UserService userService;
    private final RedisUtils redisUtils;

    @GetMapping("/wxlogin")
    @Log(module = "认证", events = "微信登录")
    public ResultResponse<String> wxLogin(String code) {
        String url = "https://api.weixin.qq.com/sns/jscode2session" +
                "?appid=" + Constants.WX_APP_ID + "&secret=" + Constants.WX_APP_SECRET +
                "&js_code=" + code + "&grant_type=authorization_code";

        String res = OkHttpUtils.get(url);
        log.info("微信能力平台jscode2session请求结果===>" + res);

        JSONObject wxobj = JSONObject.parseObject(res);
        if (wxobj.get("errcode") != null) {
            throw new BadRequestException("微信能力平台jscode2session请求失败，错误码" + wxobj.get("errcode").toString());
        }
        // 用户唯一标识
        String openid = wxobj.get("openid").toString();
        // 会话密钥(不使用，自己维护登录状态)
        // String sessionKey = wxobj.get("session_key").toString();

        // 根据openid去查用户信息，如没有则注册当前用户
        User user = userService.selectUserByWxOpenId(openid);
        if (user == null) {
            // 用户未注册 -> 注册
            userService.wxUserRegister(openid);
            // 注册成功后，再次查询用户信息
            user = userService.selectUserByWxOpenId(openid);
        }
        JwtInfo jwtToken = JwtTool.createJwtToken(user.getUserId());
        String token = jwtToken.getToken();
        redisUtils.set(RedisKey.getToken(jwtToken.getUserId().toString(), jwtToken.getJwtId()), jwtToken, Constants.TOKEN_EXPIRE_TIME);

        //将登录用户放到ThreadLocal变量变量中，方便业务获取当前登录用户
        CurrentUser currentUser = new CurrentUser();
        BeanUtil.copyProperties(user, currentUser);
        //当前用户放到ThreadLocal变量变量中
        SecurityUtils.setCurrentUser(currentUser);
        return ResultResponse.success(token);
    }

    @PostMapping("/login")
    @Log(module = "认证", events = "登录")
    public ResultResponse<Map<String, Object>> login(@RequestBody AuthUserDto authUser) throws Exception {
        // 查询验证码 -- 目前使用图片验证码
        String code = (String) redisUtils.get(Constants.CAPTCHA_KEY + authUser.getUuid());
        // 清除验证码
        redisUtils.del(Constants.CAPTCHA_KEY + authUser.getUuid());
        if (StringUtils.isBlank(code)) {
            throw new BadRequestException("验证码不存在或已过期");
        }
        if (StringUtils.isBlank(authUser.getCode()) || !authUser.getCode().equalsIgnoreCase(code)) {
            throw new BadRequestException("验证码错误");
        }
        // 密码解密
        String password = RsaUtils.decryptByPrivateKey(Constants.PRIVATE_KEY, authUser.getPassword());
        // Md5加密后与数据库比对
        password = MD5Util.MD5Encode(password, "utf-8");
        String username = authUser.getUsername();
        User user = userService.selectUserByUsernameAndPassword(username, password);
        if (user == null) {
            throw new BadRequestException("用户名或密码错误");
        }
//        if (!user.getIsAdmin() == 1) {
//            throw new BadRequestException("超级管理员用户已禁用");
//        }
        JwtInfo jwtToken = JwtTool.createJwtToken(user.getUserId());
        String token = jwtToken.getToken();
        redisUtils.set(RedisKey.getToken(jwtToken.getUserId().toString(), jwtToken.getJwtId()), jwtToken, Constants.TOKEN_EXPIRE_TIME);

        //将登录用户放到ThreadLocal变量变量中，方便业务获取当前登录用户
        CurrentUser currentUser = new CurrentUser();
        BeanUtil.copyProperties(user, currentUser);
        //当前用户放到ThreadLocal变量变量中
        SecurityUtils.setCurrentUser(currentUser);

        user.setPassword(null);
        Map<String, Object> map = new HashMap<>();
        map.put("token", token);
        return ResultResponse.success(map);
    }

    @GetMapping("/code")
    @Log(module = "认证", events = "获取图片验证码")
    public ResultResponse<Map<String, Object>> getCode() {
        //长，宽，位数
        SpecCaptcha captcha = new SpecCaptcha(Constants.CAPTCHA_WIDTH, Constants.CAPTCHA_HEIGHT, Constants.CAPTCHA_LENGTH);
        //设置类型
        captcha.setCharType(Captcha.TYPE_NUM_AND_UPPER);
        //生成验证码
        String code = captcha.text();
        log.info("验证码内容 captcha ===> " + code);
        String uuid = IdUtil.randomUUID();
        String key = Constants.CAPTCHA_KEY + uuid;
        // 验证码放入Redis中 5分钟有效
        redisUtils.set(key, code, Constants.CAPTCHA_EXPIRE_TIME);
        Map<String, Object> imgResult = new HashMap<String, Object>(2) {{
            put("img", captcha.toBase64());
            put("uuid", uuid);
        }};
        return ResultResponse.success("验证码生成成功", imgResult);
    }

    @GetMapping("/messagecode")
    @Log(module = "认证", events = "获取短信验证码")
    public ResultResponse<Map<String, Object>> getMessageCode(String phone) {
        String code = NumberUtil.genRandomNum(6);
        JuheUtil.sendMessageCode(code, phone);
        String uuid = IdUtil.randomUUID();
        String key = Constants.MESSAGE_KEY + uuid;
        // 验证码放入Redis中 5分钟有效
        redisUtils.set(key, code, Constants.CAPTCHA_EXPIRE_TIME);
        Map<String, Object> res = new HashMap<String, Object>(2) {{
            put("uuid", uuid);
        }};
        return ResultResponse.success("验证码发送成功", res);
    }

    @GetMapping("/info")
    @Log(module = "认证", events = "获取用户信息")
    public ResultResponse<Map<String, Object>> info() {
        Map<String, Object> map = userService.selectUserInfo(SecurityUtils.getCurrentUserId());
        return ResultResponse.success("获取用户信息成功", map);
    }

    @PostMapping("/logout")
    @Log(module = "认证", events = "退出")
    public ResultResponse<CurrentUser> logout(HttpServletRequest request) {
        String token = request.getHeader(Constants.TOKEN_NAME);
        String jwtId = JwtTool.checkJwtToken(token);
        String tokenUserId = JwtTool.getUserId(token);
        redisUtils.del(RedisKey.getToken(tokenUserId, jwtId));
        return ResultResponse.success("退出成功", null);
    }
}
