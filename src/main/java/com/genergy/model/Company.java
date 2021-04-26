package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="company", schema="public")
public class Company implements Serializable {

	@Id
	@Column(name="co_id")
	private String co_id;
	@Column(name="co_name")
	private String co_name;
	@Column(name="co_desc")
	private String co_desc;
	@Column(name="co_phone")
	private String co_phone;
	@Column(name="email")
	private String email;
}