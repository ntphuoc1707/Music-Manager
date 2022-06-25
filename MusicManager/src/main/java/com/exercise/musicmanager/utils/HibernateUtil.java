package com.exercise.musicmanager.utils;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static HibernateUtil instance;
    private Configuration configuration=new Configuration();
    private SessionFactory sessionFactory= configuration.configure("hibernate.cfg.xml").buildSessionFactory();
    private HibernateUtil(){}
    public static HibernateUtil getInstance() {
        if(instance==null)
            instance=new HibernateUtil();
        return instance;
    }
    public SessionFactory getSessionFactory(){
        return sessionFactory;
    }

}
