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
import com.genergy.model.Member;

@RestController
@RequestMapping("/")
public class CompanyController {
	public CompanyController() {
		System.out.println("hello, company");
	}
	
	@PostMapping("getUserInCompany")
	@ResponseBody
	public Member[] getUserInCompany (HttpServletRequest request) {
		String coId = request.getParameter("coId");
		MemberDAO dao= new MemberDAO();
		return  dao.getUserInCompany(coId);
	}
	
	@PostMapping("getCompanyName")
	@ResponseBody
	public String getCompanyName (HttpServletRequest request) {
		String coId = request.getParameter("coId");
		CompanyDAO dao= new CompanyDAO();
		String result = dao.getCompanyName(coId);
		System.out.println(result);
		
		return result;
	}
	

}
	