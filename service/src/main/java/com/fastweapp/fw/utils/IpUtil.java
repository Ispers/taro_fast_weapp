package com.fastweapp.fw.utils;

import lombok.extern.log4j.Log4j2;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.InetAddress;
import java.net.URL;
import java.net.UnknownHostException;
import java.nio.charset.StandardCharsets;
import java.util.Objects;

@Log4j2
public class IpUtil {
    public static String getIpAddr(HttpServletRequest request) {
        String ipAddress;
        try {
            ipAddress = request.getHeader("x-forwarded-for");
            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("Proxy-Client-IP");
            }

            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getHeader("WL-Proxy-Client-IP");
            }

            if (ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
                ipAddress = request.getRemoteAddr();
                if ("127.0.0.1".equals(ipAddress)) {
                    InetAddress inet = null;

                    try {
                        inet = InetAddress.getLocalHost();
                    } catch (UnknownHostException var4) {
                        log.error(var4.getMessage(), var4);
                    }

                    ipAddress = ((InetAddress) Objects.requireNonNull(inet)).getHostAddress();
                }
            }

            if (ipAddress != null && ipAddress.length() > 15 && ipAddress.indexOf(",") > 0) {
                ipAddress = ipAddress.substring(0, ipAddress.indexOf(","));
            }
        } catch (Exception var5) {
            ipAddress = "";
        }

        return ipAddress;
    }

    public static String getIpAddr() {
        return getV4OrV6IP();
    }

    public static String getV4OrV6IP() {
        String ip = null;
        String test = "http://test.ipw.cn";
        StringBuilder inputLine = new StringBuilder();
        BufferedReader in = null;

        try {
            URL url = new URL(test);
            HttpURLConnection urlConnection = (HttpURLConnection) url.openConnection();
            in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), StandardCharsets.UTF_8));

            String read;
            while ((read = in.readLine()) != null) {
                inputLine.append(read);
            }

            ip = inputLine.toString();
        } catch (Exception var16) {
            log.error("获取网络IP地址异常，这是具体原因: ", var16);
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException var15) {
                    log.error(var15.getMessage(), var15);
                }
            }
        }

        if (ip == null) {
            ip = "127.0.0.1";
            log.info("获取网络IP地址异常, 赋值默认ip: 【{}】", ip);
        }

        return ip;
    }
}
