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
	public static List<Object> getFolderListByFolder_id(String folder_id) {
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("from Folder where parentsFolderId=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<Folder> queryResult = query.list();
		
		List<Object> result = new ArrayList<Object>();
		
		for(Folder f : queryResult) {
			Map<String, Object> child = new HashMap<String, Object>();
			
			String last_modified_date = f.getLastModifiedDateToString();
			last_modified_date = last_modified_date.substring(0, 16);
//			f.setLastModifiedDate(last_modified_date);
			
			child.put("fid", f.getFolderId());
			child.put("fname", f.getFolderName());
			child.put("folderList", new ArrayList());
			child.put("fileList", new ArrayList());
			
			result.add(child);
		}
//		session.close();

		session.getTransaction().commit();
		return result;
	}
	
	public static String getFolderNameByFolder_id(String folder_id) {
		String result = "";
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query<?> query = session.createQuery("select folderName from Folder where folderId=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<?> list = query.list();
//		session.getTransaction().commit();
		
		if(list.size() > 0)
			result = (String) list.get(0);
//		session.close();

		session.getTransaction().commit();				
		return result;
	}
}
