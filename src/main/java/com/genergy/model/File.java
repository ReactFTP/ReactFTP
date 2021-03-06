package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="file", schema="public")
public class File implements Serializable {

	@Id
	@Column(name="file_id")
	private String fileId;
	@Column(name="file_name")
	private String fileName;
	@Column(name="folder_id")
	private String folderId;
	@Column(name="create_date")
	private Date createdDate;
	@Column(name="last_modified_date")
	private Date lastModifiedDate;
	@Column(name="count")
	private int count;
	@Column(name="auth_id")
	private String authId;
	@Column(name="type")
	private String type;
	@Column(name="size")
	private int size;
	
	public String getFileId() {
		return fileId;
	}
	public void setFileId(String fileId) {
		this.fileId = fileId;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getFolderId() {
		return folderId;
	}
	public void setFolderId(String folderId) {
		this.folderId = folderId;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public String getAuthId() {
		return authId;
	}
	public void setAuthId(String authId) {
		this.authId = authId;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}

	// 수정일 일시 포맷 String 반환
	public String getLastModifiedDateToString() {
		String last_modified_date = this.lastModifiedDate.toString();
		int hour = Integer.parseInt(last_modified_date.substring(11, 13));
		String time = last_modified_date.substring(11, 16);
		last_modified_date = last_modified_date.substring(0, 11);
		if(hour >= 12)
			last_modified_date = last_modified_date + "오후 " + (hour-12) + time.substring(2);
		else
			last_modified_date = last_modified_date + "오전 " + hour + time.substring(2);
		return last_modified_date;
	}
}
