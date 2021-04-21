package com.genergy.test;

import com.genergy.dao.TestDao;

public class MainTest {

	public static void main(String[] args) {
		TestDao dao = new TestDao();
//		System.out.println(dao.insert("test : Hello, World!"));
		System.out.println(dao.login("", ""));
	}

}
