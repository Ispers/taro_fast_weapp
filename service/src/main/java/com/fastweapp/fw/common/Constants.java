package com.fastweapp.fw.common;

/**
 * 全局常量配置
 */
public class Constants {
    // 文件预览路径
    public static final String FILE_PATH = "http://localhost:8083/upload/";
    // Token请求头名
    public static final String TOKEN_NAME = "Authorization";
    // Token有效期 7天
    public static final Long TOKEN_EXPIRE_TIME = 604800L;
    // 公钥
    public static final String PUBLIC_KEY = "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANL378k3RiZHWx5AfJqdH9xRNBmD9wGD2iRe41HdTNF8RUhNnHit5NpMNtGL0NPTSSpPjjI1kJfVorRvaQerUgkCAwEAAQ==";
    // 私钥
    public static final String PRIVATE_KEY = "MIIBUwIBADANBgkqhkiG9w0BAQEFAASCAT0wggE5AgEAAkEA0vfvyTdGJkdbHkB8mp0f3FE0GYP3AYPaJF7jUd1M0XxFSE2ceK3k2kw20YvQ09NJKk+OMjWQl9WitG9pB6tSCQIDAQABAkA2SimBrWC2/wvauBuYqjCFwLvYiRYqZKThUS3MZlebXJiLB+Ue/gUifAAKIg1avttUZsHBHrop4qfJCwAI0+YRAiEA+W3NK/RaXtnRqmoUUkb59zsZUBLpvZgQPfj1MhyHDz0CIQDYhsAhPJ3mgS64NbUZmGWuuNKp5coY2GIj/zYDMJp6vQIgUueLFXv/eZ1ekgz2Oi67MNCk5jeTF2BurZqNLR3MSmUCIFT3Q6uHMtsB9Eha4u7hS31tj1UWE+D+ADzp59MGnoftAiBeHT7gDMuqeJHPL4b+kC+gzV4FGTfhR9q3tTbklZkD2A==";
    // 图片验证码宽度
    public static final int CAPTCHA_WIDTH = 130;
    // 图片验证码高低
    public static final int CAPTCHA_HEIGHT = 48;
    // 图片验证码长度
    public static final int CAPTCHA_LENGTH = 4;
    // 图片验证码缓存key
    public static final String CAPTCHA_KEY = "captcha-imgcode:";
    // 图片验证码有效期 5分钟
    public static final Long CAPTCHA_EXPIRE_TIME = 300L;
    // 小程序ID
    public static final String WX_APP_ID = "xxxxxxxxxxxxxxx";
    // 小程序密钥
    public static final String WX_APP_SECRET = "xxxxxxxxxxxxxxxxxxxxxxx";
    // 聚合数据-短信验证码接口请求地址
    public static final String JUHE_MESSAGE_URL = "http://v.juhe.cn/sms/send?mobile=%s&tpl_id=%s&tpl_value=%s&key=%s";
    // 聚合数据-短信请求Key
    public static final String JUHE_MESSAGE_KEY = "xxxxxxxxxxxxxxxxxxxxxxxx";
    // 聚合数据-短信模版ID
    public static final String JUHE_MESSAGE_TPL_ID = "xxxxx";
    // 聚合数据-短信模版变量
    public static final String JUHE_MESSAGE_TPL_VALUE = "#code#=%s&#m#=%s";
    // 短信验证码缓存key
    public static final String MESSAGE_KEY = "captcha-messagecode:";
}
