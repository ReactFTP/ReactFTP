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
	
	@PostMapping("phoneCheck")
	@ResponseBody
	public boolean phoneCheck (HttpServletRequest request) {
		String phone = request.getParameter("phone");
		MemberDAO dao= new MemberDAO();
		return  dao.phoneCheck(phone);
	}
	
	@PostMapping("emailCheck")
	@ResponseBody
	public boolean eamilCheck (HttpServletRequest request) {
		String email = request.getParameter("email");
		MemberDAO dao= new MemberDAO();
		return  dao.emailCheck(email);
	}
	
	@PostMapping("getCompanies")
	@ResponseBody
	public Map<String, Company> getCompanies (HttpServletRequest request) {
		CompanyDAO dao = new CompanyDAO();
		return dao.getAllLists();
	}
	
	@PostMapping("signUp")
	@ResponseBody
	public void signUp (HttpServletRequest request) {
		String id = request.getParameter("id");
		String pw = request.getParameter("pw");
		String name = request.getParameter("name");
		String email = request.getParameter("email");
		String phone = request.getParameter("phone");
		String addr1 = request.getParameter("addr1");
		String addr2 = request.getParameter("addr2");
		String companyId = request.getParameter("companyId");
		String manager = request.getParameter("manager");
		MemberDAO dao= new MemberDAO();
		dao.signUp(id, pw, name, email, phone, addr1, addr2, companyId, manager);
	}
	
}
