package com.fastweapp.fw.mapper;

import com.fastweapp.fw.domain.Config;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ConfigMapper {
    Config selectConfigByKey(@Param("key") String key);

    void updateValue1ByKey(Config config);
}
