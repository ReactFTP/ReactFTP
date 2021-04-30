package com.genergy.dao;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.CustomFTPClient;
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
			
			child.put("fid", f.getFolderId());
			child.put("fname", f.getFolderName());
			child.put("fauth", f.getAuthId());
			child.put("fco", f.getCoId());
			child.put("folderList", new ArrayList());
			child.put("fileList", new ArrayList());
			
			result.add(child);
		}

		session.getTransaction().commit();
		return result;
	}
	
	// Folder DB 조회(folder_id)
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
	
	// 부여할 Folder ID count
	public static String getFolderNextSeq() {
		String result = "";
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("select count(*) from Folder");
		List<Long> queryResult = query.list();
		
		if(queryResult.size() > 0) {
			result = queryResult.get(0).toString();
		}

		session.getTransaction().commit();				
		return result;
	}
	
	// Folder 생성
	public static Folder createNewFolder(String parent_folder_id, String new_name, String co_id) {
		Folder parent = getFolderByFolder_id(parent_folder_id);

		// FTP 서버에 새 디렉토리 생성
		if(!CustomFTPClient.createFolder(parent.getPath(), parent.getFolderName(), new_name)) {
			System.out.println("FTP 서버 폴더 생성 실패");
			return null;
		}
		
		// DB 서버 Folder 테이블에 데이터 추가
		String new_folder_id = getFolderNextSeq();
		Folder newFolder = new Folder();
		newFolder.setFolderId(new_folder_id);
		newFolder.setFolderName(new_name);
		newFolder.setPath(parent.getPath()+"/"+parent.getFolderName());
		newFolder.setCreatedDate(new Date());
		newFolder.setLastModifiedDate(new Date());
		newFolder.setCount(0);
		newFolder.setAuthId("c");
		newFolder.setParentsFolderId(parent_folder_id);
		newFolder.setCoId(co_id);
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		session.save(newFolder);
		session.getTransaction().commit();
		
//		Folder f = setFolder(new_folder_id, co_id, parent_folder_id);
		return newFolder;
	}	
	
	// Folder 삭제
	public static Folder deleteFolder(String folder_id) {
		Folder targetFolder = getFolderByFolder_id(folder_id);
		Folder ParentFolder = getFolderByFolder_id(targetFolder.getParentsFolderId());
		
		// FTP 서버에서 폴더 삭제
		boolean result = CustomFTPClient.deleteFolder(targetFolder.getPath(), targetFolder.getFolderName());
		if(!result) {
			System.out.println("FTP 서버 폴더 삭제 실패");
			return null;
		}
		
		// DB 서버 Folder 테이블에 데이터 삭제
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		session.delete(targetFolder);
		session.getTransaction().commit();
		
		return ParentFolder;
	}
	
	// Folder 수정
	public static Folder modifyFolder(String folder_id, String auth_id, String new_folder_name) {
		Folder targetFolder = getFolderByFolder_id(folder_id);
		
		// FTP 서버에서 폴더명 수정
		boolean result = CustomFTPClient.modifyFolder(targetFolder, new_folder_name);
//		if(!result) {
//			System.out.println("FTP 서버 폴더명 변경 실패");
//			return null;
//		}
		// FTP 서버에 정상 변경 되었지만 result 값을 false로 반환하는 문제. 수정해야하는 사항.
		
		// DB 서버 Folder 테이블에 데이터 업데이트
		targetFolder.setFolderName(new_folder_name);
		if(!auth_id.equals("") && auth_id!=null)
			targetFolder.setAuthId(auth_id);
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		session.update(targetFolder);
		session.getTransaction().commit();
		
		return targetFolder;
	}
	
}
