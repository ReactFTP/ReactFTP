package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Entity
@DynamicInsert
@DynamicUpdate
@Table (name="folder", schema="public")
public class Folder implements Serializable {

	@Id
	@Column(name="folder_id")
	private String folderId;
	@Column(name="folder_name")
	private String folderName;
	@Column(name="path")
	private String path;
	@Column(name="create_date")
	private Date createdDate;
	@Column(name="last_modified_date")
	private Date lastModifiedDate;
	@Column(name="count")
	private int count;
	@Column(name="auth_id")
	private String authId;
	@Column(name="parents_folder_id")
	private String parentsFolderId;
	@Column(name="co_id")
	private String coId;
	
	public Folder() {
		super();
	}
	
	public String getFolderId() {
		return folderId;
	}
	public void setFolderId(String folderId) {
		this.folderId = folderId;
	}
	public String getFolderName() {
		return folderName;
	}
	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public void setLastModifiedDate(Date lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	public Date getLastModifiedDate() {
		return lastModifiedDate;
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
	public String getParentsFolderId() {
		return parentsFolderId;
	}
	public void setParentsFolderId(String parentsFolderId) {
		this.parentsFolderId = parentsFolderId;
	}
	public String getCoId() {
		return coId;
	}
	public void setCoId(String coId) {
		this.coId = coId;
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
