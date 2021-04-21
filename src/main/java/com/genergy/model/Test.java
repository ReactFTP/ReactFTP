package com.genergy.model;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="test", schema="public")
//@Table (name="test")
public class Test implements Serializable {
	
	@Id
	private String test_id;
	
	public Test() {
		
	}
	
	public Test(String test_id) {
		this.test_id = test_id;
	}
	
	public void setTest_Id(String test_id) {
		this.test_id = test_id;
	}
	
	public String getTest_id() {
		return test_id;
	}
	
	@Override
	public String toString() {
		return "Test [id=" + test_id + "]";
	}
	
}
