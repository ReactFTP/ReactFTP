package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="role", schema="public")
public class Role implements Serializable {

	@Id
	@Column(name="role_id")
	private String role_id;
	@Column(name="role_name")
	private String role_name;
}