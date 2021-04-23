package com.genergy.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class SignUpController {
	public SignUpController() {
		System.out.println("hello");
	}
	@PostMapping("idCheck")
	@ResponseBody
	public String idCheck (HttpServletRequest request) {
		System.out.println("idcheck");
		return "hello";
	}
	
}
