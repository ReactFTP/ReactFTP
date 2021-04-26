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
	private String file_id;
	@Column(name="file_name")
	private String file_name;
	@Column(name="folder_id")
	private String folder_id;
	@Column(name="created_date")
	private Date created_date;
	@Column(name="last_modified_date")
	private Date last_modified_date;
	@Column(name="count")
	private int count;
	@Column(name="auth_id")
	private String auth_id;
	@Column(name="type")
	private String type;
}
