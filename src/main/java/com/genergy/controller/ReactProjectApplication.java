package com.genergy.controller;


import javax.servlet.MultipartConfigElement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.multipart.MultipartResolver;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@SpringBootApplication
public class ReactProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReactProjectApplication.class, args);
	}
	
	@Bean
	public MultipartConfigElement multipartConfigElement() {
	MultipartConfigFactory factory = new MultipartConfigFactory();
	return factory.createMultipartConfig();
	}

	@Bean
	public MultipartResolver multipartResolver() {
	CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
	multipartResolver.setMaxUploadSize(512000000);
	return multipartResolver;
	}
	

}
