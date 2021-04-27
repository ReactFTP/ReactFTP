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
	private String coId;
	@Column(name="co_name")
	private String coName;
	@Column(name="co_desc")
	private String coDesc;
	@Column(name="co_phone")
	private String coPhone;
	@Column(name="email")
	private String email;
	
	public String getCoName() {
		return coName;
	}
	public void setCoName(String coName) {
		this.coName = coName;
	}
	public String getCoDesc() {
		return coDesc;
	}
	public void setCoDesc(String coDesc) {
		this.coDesc = coDesc;
	}
	public String getCoPhone() {
		return coPhone;
	}
	public void setCoPhone(String coPhone) {
		this.coPhone = coPhone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCoId() {
		return coId;
	}
	
	
	
}