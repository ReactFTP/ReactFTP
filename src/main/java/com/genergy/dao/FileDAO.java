package com.genergy.dao;

import java.util.ArrayList;

import org.hibernate.Session;
import org.hibernate.SessionFactory;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.File;

public class FileDAO {
	private static SessionFactory factory;
	
	public FileDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	public static ArrayList<File> getFileList(String id) {
		ArrayList<File> lists = new ArrayList()<File>();
		Session session = factory.getCurrentSession();
		factory.openSession();
		session.beginTransaction();
		
		File file = session.get(File.class, id);
		session.getTransaction().commit();
		return file;
	}
}
