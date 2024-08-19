package com.umi.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.ApplicationPidFileWriter;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableAsync
@SpringBootApplication
@EnableTransactionManagement
public class RunApplication {
    public static void main(String[] args) {
        SpringApplication springApplication = new SpringApplication(RunApplication.class);
        // 监控应用的PID
        springApplication.addListeners(new ApplicationPidFileWriter());
        springApplication.run(args);
    }
}
