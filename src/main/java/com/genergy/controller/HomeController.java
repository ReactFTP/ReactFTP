package com.genergy.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {
	public HomeController() {
		System.out.println("hello, home");
	}
	@PostMapping("/gethomecontents")
	@ResponseBody
	public String idCheck (HttpServletRequest request) {
		System.out.println("gethomecontents");
		return "hello, gethomecontents";
	}
	
}
