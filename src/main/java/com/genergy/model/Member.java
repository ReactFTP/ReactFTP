package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="member", schema="public")
public class Member implements Serializable {
	//변수명 Camel로 바꾸고 컬럼 어노테이션 추가할지?

	@Id
	@Column(name="member_id")
	private String member_id;
	@Column(name="pw")
	private String pw;
	@Column(name="member_name")
	private String member_name;
	@Column(name="email")
	private String email;
	@Column(name="member_phone")
	private String member_phone;
	@Column(name="addr1")
	private String addr1;
	@Column(name="addr2")
	private String addr2;
	@Column(name="co_id")
	private String co_id;
	@Column(name="auth_id")
	private String auth_id;
	@Column(name="role_id")
	private String role_id;
	@Column(name="joined_date")
	private Date joined_date;
	@Column(name="joined_check")
	private String joined_check; //boolean으로 ?
	@Column(name="active_check")
	private String active_check; //boolean으로 ?
	@Column(name="joined_check_date")
	private Date joined_check_date;
	@Column(name="failed_count")
	private int failed_count;
	
	

}
