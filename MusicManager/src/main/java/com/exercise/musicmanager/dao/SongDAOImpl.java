package com.exercise.musicmanager.dao;

import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.Song;
import com.exercise.musicmanager.utils.HibernateUtil;
import com.google.gson.Gson;
import org.apache.commons.io.FileUtils;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class SongDAOImpl  implements SongDAO{

    SessionFactory sessionFactory=HibernateUtil.getInstance().getSessionFactory();
    UserDAO userDAO=new UserDAOImpl();
    @Override
    public Result getAllSong(String username) {
        Session session= sessionFactory.openSession();
        Transaction tx=null;
        List<Song> l=null;
        try{
            System.out.println(username);
            tx=session.beginTransaction();
            String hql="FROM Song where source like '%\\"+"\\"+"\\"+username+"\\"+"\\"+"\\%'";
            l=session.createQuery(hql).list();
            for(Song x:l) System.out.println(x.toString());
            tx.commit();
        }catch (HibernateException e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        return new Result(true,l,"Get all song successfully");
    }

    @Override
    public Song getSong(int id) {
        return null;
    }

    @Override
    public Result addSong(String name, String genre, MultipartFile file, String updateTime, String username) {
        String filename=userDAO.findByUsername(username).getSource()+name+".mp3";
        File f=new File(filename);
        if(!f.exists())
            f.mkdirs();
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        try {
            tx=session.beginTransaction();
            file.transferTo(f);
            Song newSong= new Song();
            newSong.setName(name);
            newSong.setGenre(genre);
            newSong.setSource(filename);
            newSong.setUpdateTime(updateTime);
            session.save(newSong);
            tx.commit();
        } catch (Exception e) {
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false,null,e.getMessage());
        }
        finally {
            session.close();
            return new Result(true, null, "Add song successfully");
        }
    }

    @Override
    public Result deleteSong(String ids) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        try{
            tx=session.beginTransaction();
            String[] strings=ids.split(",");
            for (String x: strings) {
                Song song=session.load(Song.class, Integer.valueOf(x));
                File file=new File(song.getSource());
                session.delete(song);
                file.delete();
            }
            tx.commit();
        }catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false,null,e.getMessage());
        }
        finally {
            session.close();
        }
        return new Result(true,null,"Delete song successfully");
    }

    @Override
    public Result updateSong(String id, Song newSong) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;

        try{
            tx=session.beginTransaction();

            Song updateSong=session.get(Song.class, Integer.valueOf(id));
            File oldSource =new File(updateSong.getSource());
            String temp=updateSong.getSource();
            while(temp.charAt(temp.length()-1)!='\\'){  //Substring
                temp=temp.substring(0,temp.length()-1);
            }
            String newFileName=temp+newSong.getName()+".mp3";
            File newSource =new File(newFileName);
            oldSource.renameTo(newSource);
            updateSong.setGenre(newSong.getGenre());
            updateSong.setName(newSong.getName());
            updateSong.setUpdateTime(newSong.getUpdateTime());
            updateSong.setSource(newFileName);

            session.update(updateSong);
            tx.commit();
        }catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false,null, e.getMessage());
        }
        finally {
            session.close();
            return new Result(true, null,"Update song successfully");
        }
    }

    @Override
    public Result getFile(int id) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        List<Song> l=new ArrayList<>();
        try{
            tx=session.beginTransaction();
            l= (List<Song>) session.createQuery("From Song where id="+Integer.valueOf(id)).list();
            tx.commit();
        }catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }
        finally {
            session.close();
        }
        byte[] fileContent = null;
        try {
            fileContent = FileUtils.readFileToByteArray(new File(l.get(0).getSource()));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Result(true, new Gson().toJson(fileContent),"Get file successfully");
    }
}
