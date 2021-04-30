package com.genergy.model;

import java.io.IOException;

import org.apache.commons.net.ftp.FTP;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.commons.net.ftp.FTPReply;

public class CustomFTPClient {
	static FTPClient client = new FTPClient();

	public static FTPClient getFTPClient() {
		return client;
	}
	
	public static boolean connection() {
		try {
			String serverIp = "192.5.4.2";
			client.setControlEncoding("euc-kr");
			int port = 21;
			client.connect(serverIp, port);
			int replyCode = client.getReplyCode();
			if(FTPReply.isPositiveCompletion(replyCode)) {
				System.out.println(serverIp + "에 연결되었습니다.");
				System.out.println(replyCode + " SUCCESS CONNECTION.");
			}
		} catch (Exception e) {
			System.out.println("서버 연결 실패");
			System.exit(1);
		}
		// FTP 서버 로그인
		try {
			boolean loginCheck = client.login("yskim", "951221");
			if(!loginCheck) {
				System.out.println(client.getReplyCode() + "Login incorrect.");
				System.exit(1);
			}
			else
				System.out.println(client.getReplyCode() + "Login successful.");
		} catch(Exception e) {
			System.out.println(client.getReplyCode() + "Login incorrect.");
			return false;
		}
		return true;
	}
	
	// FTP 서버 최상위 폴더 가져오기
	public static FTPFile getTopDirectory() {
		FTPFile[] files = null;
		try {
			files = client.listFiles("/FTP");
			// 정상적으로 가져왔는지 테스트
			for (int i = 0; i < files.length; i++) {
				System.out.println(files[i]);
			}
		    for (FTPFile ftpFile : files) {
		       if (ftpFile.getName().equals("REACT FTP")) {
		    	   return ftpFile;
		       }
		    }
		} catch (IOException e) {
			System.out.println(client.getReplyCode() + "Login incorrect.");
		}
		return null;
	}// FTP 서버 최상위 폴더 가져오기 완료
	
	// FTP 서버 선택한 폴더 가져오기
	public static FTPFile getDirectory(String folderPath, String folderName) {
		FTPFile[] files = null;
		try {
			files = client.listFiles(folderPath);
			// 정상적으로 가져왔는지 테스트
			for (int i = 0; i < files.length; i++) {
				System.out.println(files[i]);
			}
		    for (FTPFile ftpFile : files) {
		       if (ftpFile.getName().equals(folderName)) {
		    	   return ftpFile;
		       }
		    }
		} catch (IOException e) {
			System.out.println(client.getReplyCode() + "Login incorrect.");
		}
		return null;
	}// FTP 서버 선택한 폴더 가져오기 완료
	
	// FTP 서버에 디렉토리 생성
	public static boolean createFolder(String parentPath, String parentName, String folderName) {
		System.out.println(parentPath + "/" + parentName + "/" + folderName);
		try {
			if(client.makeDirectory(parentPath + "/" + parentName + "/" + folderName)) {
				System.out.println("폴더 생성 완료");
				return true;
			}
		} catch (IOException e) {
			e.printStackTrace();
		}
		return false;
	}// FTP 서버에 디렉토리 생성 완료

	// FTP 서버에 폴더 삭제
	public static boolean deleteFolder(String parentFolderPath, String folderName) {
		System.out.println("folderPath : " + parentFolderPath);
		
		String targetWithPath = parentFolderPath+"/"+folderName;
		try {
			client.changeWorkingDirectory(parentFolderPath);

			// folderName 폴더에 아이템이 있으면
            if (client.listFiles(targetWithPath).length > 0)
            	deleteChildFolder(folderName);	// 하위 컨텐츠 모두 삭제하기
            else
				client.removeDirectory(folderName);
			return true;
			
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
	}//	FTP 서버에 폴더 삭제 완료

	// FTP 서버 하위 폴더 삭제 (파일 삭제 시 호출하는 용도)
	public static boolean deleteChildFolder(String childFileName) throws IOException {
		String currentPath = client.printWorkingDirectory();
		client.changeWorkingDirectory(currentPath + "/" + childFileName);

		// pathName 디렉토리에 아이템이 있으면
		if (client.listFiles(client.printWorkingDirectory()).length > 0) {
			for (FTPFile item : client.listFiles(client.printWorkingDirectory())) {
				if (item.isDirectory())   {// 디렉토리일때 디렉토리 다시 삭제
					if(!client.removeDirectory(item.getName()))   // 하위에 파일이 있어서 삭제 실패시 재귀호출
						deleteChildFolder(item.getName());
				}
				else
					client.deleteFile(item.getName());   // 파일 삭제 메소드
			}
		}

		client.changeWorkingDirectory(currentPath);
		client.removeDirectory(childFileName);
		return true;
	}// FTP 서버 하위 폴더 삭제 완료

	// FTP 서버에 폴더 수정
	public static boolean modifyFolder(Folder folder, String newFolderName) {
		boolean result = false;
		String parentFolderPath = folder.getPath();
		String folderName = folder.getFolderName();
		
		try {
			// 수정할 폴더가 위치한 경로로 ftpClient 이동
			client.changeWorkingDirectory(parentFolderPath);

			// 변경할 이름(to)에 확장자명이 있다면 제거
			if(newFolderName.indexOf(".") != -1)
				newFolderName = newFolderName.split("\\.")[0];
			result = client.rename(folderName, newFolderName);	// 폴더명 변경
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}//	FTP 서버에 폴더 수정 완료

	// FTP 서버에 파일 수정
	public static boolean modifyFile(String filePath, File targetFile, String newFileName) {
		boolean result = false;
		String oldName = targetFile.getFileName();
		System.out.println(newFileName);

		// 변경할 이름(to)에 확장자명이 있다면 제거
		if(newFileName.indexOf(".") != -1)
			newFileName = newFileName.split("\\.")[0];
		
		try {
			// 수정할 파일이 위치한 경로로 ftpClient 이동
			client.changeWorkingDirectory(filePath);
			
			for (FTPFile item : client.listFiles(client.printWorkingDirectory())) {
				if(item.getName().indexOf(oldName) != -1){
					String from = item.getName();
					// 파일명 변경
					result = client.rename(from, newFileName + from.substring(from.indexOf(".")));
					return true;
				}
			}			
		} catch (IOException e) {
			e.printStackTrace();
		}
		return result;
	}//	FTP 서버에 파일 수정 완료

	// FTP 서버에 파일 삭제
	public static boolean deleteFile(String filePath, File targetFile) {
		String fileName = targetFile.getFileName();
		
		try {
			client.changeWorkingDirectory(filePath);

			System.out.println("삭제할 파일 : " + fileName);
			for (FTPFile item : client.listFiles(client.printWorkingDirectory())) {
				System.out.println("item.getName() : " + item.getName());
				if(item.getName().indexOf(fileName) != -1){
					String deleteFile = item.getName();
					// 파일 삭제
					client.deleteFile(deleteFile);
					return true;
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}//	FTP 서버에 파일 삭제 완료
	
}
