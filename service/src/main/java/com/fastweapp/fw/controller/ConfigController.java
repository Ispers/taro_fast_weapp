package com.fastweapp.fw.controller;

import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.domain.Config;
import com.fastweapp.fw.service.ConfigService;
import com.fastweapp.fw.utils.ResultResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/config")
@RequiredArgsConstructor
public class ConfigController {
    private final ConfigService service;

    @GetMapping("/getConfig")
    @Log(module = "配置", events = "根据key获取配置值")
    public ResultResponse<Config> getConfig(String key) {
        Config res = service.getConfig(key);
        return ResultResponse.success("根据key获取配置值成功", res);
    }

    @PostMapping("/modifyValue1ByKey")
    @Log(module = "配置", events = "根据key修改配置值1")
    public ResultResponse<String> modifyValue1ByKey(@RequestBody Config config) {
        service.modifyValue1ByKey(config);
        return ResultResponse.success("根据key获取配置值成功");
    }
}
