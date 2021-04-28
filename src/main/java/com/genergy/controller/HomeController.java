package com.genergy.controller;

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

@RestController
@RequestMapping("/home")
public class HomeController {
	
	public HomeController() {
		System.out.println("hello, home");
	}

	@GetMapping("/getfolderlist")
	@ResponseBody
	public Map idCheck (HttpServletRequest request) {
		String folder_id = request.getParameter("folder_id");
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		
		Map<String, Object> result = new HashMap<String, Object>();
		
		result.put("fid", folder_id);
		result.put("fname", folderdao.getFolderNameByFolder_id(folder_id));
		result.put("folderList", folderdao.getFolderListByFolder_id(folder_id));
		result.put("fileList", filedao.getFileListByFolder_id(folder_id));
		
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
