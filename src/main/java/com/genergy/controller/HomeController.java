package com.genergy.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.net.ftp.FTPClient;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.fasterxml.jackson.databind.ObjectMapper;
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
	
	// 폴더 수정
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
	
	// 파일 삭제
	@GetMapping("/deletefile")
	@ResponseBody
	public Map deleteFile (HttpServletRequest request) {
		String parent_folder_id = request.getParameter("parent_folder_id");
		String file_id = request.getParameter("file_id");
		FolderDAO folderdao = new FolderDAO();
		FileDAO filedao = new FileDAO();

		// DB file 테이블에 삭제할 파일 데이터 삭제 + FTP 서버에 파일 삭제
		Folder parentFolder = folderdao.getFolderByFolder_id(parent_folder_id);
		Folder result_ParentFolder = filedao.deleteFile(parentFolder, file_id);
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
	
		
	
	
	// 파일 업로드
	@PostMapping("/fileupload")
	@ResponseBody
	public String fileUpload (MultipartHttpServletRequest request) {
		String file = request.getParameter("file");
		System.out.println("파일 업로드");
		String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());
		fileId = fileId.substring(8);
		System.out.println(fileId);
		return fileId;
		/*
		Map<String, Object> result = new HashMap<String, Object>();
		
		String savePath = "/FTP/2021년 상반기 신입사원 교육/REACT_FTP_TEMP_PATH";
		try {
			ftpClient.changeWorkingDirectory(savePath);
			savePath = ftpClient.printWorkingDirectory();
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		System.out.println(savePath);
		
		
		String TEMP_PATH = "F:\\myUpload";	// 임시 저장 경로
		String UPLOAD_PATH = "F:\\myLpload\\realPath";	// 실제 업로드할 경로
		int MAX_SIZE = 300 * 1024 * 1024;	// 파일 다운로드 할 수 있는 최대 크기, 300MB
		
		try {
			java.io.File file = new java.io.File(TEMP_PATH);
			if(!file.exists())	// 파일 경로가 존재하지 않을 경우
				file.mkdirs();	// 파일 경로 만들기
			
			// MultipartRequest(request, 저장 경로, 최대 크기, "UTF-8", new DefaultFileRenamePolicy());
			MultipartRequest multipart = new MultipartRequest(request, TEMP_PATH, MAX_SIZE, "UTF-8");// 임시 경로에 파일 업로드
			File getFileInfo = new ObjectMapper().readValue(multipart.getParameter("file_info"), File.class);	// String to JSON
						
			Enumeration<String> fileEnum = multipart.getFileNames();	// 넘어온 파일 key 값들
			while(fileEnum.hasMoreElements()) {
				String fileName = fileEnum.nextElement(); // 클라이언트에서 넣은 파일 key값 ex) file0, file1, ...
				
				String fileId = (new Date().getTime()) + "" + (new Random().ints(1000, 9999).findAny().getAsInt());	// 현재 날짜와 랜덤 정수값으로 새로운 파일명 만들기
				String originName = multipart.getOriginalFileName(fileName);
				String fileExtension = originName.substring(originName.lastIndexOf(".") + 1);	// ex) jpg
				originName = originName.substring(0, originName.lastIndexOf("."));	// 파일
				long fileSize = multipart.getFile(fileName).length();	// 파일 사이즈
				
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		
		
		return "데이터 받았음";
		
		
		*/
		
		
		
		
		/*
		String parent_folder_id = request.getParameter("parent_folder_id");
		String file_id = request.getParameter("file_id");
		FolderDAO folderdao = new FolderDAO();
		FileDAO filedao = new FileDAO();

		// DB file 테이블에 삭제할 파일 데이터 삭제 + FTP 서버에 파일 삭제
		Folder parentFolder = folderdao.getFolderByFolder_id(parent_folder_id);
		Folder result_ParentFolder = filedao.deleteFile(parentFolder, file_id);
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
		*/
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
