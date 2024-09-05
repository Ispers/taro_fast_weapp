package com.fastweapp.fw.service;

import com.fastweapp.fw.domain.Config;

public interface ConfigService {
    Config getConfig(String key);

    void modifyValue1ByKey(Config config);
}
