package com.genergy.ftp.resources;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;

import net.sf.jazzlib.ZipEntry;
import net.sf.jazzlib.ZipOutputStream;

public class MakeZipInFTP {
	
	
	public static void MakeZipInFTP(FTPClient ftpClient, FileInputStream is, FileOutputStream os, ZipOutputStream zoutput, byte[] bytesArray, HttpServletResponse response) {
		String ftpWorkingDirectory = null;
		try {
			ftpWorkingDirectory = ftpClient.printWorkingDirectory();
			String zipname = ftpWorkingDirectory.substring(ftpWorkingDirectory.lastIndexOf("/")+1, ftpWorkingDirectory.length());
			 File zipFile = new File("123");
			 ZipOutputStream zipOut = new ZipOutputStream(new FileOutputStream(zipFile));
			 FTPFile[] ftpFileList = ftpClient.listFiles();
			 for (FTPFile ftpFile : ftpFileList) {
	                ZipEntry entry = new ZipEntry(ftpFile.getName());
	                zipOut.putNextEntry(entry);
	                //InputStream bis = ftp.retrieveFileStream(ftpFileList.get(i));
	                                 // specific reasons see https://blog.csdn.net/weixin_40816738/article/details/102525003
//	                InputStream bis = ftpClient.retrieveFileStream(new String(ftpFile.getName().getBytes("UTF-8"), "ISO-8859-1"));
	                InputStream bis = ftpClient.retrieveFileStream(ftpFile.getName());
	                
	                if (bis != null) {
	                    int readLen = -1;
	                    while ((readLen = bis.read(bytesArray, 0, 1024)) != -1) {
	                        zipOut.write(bytesArray, 0, readLen);
	                    }
	                    zipOut.closeEntry();
	                    bis.close();
	                    ftpClient.completePendingCommand();
	                                         // Call ftp.retrieveFileStream after this interface must manually close InputStream off the return, and then call the method completePendingCommand
	                                         // if not the face after the operation FTPClient have failed in this order will result in
	                }
	            }
			  zipOut.close();
	                         // Download
	            int len;
	            FileInputStream zipInput = new FileInputStream(zipFile);
	            OutputStream out = response.getOutputStream();
				
				 response.setContentType("application/octet-stream");
				 response.addHeader("Content-Disposition", "attachment; filename=" +
				zipname + ".zip");
				
	            while ((len = zipInput.read(bytesArray)) != -1) {
	                out.write(bytesArray, 0, len);
	            }
	            zipInput.close();
	            out.flush();
	            out.close();
	                         // delete archive
	            zipFile.delete();
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
	    }
}
