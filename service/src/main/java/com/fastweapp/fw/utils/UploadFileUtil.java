package com.fastweapp.fw.utils;

import com.fastweapp.fw.common.Constants;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Component;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.ResourceUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Log4j2
@Component
public class UploadFileUtil {

    /**
     * 获取文件保存路径
     */
    static List<File> getUploadDirectory() throws FileNotFoundException {
        File targetPath = new File(ResourceUtils.getURL("classpath:").getPath());

        if (!targetPath.exists()) {
            targetPath = new File("");
        }

        String resourcesPath = System.getProperty("user.dir") + "/src/main/resources";

        File path = new File(resourcesPath);

        File upload = new File(path.getAbsolutePath(), "upload");
        File uploadTarget = new File(targetPath.getAbsolutePath(), "upload");

        if (!upload.exists()) {
            upload.mkdirs();
        }
        if (!uploadTarget.exists()) {
            uploadTarget.mkdirs();
        }

        List<File> files = new ArrayList<File>();
        files.add(upload);
        files.add(uploadTarget);

        return files;
    }

    public static String upload(MultipartFile myFile, String dir) throws IOException {
        String filePath = "";
        if (!myFile.isEmpty()) {
            try {
                String filename = myFile.getOriginalFilename();
                if (filename != null) {
                    filename = UUID.randomUUID() + filename.substring(filename.lastIndexOf("."));
                }

                List<File> files = getUploadDirectory();

                File curFile = new File(files.get(0), filename);
                myFile.transferTo(curFile);
                FileCopyUtils.copy(curFile, new File(files.get(1), filename));

                filePath = Constants.FILE_PATH + filename;
            } catch (Exception e) {
                log.error(e.getMessage(), e);
            }
        }

        return filePath;
    }
}

