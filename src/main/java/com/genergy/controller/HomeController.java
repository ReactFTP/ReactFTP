package com.genergy.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.genergy.dao.FileDAO;
import com.genergy.dao.FolderDAO;
import com.genergy.ftp.resources.MakeZipInFTP;
import com.genergy.model.CustomFTPClient;
import com.genergy.model.File;
import com.genergy.model.Folder;

import net.sf.jazzlib.ZipOutputStream;


@RestController
@RequestMapping("/home")
public class HomeController {
	public static FTPClient ftpClient;
	
	public HomeController() {
		ftpClient = null;
		System.out.println("hello, home");
	}

	// FTP 서버 연결
	@GetMapping("/ftpconnect")
	@ResponseBody
	public void ftpConnect (HttpServletRequest request) {
		String session_id = request.getParameter("session_id");
		if(session_id == null)
			return;
		
		CustomFTPClient.connection();	// FTP 서버 연결
		ftpClient = CustomFTPClient.getFTPClient();
	}// FTP 서버 연결 완료

	// FTP 서버 연결 종료
	@GetMapping("/ftpdisconnect")
	@ResponseBody
	public void ftpDisConnect (HttpServletRequest request) {
		try {
			ftpClient.disconnect();		// FTP 서버 연결 종료
		} catch (IOException e) {
			e.printStackTrace();
		}
	}// FTP 서버 연결 종료 완료
	
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
		folderdao.modifyFolder(parent_folder_id, "", "");
		
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
		folderdao.modifyFolder(parent_folder_id, null, null);
		
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
		folderdao.modifyFolder(parent_folder_id, null, null);

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
	@PostMapping("/uploadfile")
	@ResponseBody
	public Map fileUpload (@RequestParam(value="file", required=true) MultipartFile multipartFile,
			   			   @RequestParam(value="company_id", required=true) String company_id,
						   @RequestParam(value="parent_folder_name", required=true) String parent_folder_name,
						   @RequestParam(value="folder_id", required=true) String folder_id,
						   @RequestParam(value="owner_auth", required=true) String owner_auth) {
//	public Map fileUpload (@RequestParam("file") MultipartFile multipartFile) {
//	public Map fileUpload (@RequestPart("file") MultipartFile multipartFile) {
		// 에로사항 : Bean 등록 안함 + required 속성 값이 없었음
		// Bean 등록 위치 : ReactProjectApplication.java (Controller 패키지에 위치중..)
//		String origName; 
//      origName = new String(mfile.getOriginalFilename().getBytes("8859_1"), "UTF-8"); //한글꺠짐 방지
		
		System.out.println("파일 업로드");
		company_id = company_id.replace("\"", "");
		parent_folder_name = parent_folder_name.replace("\"", "");
		folder_id = folder_id.replace("\"", "");
		owner_auth = owner_auth.replace("\"", "");
		System.out.println(company_id);				// 0	- test company 회사코드
		System.out.println(parent_folder_name);		// test company	- 회사 이름
		System.out.println(folder_id);				// 2	- 회사 폴더의 아이디
		System.out.println(owner_auth);				// c	- 업로드한 계정의 권한
		
		FolderDAO folderdao = new FolderDAO();
		FileDAO filedao = new FileDAO();
		Folder parentFolder = folderdao.getFolderByFolder_id(folder_id);
		folderdao.modifyFolder(folder_id, null, null);
		String savePath = parentFolder.getPath()+"/"+parentFolder.getFolderName();

		// 로컬에 임시로 생성할 디렉토리 만들기
//		String FILE_SERVER_PATH = "C:/REACT_FTP_UPLOAD_TEMP/";
		String FILE_SERVER_PATH=null;
		try {
			FILE_SERVER_PATH = ftpClient.printWorkingDirectory()+"FTP/2021년 상반기 신입사원 교육/TEMP/";	//  /
		} catch (IOException e1) {
			e1.printStackTrace();
		}
		java.io.File dir = new java.io.File(FILE_SERVER_PATH);
		if (!dir.exists())
			dir.mkdirs();
		
		// 로컬 임시 디렉토리에 임시파일 만들기
		java.io.File targetFile = new java.io.File(FILE_SERVER_PATH + multipartFile.getOriginalFilename());
		
		try {
			InputStream fileStream = multipartFile.getInputStream();
			FileUtils.copyInputStreamToFile(fileStream, targetFile);
			// ㄴ 로컬에 임시파일 만들기 완료.
			
			// 파일 생성할 위치로 ftpclient 이동
			ftpClient.changeWorkingDirectory(savePath);
			
			FileInputStream fis = new FileInputStream(targetFile);
			boolean isSuccess = ftpClient.storeFile(savePath + "/"+ targetFile.getName(), fis);
			if(!isSuccess) {
				System.out.println("파일 업로드 실패");
				return null;
			}
			
			// DB 에 새 파일 정보 추가하기.
			String fileName = multipartFile.getOriginalFilename();
			Long fileLength = targetFile.length()/1024 + 1;
			String fileSize = fileLength.toString();
			filedao.addFile(parentFolder, fileName, owner_auth, fileSize);
			
		} catch (Exception e) {
			FileUtils.deleteQuietly(targetFile);
			e.printStackTrace();
		}
		
		Map<String, Object> m = new HashMap<>();
        m.put("errorCode", 10);
        return m;
	}
	
	// 파일 다운로드
//	@GetMapping(value="/downloadfile", produces = "application/text; charset=utf8")
	@GetMapping(value="/downloadfile")
	@ResponseBody
	public boolean downloadFile (HttpServletRequest request, HttpServletResponse response) {
		String file_id = request.getParameter("file_id");
		System.out.println(file_id);
		boolean success = false;
		
		FileDAO filedao = new FileDAO();
		FolderDAO folderdao = new FolderDAO();
		File targetFile = filedao.getFileByFile_id(file_id);
		Folder parentFolder = folderdao.getFolderByFolder_id(targetFile.getFolderId());
		String fileName = targetFile.getFileName();
		fileName = fileName + "." + targetFile.getType();
		String ftpPath = parentFolder.getPath() + "/" + parentFolder.getFolderName();
		System.out.println("ftpPath : " + ftpPath);
		
		try {
//			setDisposition(fileName, request, response);
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		
		// FTP 서버에서 파일 다운로드
		try {
			ftpClient.setControlEncoding("utf-8");
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			ftpClient.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
			ftpClient.enterLocalActiveMode();
			ftpClient.changeWorkingDirectory(ftpPath);
			System.out.println(ftpClient.printWorkingDirectory());
			System.out.println(fileName);
	        response.setHeader("Content-Disposition", "attachment; filename=" + fileName);
//	        response.setHeader("Content-Transfer-Encoding", "binary"); 
	        response.setHeader("Content-Type", "application/octet-stream;");
//	        response.setHeader("Content-Length", "" + fileLength);
//	        response.setHeader("Pragma", "no-cache;");
//	        response.setHeader("Expires", "-1;");
	        
			InputStream is = new BufferedInputStream(ftpClient.retrieveFileStream(fileName));
			OutputStream os =  new BufferedOutputStream(response.getOutputStream());
		
//			ftpClient.retrieveFile(fileName, os);
			byte[] bytesArray = new byte[4096]; 	// 2의 12승
			int read = -1;
			while((read = is.read(bytesArray)) != -1)
				os.write(bytesArray, 0, read);
			
			success = ftpClient.completePendingCommand();
		
			os.close();
			is.close();
		        
			if (success){
				System.out.println("파일 다운로드 성공");
				
				// DB 해당 파일 download count +1
				filedao.modifyFileDownloadCount(file_id);
	        }
	        else{
				System.out.println("파일 다운로드 실패");
	        }
		} catch (IOException e) {
			e.printStackTrace();
		}

		return success;
	}
	
	
	
	// 압축 다운로드
	@GetMapping("/downloadfolder")
	@ResponseBody
	public void downloadFolder (HttpServletRequest request, HttpServletResponse response) {
		String folder_id = request.getParameter("folder_id");
		
		FolderDAO folderdao = new FolderDAO();
		Folder targetFolder = folderdao.getFolderByFolder_id(folder_id);
		
	//	Folder parentFolder = folderdao.getFolderByFolder_id(targetFile.getFolderId());
		String folderName = targetFolder.getFolderName();
		//fileName = fileName + "." + targetFile.getType();
		String ftpPath = targetFolder.getPath() + "/" + targetFolder.getFolderName();
		
		System.out.println("ftpPath : " + ftpPath);
		try {
			ftpClient.setControlEncoding("euc-kr");
			ftpClient.setFileType(FTP.BINARY_FILE_TYPE);
			ftpClient.setFileTransferMode(FTP.STREAM_TRANSFER_MODE);
			ftpClient.enterLocalActiveMode();
			ftpClient.changeWorkingDirectory(ftpPath);
			System.out.println(ftpClient.printWorkingDirectory());
//			response.setHeader("Content-Disposition", "attachment; folderName=" + folderName); // .확장자 있어야할수도
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		byte[] bytesArray = new byte[64*1024];
		FileInputStream is = null;
		FileOutputStream os = null;
		ZipOutputStream zoutput = null;
		MakeZipInFTP.MakeZipInFTP(ftpClient, is, os, zoutput, bytesArray, response);
	}
	
}
