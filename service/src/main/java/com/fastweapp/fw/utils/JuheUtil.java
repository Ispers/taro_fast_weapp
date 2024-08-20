package com.fastweapp.fw.utils;

import com.alibaba.fastjson.JSONObject;
import com.fastweapp.fw.common.Constants;
import com.fastweapp.fw.exception.BadRequestException;
import lombok.extern.log4j.Log4j2;

import java.net.URLEncoder;

/**
 * 聚合数据-工具类
 */
@Log4j2
public class JuheUtil {
    /**
     * 发送短信验证码
     */
    public static void sendMessageCode(String code, String mobilePhoneNumber) {
        if (!NumberUtil.isPhone(mobilePhoneNumber)) {
            throw new BadRequestException("手机号码不正确，验证码发送失败");
        }
        try {
            String variable = String.format(Constants.JUHE_MESSAGE_TPL_VALUE, code, "5");
            String url = String.format(Constants.JUHE_MESSAGE_URL,
                    mobilePhoneNumber,
                    Constants.JUHE_MESSAGE_TPL_ID,
                    URLEncoder.encode(variable, "utf-8"),
                    Constants.JUHE_MESSAGE_KEY);
            System.out.println(variable);
            log.info("=============聚合数据接口发送短信：" + mobilePhoneNumber + "============");
            String res = OkHttpUtils.get(url);
            JSONObject obj = JSONObject.parseObject(res);
            int error_code = obj.getIntValue("error_code");
            if (error_code == 0) {
                JSONObject result = obj.getJSONObject("result");
                String sid = result.getString("sid");
                int fee = result.getIntValue("fee");
                log.info("本次发送的唯一标示：" + sid + "，本次发送消耗的次数：" + fee);
                log.info("=============聚合数据接口发送短信调用成功=============");
            } else {
                System.out.println("=============聚合数据接口发送短信调用失败：" + obj.getString("reason") + "=============");
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }

    }

    public static void main(String[] args) {
        sendMessageCode("272712", "18249690300");
    }
}
