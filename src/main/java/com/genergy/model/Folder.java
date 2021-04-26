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
@Table (name="folder", schema="public")
public class Folder implements Serializable {

	@Id
	@Column(name="folder_id")
	private String folder_id;
	@Column(name="folder_name")
	private String folder_name;
	@Column(name="path")
	private String path;
	@Column(name="created_date")
	private Date created_date;
	@Column(name="last_modified_date")
	private Date last_modified_date;
	@Column(name="count")
	private int count;
	@Column(name="auth_id")
	private String auth_id;
	@Column(name="parents_folder_id")
	private String parents_folder_id;
}
