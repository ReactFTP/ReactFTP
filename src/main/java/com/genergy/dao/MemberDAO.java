package com.genergy.dao;

import java.util.ArrayList;
import java.util.List;

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

	public String getId(String name, String email, String phone) {
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Query<?> query;
	     if (email.equals("")) {
	    	 query = session.createQuery("select memberId from Member where memberPhone=:phone");
	    	 query.setParameter("phone", phone);
	     }else {
	    	 query = session.createQuery("select memberId from Member where email=:email");
	    	 query.setParameter("email", email);
	     }
	     if (query.getResultList().size() == 0) {
	    	 session.getTransaction().commit();
	    	return null;
	     }
	     String result = (String) query.getResultList().get(0);
	     session.getTransaction().commit();
	     return result;
	     
	}

	public String getNewPW(String id, String name, String email, String phone) {
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	     Member selectedMember = session.get(Member.class, id); //id??? ????????????.
	     if (selectedMember==null) {
	    	 session.getTransaction().commit();
	    	 return null;
	     }else if (!selectedMember.getMemberName().equals(name)) {
	    	 session.getTransaction().commit();
	    	 return null;
	     }
	     String tmpPW = "";
	     if(email.equals(selectedMember.getEmail()) || phone.equals(selectedMember.getMemberPhone())){
	    	 //?????? ??????
	    	 int size = 8;
	    	 if(size > 0) {
	 			char[] tmp = new char[size];
	 			for(int i=0; i<tmp.length; i++) {
	 				int div = (int) Math.floor( Math.random() * 2 );
	 				
	 				if(div == 0) { // 0?????? ?????????
	 					tmp[i] = (char) (Math.random() * 10 + '0') ;
	 				}else { //1?????? ?????????
	 					tmp[i] = (char) (Math.random() * 26 + 'A') ;
	 				}
	 			}
	 			 tmpPW = new String(tmp);
	 		}//?????? ??????
	    	selectedMember.setPw(tmpPW);
	    	session.saveOrUpdate(selectedMember);
	     }else {
	    	 session.getTransaction().commit();
	    	 return null;
	     }
	     session.getTransaction().commit();
	     return tmpPW;
	}

	public String login(String id, String pw) {
		
        	 Session session1 = factory.getCurrentSession();
        	 session1.beginTransaction();
        	Query<?> query1 = session1.createQuery("select memberId, roleId, activeCheck, failedCount from Member where memberId=:id");
        	query1.setParameter("id", id);
        	//???????????? ?????? ?????? 
        	if(query1.list().size() == 0) { 
       		 session1.getTransaction().commit();
       		return "???????????? ?????? ???????????????.";
        	}
        	//???????????? ??? ?????? 
        	Object[] array= (Object[]) query1.list().get(0); //[user1, u, N, 0]
        	String activation = array[2].toString();
        	if(activation.equals("N")) { 
        		session1.getTransaction().commit();
          		return "???????????? ??? ???????????????.";
        	}
        	//????????? ??????
	    	    Query<?> query = session1.createQuery("select memberId from Member where memberId=:id and pw=:pw");
	    	    query.setParameter("id", id);
	            query.setParameter("pw", pw);
	            boolean b = query.list().size() > 0;
	            //????????? ??????
	            if(!b) {
		        	//??????????????? ?????? user?????? ??????
		        	String auth = array[1].toString();
		        	if(auth.equals("u")) { 
		        		Member m = session1.get(Member.class, id);
		        		m.setFailedCount(m.getFailedCount() + 1);
		        		if (m.getFailedCount() >= 5) {//?????? ?????? ??? ????????????
		               		m.setActiveCheck("N");
		               		session1.saveOrUpdate(m);
		               		session1.getTransaction().commit();
		               		return "5????????? ????????? ????????? ???????????? ???????????????."; 
		               	}
		        		session1.saveOrUpdate(m);
		        		session1.getTransaction().commit();
		        		return "????????? " + m.getFailedCount() + "??? ??????! (5??? ?????? ????????? ????????? ???????????? ?????????.)"; 
		        	}else {
		        		  session1.getTransaction().commit();
		        		return "??????????????? ??????????????????.";
		        	}
        }else { //????????? ??????
        	session1.getTransaction().commit();
        }
        return null;
	}

	public String[] getUser(String id) {

		Session session = factory.getCurrentSession();
	    session.beginTransaction();
	    Member m = session.get(Member.class, id);
	    String[] userInfo = new String[15];
	    userInfo[0] = m.getMemberId();
	    userInfo[1] = m.getMemberName();
	    
	   String email = m.getEmail();
	   if(!m.getRoleId().equals("a")) {
	   String[] emails = email.split("@");
	   userInfo[2] = emails[0];
	   userInfo[3] = emails[1];
	   }else {
		   userInfo[2] = "-";
		   userInfo[3] = "-";
	   }
	   
	   if(!m.getRoleId().equals("a")) {
		   String phone = m.getMemberPhone();
		   String[] phones = phone.split("-");
		   userInfo[4] = phones[0];
		   userInfo[5] = phones[1];
		   userInfo[6] = phones[2];
		   }else {
			   userInfo[4] = "-";
			   userInfo[5] = "-";
			   userInfo[6] = "-";
		   }
	  
	   
	   userInfo[7] = m.getAddr1();
	   userInfo[8] = m.getAddr2();
	   //=========================================
	   userInfo[10] = m.getRoleId();
	   userInfo[11] = m.getAuthId();
	   userInfo[12] = m.getCoId();
	   userInfo[13] = m.getActiveCheck();
	   userInfo[14] = m.getJoinedCheck();
	   String companyId = m.getCoId();
	   session.getTransaction().commit();
	   Session session1 = factory.getCurrentSession();
	    session1.beginTransaction();
	   Query<?> query = session1.createQuery("select coName from Company where coId=:id");
	   query.setParameter("id", companyId);
	   String coName = query.getResultList().get(0).toString();
	   userInfo[9] = coName;
	   session1.getTransaction().commit(); 
		return userInfo;
	}

	public void editUser(String id, String pw, String email, String phone, String addr1, String addr2) {
		Session session = factory.getCurrentSession();
	    session.beginTransaction();
	    Member m = session.get(Member.class, id);
	    if (!pw.equals("")) {
	    	m.setPw(pw);
	    }
	    m.setEmail(email); m.setMemberPhone(phone); m.setAddr1(addr1); m.setAddr2(addr2); 
		session.saveOrUpdate(m);
		session.getTransaction().commit();
	}

	public Object[] getUserInCompany(String coId) {
		Session session = factory.getCurrentSession();
	    session.beginTransaction();	    
	    Query<?> query;
	    if(coId.equals("-")) {
	    	query = session.createQuery("from Member");
	    }else {
		    query = session.createQuery("from Member where coId=:coId");
		    query.setParameter("coId", coId);
		}
	    List result = query.getResultList();
	    Member[] members = new Member[result.size()];
	    List<Object[]> r = new ArrayList();
	    session.getTransaction().commit();
	    CompanyDAO co = new CompanyDAO();
	    result.toArray(members);
	    for (Member member : members) {
			String CompanyId = member.getCoId();
			String CompanyName = co.getCompanyName(CompanyId);
			Object[] o1 = new Object[15];
			
			o1[0] = member.getActiveCheck();
			o1[1] = member.getAddr1();
			o1[2] = member.getAddr2();
			o1[3] = member.getAuthId();
			o1[4] = member.getCoId();
			o1[5] = member.getEmail();
			o1[6] = member.getFailedCount();
			o1[7] = member.getJoinedCheck();
			o1[8] = member.getJoinedCheckDate();
			o1[9] = member.getJoinedDate();
			o1[10] = member.getMemberId();
			o1[11] = member.getMemberName();
			o1[12] = member.getMemberPhone();
			o1[13] = member.getRoleId();	
			o1[14] = CompanyName;
			r.add(o1);
		}
	    return r.toArray();
	}

	public void editUserSet(String id, String auth, String active, String join) {
		Session session = factory.getCurrentSession();
	    session.beginTransaction();
	    Member m = session.get(Member.class, id);
	    m.setAuthId(auth);
	    if(!active.equals(m.getActiveCheck())) {
	    	m.setFailedCount(0);
	    }
	    m.setActiveCheck(active);
	    m.setJoinedCheck(join);
	    session.saveOrUpdate(m);
	    session.getTransaction().commit();
	}

	public void directSignUp(String id, String pw, String name, String email, String phone, String addr1, String addr2,
			String companyId, String manager, String type) {
		 Member newMember = new Member(id, pw, name, email, phone, addr1, addr2, companyId, manager, type);
		 Session session = factory.getCurrentSession();
		 session.beginTransaction();
		 session.save(newMember);
		 session.getTransaction().commit();
		System.out.println("debug");
		
	}

	public void deleteUser(String id) {
		Session session = factory.getCurrentSession();
	    session.beginTransaction();
	    Member m = session.get(Member.class, id);
	    session.delete(m);
	    session.getTransaction().commit();
	}
}
