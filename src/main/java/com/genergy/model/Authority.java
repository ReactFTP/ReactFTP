package com.genergy.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table (name="authority", schema="public")
public class Authority implements Serializable {

	@Id
	@Column(name="auth_id")
	private String authId;
	@Column(name="auth_name")
	private String authName;
}