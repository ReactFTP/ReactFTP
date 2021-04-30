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
public class UserController {
	public UserController() {
		System.out.println("hello, user");
	}
	
	@PostMapping("getUser")
	@ResponseBody
	public String[] getId (HttpServletRequest request) {
		String id = request.getParameter("id");
		MemberDAO dao= new MemberDAO();
		return dao.getUser(id);
	}
	
	@PostMapping("editUser")
	@ResponseBody
	public boolean editUser (HttpServletRequest request) {
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String addr1 = request.getParameter("addr1");
		String addr2 = request.getParameter("addr2");
		MemberDAO dao= new MemberDAO();
		dao.editUser(id, pw, email, phone, addr1, addr2);
		return true;
	}
	
	
	@PostMapping("editUserSet")
	@ResponseBody
	public boolean editUserSet (HttpServletRequest request) {
		String id = request.getParameter("id");
		String auth = request.getParameter("auth");
		String active = request.getParameter("active");
		String join = request.getParameter("join");
		MemberDAO dao= new MemberDAO();
		dao.editUserSet(id, auth, active, join);
		return true;
	}


}
