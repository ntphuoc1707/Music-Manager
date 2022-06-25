package com.exercise.musicmanager.dao;
import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.User;
import com.exercise.musicmanager.utils.HibernateUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.io.File;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service("UserService")
public class UserDAOImpl implements UserDAO {
    SessionFactory sessionFactory= HibernateUtil.getInstance().getSessionFactory();

    @Override
    public Result signup(String username, String password) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        try{
            tx=session.beginTransaction();
            User user=findByUsername(username);
            if(user==null){
                User newUser=new User();
                String filename=System.getProperty("user.dir")+"\\src\\main\\resources\\Repository Music\\"+username+"\\";
                System.out.println(filename);
                File f=new File(filename);
                if(!f.exists()) f.mkdirs();
                newUser.setUsername(username);
                newUser.setPassword(password);
                newUser.setSource(filename);
                session.save(newUser);
            }
            else return new Result(false,null,"Account already exist");
            tx.commit();
        }catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false,null,e.getMessage());
        }finally {
            session.close();
        }
        return new Result(true, null, "Sign up successfully");
    }

    // Đoạn JWT_SECRET này là bí mật, chỉ có phía server biết
    private final String JWT_SECRET = "lodaaaaaa";

    //Thời gian có hiệu lực của chuỗi jwt
    private final long JWT_EXPIRATION = 604800000L;

    // Tạo ra jwt từ thông tin user
    public String generateToken(User user) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + JWT_EXPIRATION);
        // Tạo chuỗi json web token từ id của user.
        return Jwts.builder()
                .setSubject(Long.toString(user.getId()))
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
    }

    public Long getUserIdFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();

        return Long.parseLong(claims.getSubject());
    }
    @Override
    public Result login(String username, String password) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        String token=null;
        try{
            tx=session.beginTransaction();
            List<User> user=session.createQuery("FROM User where username='"+username+"' and password='"+password+"'").list();
            if(!user.isEmpty()){
                token= generateToken(user.get(0));
                user.get(0).setToken(token);
                session.update(user.get(0));
            }
            tx.commit();
        }
        catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false,null,e.getMessage());
        }
        finally {
            session.close();
            if(token==null) return new Result(false,StringUtils.EMPTY,"Account doesn't exist");
           return new Result(true,token,"Login successfully");
        }
    }

    @Override
    public Result logout(String username, String token) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        try{
            tx=session.beginTransaction();
            System.out.println(getUserIdFromJWT(token));
            session.createQuery("update User set token='' where username='"+username+"'");
            tx.commit();
        }
        catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return new Result(false, null, e.getMessage());
        }
        finally {
            session.close();
            return new Result(true, null, "Logout successfully");
        }
    }

    @Override
    public Optional findByToken(String token) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;

        org.springframework.security.core.userdetails.User user=null;
        try{
            tx=session.beginTransaction();

            List<User> users=session.createQuery("FROM User where token='"+token+"'").list();
            if(!users.isEmpty()){
                user=new org.springframework.security.core.userdetails.User(
                        users.get(0).getUsername(), users.get(0).getPassword(), true,true,true, true,
                        AuthorityUtils.createAuthorityList("USER"));
            }
            tx.commit();
        }
        catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }
        finally {
            session.close();
            if(user==null) return Optional.empty();
            return Optional.of(user);
        }

    }

    @Override
    public User findById(int id) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        User user=null;
        try{
            tx=session.beginTransaction();
            user=session.get(User.class,id);

            tx.commit();
        }
        catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
            return null;
        }
        finally {
            session.close();
            return user;
        }
    }

    @Override
    public User findByUsername(String username) {
        Session session=sessionFactory.openSession();
        Transaction tx=null;
        List<User> user=null;
        try{
            tx=session.beginTransaction();
            user=session.createQuery("FROM User where username='"+username+"'").list();
            tx.commit();
        }catch (Exception e){
            if(tx!=null) tx.rollback();
            e.printStackTrace();
        }finally {
            session.close();
            if(user.isEmpty()) return null;
            else return user.get(0);
        }
    }
}
