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
import com.genergy.model.File;
import com.genergy.model.Folder;
import com.genergy.model.Member;

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

	public String deleteCompany(String coId) {
		boolean b= false;
		Session session = factory.getCurrentSession();
	     session.beginTransaction();
	 
	     Query<?> query = session.createQuery("select folderId from Folder where coId=:coId");
	     query.setParameter("coId", coId);	    		 
	    String[] folderList = new String[query.list().size()];
		 
	    query.list().toArray(folderList); 
	    for (String folderId : folderList) {
	    	b =  FolderDAO.deleteFolderInFTP(folderId, session);
	    	if(!b) {
	    		return folderId + "????????? ??????x";
	    	}else {
		    	 Query<?> query1 = session.createQuery("select fileId from File where folderId=:folderId");
		    	 query1.setParameter("folderId", folderId);	   
		    	 String[] fileList = new String[query1.list().size()]; 
		    	 query1.list().toArray(fileList);
		    	 for (String fileId : fileList) {
		    		 session.getTransaction().commit();
		    		 File file = session.get(File.class, fileId);
		    		 session.delete(file); //?????? DB????????????
		    		 System.out.println("???????????? ??????");
				}
			    	
	    	}
	    	System.out.println(folderId+"??????");
	    	Folder folder = session.get(Folder.class,folderId );
     		 session.delete(folder); //?????? DB????????????
     		 
		}//for folderId
	   	 Query<?> query2 = session.createQuery("select memberId from Member where coId=:coId");
	   	 query2.setParameter("coId", coId);
	   	 String[] memberList = new String[query2.list().size()]; 
	   	 query2.list().toArray(memberList);
	   	 for (String memberId : memberList) {
	   		 Member member = session.get(Member.class, memberId);
	   		 session.delete(member); //?????? DB????????????
	   		 System.out.println("??????????????????");
		 }
	   	 Company com = session.get(Company.class, coId);
	   	 session.delete(com);
	   	System.out.println("?????? ????????????");
   		 session.getTransaction().commit();
		
	     //1.?????? ????????? File?????? folderID????????? ?????????~ 
	     //
	     //3.Folder?????????~ 
	     //4.member?????? coID????????? ?????????~ 
	     //5.co????????? 
	    
		return "?????? ????????????";
	}

	public void addCompany(String name, String email, String phone, String desc) {
		Session session = factory.getCurrentSession();
		session.beginTransaction();
	     Company co = new Company();
	     co.addCompany(name, email, phone, desc);
	     session.save(co);
	     
	     FolderDAO folder = new FolderDAO();
	     session.getTransaction().commit();
	     folder.createNewFolder("0", name, co.getCoId());
	}

}
