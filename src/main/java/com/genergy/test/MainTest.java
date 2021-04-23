package com.genergy.test;

import com.genergy.dao.TestDAO;

public class MainTest {

	public static void main(String[] args) {
		TestDAO dao = new TestDAO();
//		System.out.println(dao.insert("test : Hello, World!"));
		System.out.println(dao.login("", ""));
	}

}
