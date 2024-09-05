package com.fastweapp.fw.service.impl;

import com.fastweapp.fw.domain.Config;
import com.fastweapp.fw.mapper.ConfigMapper;
import com.fastweapp.fw.service.ConfigService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class ConfigServiceImpl implements ConfigService {
    private final ConfigMapper mapper;

    @Override
    public Config getConfig(String key) {
        return mapper.selectConfigByKey(key);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void modifyValue1ByKey(Config config) {
        mapper.updateValue1ByKey(config);
    }
}
