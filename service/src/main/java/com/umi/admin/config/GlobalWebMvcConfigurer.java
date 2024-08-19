package com.umi.admin.config;

import com.umi.admin.Interceptor.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * 全局SpringMvc配置
 */
@Configuration
public class GlobalWebMvcConfigurer implements WebMvcConfigurer {
    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 用户登陆拦截
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/api/**")
                .addPathPatterns("/auth/**")
                .excludePathPatterns("/upload/**")
                .excludePathPatterns("/auth/login")
                .excludePathPatterns("/auth/code")
                .excludePathPatterns("/auth/messagecode")
                .excludePathPatterns("/api/test0513/**")
                .excludePathPatterns("/auth/wxlogin");
    }

    // 设置静态资源映射
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/upload/**")
                .addResourceLocations("classpath:/upload/", "file:upload/");
    }

    // 配置跨域
    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.addAllowedOriginPattern("*");
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
