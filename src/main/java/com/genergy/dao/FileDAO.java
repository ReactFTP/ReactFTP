package com.genergy.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.File;
import com.genergy.model.Folder;

public class FileDAO {
	private static SessionFactory factory;
	
	public FileDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	// 특정 폴더의 하위 file 목록 가져오기 (table 바인딩할 데이터)
	public static List<Object> getFileListByFolder_id(String folder_id) {
		List<Object> result = getFolderListByFolder_id(folder_id);	// table에 그릴 폴더리스트 먼저 담아온다.
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("from File where folderId=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<File> queryResult = query.list();

		for(File f : queryResult) {
			Map<String, Object> child = new HashMap<String, Object>();
			
//			String last_modified_date = f.getLastModifiedDate();
//			last_modified_date = last_modified_date.substring(0, 16);
//			f.setLastModifiedDate(last_modified_date);
			
			child.put("fid", f.getFileId());
			child.put("fname", f.getFileName());
			child.put("fdate", f.getLastModifiedDateToString());
			child.put("ftype", f.getType());
//			child.put("fsize", f.getSize());
			child.put("fsize", "0");
			
			result.add(child);
		}
//		session.close();

		session.getTransaction().commit();
		return result;
	}
	
	// 특정 폴더의 하위 folder 목록 가져오기 (table 바인딩할 데이터)
	public static List<Object> getFolderListByFolder_id(String folder_id) {
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("from Folder where parentsFolderId=:folder_id");
		query.setParameter("folder_id", folder_id);
		List<Folder> queryResult = query.list();
//		session.getTransaction().commit();
		
		List<Object> result = new ArrayList<Object>();
		
		for(Folder f : queryResult) {
			Map<String, Object> child = new HashMap<String, Object>();
//
//			String last_modified_date = f.getLastModifiedDate();
//			int hour = Integer.parseInt(last_modified_date.substring(11, 13));
//			String time = last_modified_date.substring(11, 16);
//			last_modified_date = last_modified_date.substring(0, 11);
//			if(hour >= 12)
//				last_modified_date = last_modified_date + "오후 " + (hour-12) + time.substring(2);
//			else
//				last_modified_date = last_modified_date + "오전 " + hour + time.substring(2);
//			f.setLastModifiedDate(last_modified_date);
			
			child.put("fid", f.getFolderId());
			child.put("fname", f.getFolderName());
			child.put("fdate", f.getLastModifiedDateToString());
			child.put("ftype", "폴더");
			child.put("fsize", "");
			
			result.add(child);
		}
//		session.close();

		session.getTransaction().commit();		
		return result;
	}
	
}
