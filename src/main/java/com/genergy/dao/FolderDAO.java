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
	
	// 하위 folder 목록 가져오기(folder_id)
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

		session.getTransaction().commit();
		return result;
	}
	
	// folder 데이터 조회(folder_id)
	public static Folder getFolderByFolder_id(String folder_id) {
		Folder result = null;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("from Folder where folderId=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<Folder> queryResult = query.list();
		
		if(queryResult.size() > 0)
			result = queryResult.get(0);

		session.getTransaction().commit();				
		return result;
	}
	
	// folder 생성 시 부여할 id 시퀀스값 조회
	public static String getFolderNextSeq() {
		String result = "";
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("select nextval('folder_id_seq')");
		List<String> queryResult = query.list();
		
		if(queryResult.size() > 0)
			result = queryResult.get(0);

		session.getTransaction().commit();				
		return result;
	}
	

	// folder 생성
	public static Folder createNewFolder(String parent_folder_id, String new_name) {
		Folder parent = getFolderByFolder_id(parent_folder_id);
		Folder newFolder = new Folder(getFolderNextSeq(), new_name, parent.getPath()+"\\"+parent.getFolderName() , parent_folder_id);
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		session.save(newFolder);
		session.getTransaction().commit();		
		
		return newFolder;
	}
}
