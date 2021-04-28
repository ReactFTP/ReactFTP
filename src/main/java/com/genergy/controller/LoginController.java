package com.genergy.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.genergy.dao.CompanyDAO;
import com.genergy.dao.MemberDAO;
import com.genergy.model.Company;

@RestController
@RequestMapping("/")
public class LoginController {
	public LoginController() {
		System.out.println("hello, login");
	}
	
	@PostMapping("getId")
	@ResponseBody
	public String getId (HttpServletRequest request) {
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		MemberDAO dao= new MemberDAO();
		return dao.getId(name, email, phone);
	}
	
	@PostMapping("getNewPW")
	@ResponseBody
	public String getNewPW (HttpServletRequest request) {
		String id = request.getParameter("id");
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		MemberDAO dao= new MemberDAO();
		return dao.getNewPW(id, name, email, phone);
	}

	@PostMapping("login")
	@ResponseBody
	public String login (HttpServletRequest request) {
		String id = request.getParameter("id");
		MemberDAO dao= new MemberDAO();
		return dao.login(id, request.getParameter("pw"));
	}
}
