package com.genergy.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.File;
import com.genergy.model.Folder;

public class FolderDAO {
	private static SessionFactory factory;
	
	public FolderDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	// 특정 폴더의 하위 folder 목록 가져오기
	public static Map<String, Object> getFolderListByFolder_id(String folder_id) {
		List<Folder> lists;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

//		Query<?> query = session.createQuery("select folder_name from Folder where parents_folder_id=:folder_id");
//		query.setParameter("folder_id", folder_id);		
//		Query<?> query = session.createQuery("select folder_name, last_modified_date from Folder");
		Query query = session.createQuery("from Folder");
		lists = query.list();
		// lists = [pk1:["folder_name", "last_modified_date"], pk2:["folder_name", "last_modified_date"], ..]
		// 형태로 반환됨.
		session.getTransaction().commit();
		
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, Object> children = new HashMap<String, Object>();

		System.out.println(lists);
		for(Folder ele : lists) {
			children.put("fid", ele.getFolder_id());
			children.put("fname", ele.getFolder_name());
			children.put("folderList", new ArrayList());
			children.put("fileList", new ArrayList());
			
			map.put(ele.getFolder_id(), children);
		}
		
		return map;
	}
	
	public static String getFolderNameByFolder_id(String folder_id) {
		String result = "";
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query<?> query = session.createQuery("select folder_name from Folder where folder_id=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<?> list = query.list();
		session.getTransaction().commit();
		
		if(list.size() > 0)
			result = (String) list.get(0);
				
		return result;
	}
}
