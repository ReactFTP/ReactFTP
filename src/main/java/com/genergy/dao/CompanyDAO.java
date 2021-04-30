package com.genergy.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.Company;

public class CompanyDAO {
	private static SessionFactory factory;
	
	public CompanyDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	public Map<String, Company> getAllLists() {
		 Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query = session.createQuery("from Company");
	     List<?> coLists = query.getResultList();
	     Map<String, Company> map = new HashMap<>();
	     for (Object object : coLists) {
	    	 if(object == null) {continue;}
	    	 Company co = (Company) object;
	    	 map.put(co.getCoId(), co);
		}
	     session.getTransaction().commit();
	     
	     return map;
	}

	public String getCompanyName(String coId) {
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query = session.createQuery("select coName from Company where coId=:coId");
	     query.setParameter("coId", coId);
	     String name = null;
	     
	     if(query.list().size() == 1) {
	    	 name = (String) query.list().get(0);
	    	 session.getTransaction().commit();
	    	 return name;
	     }
	     session.getTransaction().commit();
	     return name;
		
	}

}
