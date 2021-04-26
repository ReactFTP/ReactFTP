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
	private static Query<?> query;
	
	public FileDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	// 특정 폴더의 하위 file 목록 가져오기
	public static ArrayList<File> getFileListByFolder_id(String folder_id) {
		ArrayList<File> lists;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		query = session.createQuery("select * from file where folder_id=:folder_id");
		query.setParameter("folder_id", folder_id);		
		lists = (ArrayList<File>) query.list();
		session.getTransaction().commit();
		
		// 데이터 잘 받아오는지 테스트
		for(File f:lists) {
			System.out.println(f.getFile_name());
		}
		
		return lists;
	}
	
}
