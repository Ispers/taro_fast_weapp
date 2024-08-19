package com.umi.admin.utils;

import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class NumberUtil {
    /**
     * 判断是否为11位电话号码
     */
    public static boolean isPhone(String phone) {
        Pattern pattern = Pattern.compile("^((13[0-9])|(14[5,7])|(15[^4,\\D])|(17[0-8])|(18[0-9]))\\d{8}$");
        Matcher matcher = pattern.matcher(phone);
        return matcher.matches();
    }

    /**
     * 生成指定长度的随机数
     */
    public static String genRandomNum(int length) {
        Random random = new Random();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int digit = random.nextInt(10); // 生成 0 到 9 之间的随机数
            sb.append(digit);
        }
        return sb.toString();
    }
}
