package com.fastweapp.fw.controller;


import com.fastweapp.fw.annotation.Log;
import com.fastweapp.fw.exception.BadRequestException;
import com.fastweapp.fw.utils.ResultResponse;
import com.fastweapp.fw.utils.UploadFileUtil;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/upload")
@Log4j2
public class UploadController {
    @PostMapping
    @Log(module = "上传", events = "文件上传")
    public ResultResponse<String> uploadFile(MultipartFile file) throws IOException {
        log.info("上传文件：{}", file);
        String fileUrl = UploadFileUtil.upload(file, "");
        if (StringUtils.isEmpty(fileUrl)) {
            throw new BadRequestException("文件上传失败");
        }
        return ResultResponse.success(fileUrl);
    }
}
