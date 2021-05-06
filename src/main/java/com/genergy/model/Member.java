package com.genergy.model;

import java.io.Serializable;
import java.text.SimpleDateFormat;
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
	private String memberId;
	@Column(name="pw")
	private String pw;
	@Column(name="member_name")
	private String memberName;
	@Column(name="email")
	private String email;
	@Column(name="member_phone")
	private String memberPhone;
	@Column(name="addr1")
	private String addr1;
	@Column(name="addr2")
	private String addr2;
	@Column(name="co_id")
	private String coId;
	@Column(name="auth_id")
	private String authId;
	@Column(name="role_id")
	private String roleId;
	@Column(name="joined_date")
	private Date joinedDate;
	@Column(name="joined_check")
	private String joinedCheck; //boolean으로 ?
	@Column(name="active_check")
	private String activeCheck; //boolean으로 ?
	@Column(name="joined_check_date")
	private Date joinedCheckDate;
	@Column(name="failed_count")
	private int failedCount;
	
	
	public Member() {
		super();
	}


	//회원가입
	public Member(String id, String pw, String name, String email, String phone, String addr1, String addr2,
			String companyId, String manager) {
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		
		this.memberId = id;
		setPw(pw); setMemberName(name); setEmail(email); setMemberPhone(phone); setAddr1(addr1); setAddr2(addr2); 
		setCoId(companyId); setJoinedDate(new Date()); setJoinedCheck("N"); setActiveCheck("N"); setFailedCount(0);  
		if(manager.equals("true")) {
			setRoleId("m");  setAuthId("a");
		}else {
			setRoleId("u");  setAuthId("c");
		}
	}

//	//매니저의 사용자 추가
//	public Member(String id, String pw, String name, String email, String phone, String addr1, String addr2,
//			String companyId, String manager, String string, String string2) {
//		SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
//		
//		this.memberId = id;
//		setPw(pw); setMemberName(name); setEmail(email); setMemberPhone(phone); setAddr1(addr1); setAddr2(addr2); 
//		setCoId(companyId); setJoinedDate(new Date());  setFailedCount(0);  
//		if(manager.equals("true")) {
//			setRoleId("m");  setAuthId("a"); setJoinedCheck("N"); setActiveCheck("N"); 
//		}else {
//			setRoleId("u");  setAuthId("c"); setJoinedCheck(string); setActiveCheck(string2); setJoinedCheckDate(new Date());
//		}
//	}
	
	//어드민의 사용자 추가
	public Member(String id, String pw, String name, String email, String phone, String addr1, String addr2,
			String companyId, String manager, String type) {
		SimpleDateFormat format = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
		
		this.memberId = id;
		setPw(pw); setMemberName(name); setEmail(email); setMemberPhone(phone); setAddr1(addr1); setAddr2(addr2); 
		setCoId(companyId); setJoinedDate(new Date());  setFailedCount(0); 
		if(manager.equals("true") && type.equals("manager")) {
			setRoleId("m");  setAuthId("a");  setJoinedCheck("N"); setActiveCheck("N"); setJoinedCheckDate(new Date()); 
		}else if(manager.equals("false") && type.equals("manager")) {
			setRoleId("u");  setAuthId("c"); setJoinedCheck("Y"); setActiveCheck("Y"); setJoinedCheckDate(new Date());  
		}else if(manager.equals("true") && type.equals("admin")) {
			setRoleId("m");  setAuthId("a"); setJoinedCheck("Y"); setActiveCheck("Y"); setJoinedCheckDate(new Date());  
		}else if(manager.equals("false") && type.equals("admin")) {
			setRoleId("u");  setAuthId("c"); setJoinedCheck("Y"); setActiveCheck("Y"); setJoinedCheckDate(new Date());  
		}
	}

	public String getRoleId() {
		return roleId;
	}


	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}


	public String getMemberName() {
		return memberName;
	}

	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMemberPhone() {
		return memberPhone;
	}

	public void setMemberPhone(String memberPhone) {
		this.memberPhone = memberPhone;
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

	public String getCoId() {
		return coId;
	}

	public void setCoId(String coId) {
		this.coId = coId;
	}

	public String getAuthId() {
		return authId;
	}

	public void setAuthId(String authId) {
		this.authId = authId;
	}

	public Date getJoinedDate() {
		return joinedDate;
	}

	public void setJoinedDate(Date joinedDate) {
		this.joinedDate = joinedDate;
	}

	public String getJoinedCheck() {
		return joinedCheck;
	}

	public void setJoinedCheck(String joinedCheck) {
		this.joinedCheck = joinedCheck;
	}

	public String getActiveCheck() {
		return activeCheck;
	}

	public void setActiveCheck(String activeCheck) {
		this.activeCheck = activeCheck;
	}

	public Date getJoinedCheckDate() {
		return joinedCheckDate;
	}

	public void setJoinedCheckDate(Date joinedCheckDate) {
		this.joinedCheckDate = joinedCheckDate;
	}

	public int getFailedCount() {
		return failedCount;
	}

	public void setFailedCount(int failedCount) {
		this.failedCount = failedCount;
	}

	public String getMemberId() {
		return memberId;
	}

	public void setPw(String pw) {
		this.pw = pw;
	}

	
	

}
