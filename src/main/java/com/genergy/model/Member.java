package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table (name="member", schema="public")
public class Member implements Serializable {
	//변수명 Camel로 바꾸고 컬럼 어노테이션 추가할지?
	
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
	
	

}
