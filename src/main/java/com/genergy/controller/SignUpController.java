package com.genergy.controller;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.Session;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.genergy.dao.MemberDAO;

@RestController
@RequestMapping("/")
public class SignUpController {
	public SignUpController() {
		System.out.println("hello");
	}
	
	@PostMapping("idCheck")
	@ResponseBody
	public boolean idCheck (HttpServletRequest request) {
		String id = request.getParameter("id");
		MemberDAO dao= new MemberDAO();
		return  dao.idCheck(id);
	}
	
	@PostMapping("getCompanies")
	@ResponseBody
	public void getCompanies (HttpServletRequest request) {
		
	}
	
}
