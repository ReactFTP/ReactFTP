package com.genergy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTPClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.genergy.dao.FileDAO;
import com.genergy.dao.FolderDAO;
import com.genergy.model.CustomFTPClient;
import com.genergy.model.File;
import com.genergy.model.Folder;

@RestController
@RequestMapping("/home")
public class HomeController {
	public static FTPClient ftpClient;
	
	public HomeController() {
		ftpClient = null;
		System.out.println("hello, home");
	}

	@GetMapping("/ftpconnect")
	@ResponseBody
	public void ftpConnect (HttpServletRequest request) {
		String session_id = request.getParameter("session_id");
		if(session_id == null)
			return;
		
		// FTP 서버 연결
		CustomFTPClient.connection();
		ftpClient = CustomFTPClient.getFTPClient();
	}
	
	// Home page 최초 바인딩 데이터 (최상위 디렉토리)
	@GetMapping("/getfolderlist")
	@ResponseBody
	public Map getTopFolderList (HttpServletRequest request) {
		Map<String, Object> result = new HashMap<String, Object>();
		
		String folder_id = request.getParameter("folder_id");
		String session_id = request.getParameter("session_id");
		if(ftpClient == null) {
			result.put("message", "연결 불가");
			return result;
		}
		
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();

		// 최상위 디렉토리의 정보
		Folder topFolder = folderdao.getFolderByFolder_id(folder_id);
		result.put("fid", topFolder.getFolderId());
		result.put("fname", topFolder.getFolderName());
		result.put("fauth", topFolder.getAuthId());
		result.put("fco", topFolder.getCoId());
		result.put("folderList", folderdao.getFolderListByFolder_id(folder_id));	// 트리에 사용되는 리스트
		result.put("fileList", filedao.getFileListByFolder_id(folder_id));	// 테이블에 사용되는 리스트
		
		return result;
	}

	// Home page 선택한 폴더 바인딩 데이터
	@GetMapping("/getfoldercontents")
	@ResponseBody
	public Map getSelectedFolderList (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		
		Map<String, Object> result = new HashMap<String, Object>();

		// 선택한 디렉토리의 정보
		Folder selectedFolder = folderdao.getFolderByFolder_id(folder_id);
		result.put("fid", selectedFolder.getFolderId());
		result.put("fname", selectedFolder.getFolderName());
		result.put("fauth", selectedFolder.getAuthId());
		result.put("fco", selectedFolder.getCoId());
		result.put("folderList", folderdao.getFolderListByFolder_id(folder_id));	// 트리에 사용되는 리스트
		result.put("fileList", filedao.getFileListByFolder_id(folder_id));	// 테이블에 사용되는 리스트
		
		return result;
	}
	
	// 폴더 생성
	@GetMapping("/createfolder")
	@ResponseBody
	public Map createFolder (HttpServletRequest request) {
		String parent_folder_id = request.getParameter("parent_folder_id");
		String new_name = request.getParameter("new_name");
		String co_id = request.getParameter("co_id");
//		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		
		// DB folder 테이블에 새로운 폴더 데이터 추가 + FTP 서버에 폴더 추가
		Folder newFolder = folderdao.createNewFolder(parent_folder_id, new_name, co_id);
		
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("fid", newFolder.getFolderId());
		result.put("fname", newFolder.getFolderName());
		result.put("fauth", newFolder.getAuthId());
		result.put("fco", newFolder.getCoId());
		result.put("folderList", new ArrayList());	// 트리에 사용되는 리스트
		result.put("fileList", new ArrayList());	// 테이블에 사용되는 리스트
		
		return result;
	}
	
	// 폴더 삭제
	@GetMapping("/deletefolder")
	@ResponseBody
	public Map deleteFolder (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		FolderDAO folderdao = new FolderDAO();
		FileDAO filedao = new FileDAO();
		
		// DB folder 테이블에 삭제할 폴더 데이터 삭제 + FTP 서버에 폴더 삭제
		Folder result_ParentFolder = folderdao.deleteFolder(folder_id);
		if(result_ParentFolder == null)
			return null;

		Map<String, Object> result = new HashMap<String, Object>();
		String parentId = result_ParentFolder.getFolderId();
		result.put("fid", result_ParentFolder.getFolderId());
		result.put("fname", result_ParentFolder.getFolderName());
		result.put("fauth", result_ParentFolder.getAuthId());
		result.put("fco", result_ParentFolder.getCoId());
		result.put("folderList", folderdao.getFolderListByFolder_id(parentId));	// 트리에 사용되는 리스트
		result.put("fileList", filedao.getFileListByFolder_id(parentId));	// 테이블에 사용되는 리스트
		
		return result;
	}
	
	// 폴더 수정modifyfile
	@GetMapping("/modifyfolder")
	@ResponseBody
	public void modifyFolder (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		String auth_id = request.getParameter("auth_id");
		String new_folder_name = request.getParameter("new_folder_name");
//		System.out.println(folder_id + ", " + auth_id + ", " + new_folder_name);
		FolderDAO folderdao = new FolderDAO();

		// DB folder 테이블에 수정할 폴더 데이터 업데이트 + FTP 서버에 폴더 수정
		Folder result_ParentFolder = folderdao.modifyFolder(folder_id, auth_id, new_folder_name);
		
		if(result_ParentFolder == null)
			System.out.println("폴더 수정 실패");
	}
	
	// 파일 수정
	@GetMapping("/modifyfile")
	@ResponseBody
	public void modifyFile (HttpServletRequest request) {
		String parent_folder_id = request.getParameter("parent_folder_id");
		String file_id = request.getParameter("file_id");
		String auth_id = request.getParameter("auth_id");
		String new_file_name = request.getParameter("new_file_name");
		
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();

		// DB folder 테이블에 수정할 폴더 데이터 업데이트 + FTP 서버에 폴더 수정
		Folder parentFolder = folderdao.getFolderByFolder_id(parent_folder_id);
		File result_File = filedao.modifyFile(parentFolder, file_id, auth_id, new_file_name);
		
		if(result_File == null)
			System.out.println("폴더 수정 실패");
	}
	
	
//	@GetMapping("/getFileList")
//	@ResponseBody
//	public String idCheck (HttpServletRequest request) {
//		String folder_id = request.getParameter("folder_id");
//		FileDAO filedao = new FileDAO();
//		
//		System.out.println("/gethomecontents 호출");
//		
//		return filedao.getFileList(folder_id);
//	}
	
//	@GetMapping("/createfile")
//	public void create(File file) {
//		File newFile = new File();
//		
//	}
	
}
