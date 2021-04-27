package com.genergy.dao;

import java.util.ArrayList;
import java.util.Iterator;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.File;

public class FileDAO {
	private static SessionFactory factory;
	
	public FileDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	// 특정 폴더의 하위 file 목록 가져오기
	public static ArrayList<File> getFileListByFolder_id(String folder_id) {
		ArrayList<File> lists;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query<?> query = session.createQuery("select file_name from File where folder_id=:folder_id");
		query.setParameter("folder_id", folder_id);		
		lists = (ArrayList<File>) query.list();
		session.getTransaction().commit();
		
		return lists;
	}
	
}
