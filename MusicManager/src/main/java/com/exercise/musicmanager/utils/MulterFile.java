package com.exercise.musicmanager.utils;

import javax.servlet.MultipartConfigElement;

import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.unit.DataSize;

@Configuration
public  class MulterFile {

    @Bean
    public MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        // Maximum file size
        factory.setMaxFileSize(DataSize.parse("30960KB")); // KB,MB
        // / Set the total upload data size
        factory.setMaxRequestSize(DataSize.parse("309600KB"));
        return factory.createMultipartConfig() ;
    }
}
