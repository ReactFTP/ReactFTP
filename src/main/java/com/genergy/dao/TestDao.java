package com.genergy.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;

import com.genergy.ftp.resources.HibernateUtil;
import com.genergy.model.Test;

public class TestDao {
	
	   private static SessionFactory factory;
	   
	   public TestDao() {
	      factory = HibernateUtil.getSessionFactory();
	   }
	   
	   public static boolean login(String id, String pw) {
	        Session session = factory.getCurrentSession();
	        session.beginTransaction();
	        Query query = session.createQuery("select test_id from Test", String.class);
//	        query.getResultList();	        
	        return query.list().size() > 0;
	   }
	   
	   public static boolean insert(String id) {
	      //create table and insert
		  Test test = new Test(id);
	      Session session = factory.getCurrentSession();
	      try {
	      session.beginTransaction();
	      session.save(test);
	      session.getTransaction().commit();
	      } catch (Exception e) {
	         return false;
	      }
	      return true;
	   }
	   
//	   public static Member selectById(String id) {
//	      Session session = factory.getCurrentSession();
//	      session.beginTransaction();
//	      //static의 사용 
//	      Member selectedMember = session.get(Member.class, id); 
//	      session.getTransaction().commit();
//	      return selectedMember;
//	   }
//	   
//	   public static boolean updatePW(Member selectedMember, String beforePW, String afterPW) {
//	      Session session = factory.getCurrentSession();
//	      //beforePW확인 과정, 로그인 체크
//	      selectedMember.setPw(afterPW);
//	      try {
//	         session.beginTransaction();
//	         session.saveOrUpdate(selectedMember);
//	         session.getTransaction().commit();
//	      } catch (Exception e) {
//	         return false;
//	      }
//	      return true;
//	   }
//	   
//	   public static boolean delete(String id, String pw) {
//	      Session session = factory.getCurrentSession();
//	      //로그인 체크
//	      try {
//	         session.beginTransaction();
//	         Member selectedMember = session.get(Member.class, id);
//	         session.delete(selectedMember);
//	         session.getTransaction().commit();
//	      } catch (Exception e) {
//	         return false;
//	      }
//	      return true;
//	   }
	   
	
	
}
