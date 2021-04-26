package com.genergy.dao;

import java.util.ArrayList;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.File;
import com.genergy.model.Folder;

public class FolderDAO {
	private static SessionFactory factory;
	private static Query<?> query;
	
	public FolderDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	// 특정 폴더의 하위 folder 목록 가져오기
	public static ArrayList<Folder> getFolderListByFolder_id(String folder_id) {
		ArrayList<Folder> lists;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		query = session.createQuery("select * from folder where parents_folder_id=:folder_id");
		query.setParameter("folder_id", folder_id);		
		lists = (ArrayList<Folder>) query.list();
		session.getTransaction().commit();
		
		// 데이터 잘 받아오는지 테스트
		for(Folder f:lists) {
			System.out.println(f.getFolder_name());
		}
		
		return lists;
	}
}
