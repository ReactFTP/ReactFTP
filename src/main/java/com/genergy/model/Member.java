package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="member", schema="public")
public class Member implements Serializable {
	//변수명 Camel로 바꾸고 컬럼 어노테이션 추가할지?
	@Id
	private String member_id;
	private String pw;
	private String member_name;
	private String email;
	private String member_phone;
	private String addr1;
	private String addr2;
	private String co_id;
	private String auth_id;
	private String role_id;
	private Date joined_date;
	private String joined_check; //boolean으로 ?
	private String active_check; //boolean으로 ?
	private Date joined_check_date;
	private int failed_count;
	
	public String getMember_name() {
		return member_name;
	}
	public void setMember_name(String member_name) {
		this.member_name = member_name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMember_phone() {
		return member_phone;
	}
	public void setMember_phone(String member_phone) {
		this.member_phone = member_phone;
	}
	public String getAddr1() {
		return addr1;
	}
	public void setAddr1(String addr1) {
		this.addr1 = addr1;
	}
	public String getAddr2() {
		return addr2;
	}
	public void setAddr2(String addr2) {
		this.addr2 = addr2;
	}
	public String getCo_id() {
		return co_id;
	}
	public void setCo_id(String co_id) {
		this.co_id = co_id;
	}
	public String getAuth_id() {
		return auth_id;
	}
	public void setAuth_id(String auth_id) {
		this.auth_id = auth_id;
	}
	public String getRole_id() {
		return role_id;
	}
	public void setRole_id(String role_id) {
		this.role_id = role_id;
	}
	public Date getJoined_date() {
		return joined_date;
	}
	public void setJoined_date(Date joined_date) {
		this.joined_date = joined_date;
	}
	public String getJoined_check() {
		return joined_check;
	}
	public void setJoined_check(String joined_check) {
		this.joined_check = joined_check;
	}
	public String getActive_check() {
		return active_check;
	}
	public void setActive_check(String active_check) {
		this.active_check = active_check;
	}
	public Date getJoined_check_date() {
		return joined_check_date;
	}
	public void setJoined_check_date(Date joined_check_date) {
		this.joined_check_date = joined_check_date;
	}
	public int getFailed_count() {
		return failed_count;
	}
	public void setFailed_count(int failed_count) {
		this.failed_count = failed_count;
	}
	public String getMember_id() {
		return member_id;
	}
	public void setPw(String pw) {
		this.pw = pw;
	}
	
	@Override
	public String toString() {
		return "Member [member_id=" + member_id + ", member_name=" + member_name + ", email=" + email
				+ ", member_phone=" + member_phone + ", addr1=" + addr1 + ", addr2=" + addr2 + ", co_id=" + co_id
				+ ", auth_id=" + auth_id + ", role_id=" + role_id + ", joined_date=" + joined_date + ", joined_check="
				+ joined_check + ", active_check=" + active_check + ", joined_check_date=" + joined_check_date
				+ ", failed_count=" + failed_count + "]";
	}
	
	
	
	

}
