package com.genergy.dao;

import org.hibernate.SessionFactory;

import com.genergy.ftp.resources.HibernateUtil;

public class FolderDAO {
	private static SessionFactory factory;
	
	public FolderDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
}
