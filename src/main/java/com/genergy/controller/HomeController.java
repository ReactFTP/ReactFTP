package com.genergy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.genergy.dao.FileDAO;
import com.genergy.dao.FolderDAO;
import com.genergy.model.File;
import com.genergy.model.Folder;

@RestController
@RequestMapping("/home")
public class HomeController {
	
	public HomeController() {
		System.out.println("hello, home");
	}

	@GetMapping("/getfolderlist")
	@ResponseBody
	public Map getTopFolderList (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("fid", folder_id);
		result.put("fname", folderdao.getFolderByFolder_id(folder_id).getFolderName());
		result.put("folderList", folderdao.getFolderListByFolder_id(folder_id));	// 트리에 사용되는 리스트
		result.put("fileList", filedao.getFileListByFolder_id(folder_id));	// 테이블에 사용되는 리스트
		
		return result;
	}
	
	@GetMapping("/getfoldercontents")
	@ResponseBody
	public Map getSelectedFolderList (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("fid", folder_id);
		result.put("fname", folderdao.getFolderByFolder_id(folder_id).getFolderName());
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
//		FileDAO filedao = new FileDAO();	//
		FolderDAO folderdao = new FolderDAO();
		Folder newFolder = folderdao.createNewFolder(parent_folder_id, new_name);
		String fid = newFolder.getFolderId();
		
		Map<String, Object> result = new HashMap<String, Object>();

		result.put("fid", fid);
		result.put("fname", newFolder.getFolderName());
		result.put("folderList", new ArrayList());	// 트리에 사용되는 리스트
		result.put("fileList", new ArrayList());	// 테이블에 사용되는 리스트
		
		return result;
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
