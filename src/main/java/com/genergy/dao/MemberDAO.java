package com.genergy.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.Member;

public class MemberDAO {
	private static SessionFactory factory;
	
	public MemberDAO() {
		factory = HibernateUtil.getSessionFactory();
	}
	
	public boolean idCheck(String id) {
		 Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query = session.createQuery("select member_id from Member where member_id=:id");
	     query.setParameter("id", id);
	     if (query.getResultList().size() == 1) {
	    	 session.getTransaction().commit();
	    	 return true;
	     }
	     session.getTransaction().commit();
	     return false;
	}
}
