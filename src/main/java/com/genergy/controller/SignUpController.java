package com.genergy.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/testys")
public class SignUpController {
	
	@PostMapping("/idCheck")
	@ResponseBody
	public boolean idCheck (HttpServletRequest request) {
		System.out.println("idcheck");
		return false;
	}
	
}
