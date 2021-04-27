package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
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
	@Column(name="created_date")
	private Date createdDate;
	@Column(name="last_modified_date")
	private Date lastModifiedDate;
	@Column(name="count")
	private int count;
	@Column(name="auth_id")
	private String authId;
	@Column(name="type")
	private String type;
}
