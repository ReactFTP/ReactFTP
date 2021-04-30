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
import com.genergy.model.CustomFTPClient;
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
			
			child.put("fid", f.getFileId());
			child.put("fname", f.getFileName());
			child.put("fauth", f.getAuthId());
//			child.put("fco", f.getFolderId());	// 부모 폴더의 id 로 회사 정보 가져옴. 현재 필요없음
			child.put("fdate", f.getLastModifiedDateToString());
			child.put("ftype", f.getType());
//			child.put("fsize", f.getSize());
			child.put("fsize", "0");
			child.put("folderid", f.getFolderId());
			
			result.add(child);
		}
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

		List<Object> result = new ArrayList<Object>();
		
		for(Folder f : queryResult) {
			Map<String, Object> child = new HashMap<String, Object>();
			
			child.put("fid", f.getFolderId());
			child.put("fname", f.getFolderName());
			child.put("fauth", f.getAuthId());
			child.put("fco", f.getCoId());
			child.put("fdate", f.getLastModifiedDateToString());
			child.put("ftype", "폴더");
			child.put("fsize", "");
			
			result.add(child);
		}
		session.getTransaction().commit();

		return result;
	}
	
	// File DB 조회(file_id)
	public static File getFileByFile_id(String file_id) {
		File result = null;
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("from File where fileId=:file_id");
		query.setParameter("file_id", file_id);
		List<File> queryResult = query.list();
		
		if(queryResult.size() > 0)
			result = queryResult.get(0);

		session.getTransaction().commit();				
		return result;
	}
	
	// 부여할 File ID count
	public static String getFileNextSeq() {
		String result = "";
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();

		Query query = session.createQuery("select count(*) from File");
		List<Long> queryResult = query.list();
		
		if(queryResult.size() > 0) {
			result = queryResult.get(0).toString();
		}

		session.getTransaction().commit();				
		return result;
	}
	
	// File 수정
	public static File modifyFile(Folder parent_folder, String file_id, String auth_id, String new_file_name) {
		File targetFile = getFileByFile_id(file_id);
		String filePath = parent_folder.getPath() + "/" + parent_folder.getFolderName();
		
		// FTP 서버에서 파일명 수정
		boolean result = CustomFTPClient.modifyFile(filePath, targetFile, new_file_name);
//		if(!result) {
//			System.out.println("FTP 서버 폴더명 변경 실패");
//			return null;
//		}
		// FTP 서버에 정상 변경 되었지만 result 값을 false로 반환하는 문제. 수정해야하는 사항.
		
		// DB 서버 File 테이블에 데이터 업데이트
		targetFile.setFileName(new_file_name);
		if(!auth_id.equals("") && auth_id!=null)
			targetFile.setAuthId(auth_id);
		
		Session session = factory.getCurrentSession();
		session.beginTransaction();
		session.update(targetFile);
		session.getTransaction().commit();
		
		return targetFile;
	}
	
}
