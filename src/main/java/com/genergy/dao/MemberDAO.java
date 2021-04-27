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
	     Query<?> query = session.createQuery("select memberId from Member where memberId=:id");
	     query.setParameter("id", id);
	     if (query.getResultList().size() == 1) {
	    	 session.getTransaction().commit();
	    	 return true;
	     }
	     session.getTransaction().commit();
	     return false;
	}

	public boolean phoneCheck(String phone) {
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query = session.createQuery("select memberPhone from Member where memberPhone=:phone");
	     query.setParameter("phone", phone);
	     if (query.getResultList().size() == 1) {
	    	 session.getTransaction().commit();
	    	 return true;
	     }
	     session.getTransaction().commit();
	     return false;
	}

	public boolean emailCheck(String email) {
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query = session.createQuery("select email from Member where email=:email");
	     query.setParameter("email", email);
	     if (query.getResultList().size() == 1) {
	    	 session.getTransaction().commit();
	    	 return true;
	     }
	     session.getTransaction().commit();
	     return false;
	}

	public void signUp(String id, String pw, String name, String email, String phone, String addr1, String addr2,
			String companyId, String manager) {
		 Member newMember = new Member(id, pw, name, email, phone, addr1, addr2, companyId, manager);
		 Session session = factory.getCurrentSession();
		 session.beginTransaction();
		 session.save(newMember);
		 session.getTransaction().commit();
	}
}
