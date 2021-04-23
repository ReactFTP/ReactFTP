package com.genergy.dao;

import org.hibernate.SessionFactory;

import com.genergy.ftp.resources.HibernateUtil;

public class MemberDAO {
	private static SessionFactory factory;
	
	public MemberDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
}
