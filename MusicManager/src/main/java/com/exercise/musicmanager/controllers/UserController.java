package com.exercise.musicmanager.controllers;

import com.exercise.musicmanager.dao.UserDAO;
import com.exercise.musicmanager.dao.UserDAOImpl;
import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.User;
import com.exercise.musicmanager.utils.JwtTokenProvider;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserDAO userDAO=new UserDAOImpl();


    @RequestMapping(value = "/api/users/user/{id}",produces = "application/json", method = RequestMethod.GET)
    public User getUserDetail(@PathVariable int id){
        return userDAO.findById(id);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<Result> login(@RequestParam("username") String username, @RequestParam("password") String password){
        Result result=userDAO.login(username, password);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
        //        String token= userDAO.login(username,password);
//        if(StringUtils.isEmpty(token)){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("no", token,"Not found account")
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new Result("ok", token,"Login successfully")
//        );
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public ResponseEntity<Result> signUp(@RequestParam("username") String username, @RequestParam("password") String password){
        Result result=userDAO.signup(username,password);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);

        //        if(userDAO.findByUsername(username)==null){
//            if(userDAO.signup(username, password))
//                return ResponseEntity.status(HttpStatus.OK).body(
//                        new Result("ok", true, "sign up successfully")
//                );
//            else return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("no", false, "Failed to sign up")
//            );
//        }
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new Result("no", false, "Account already exist")
//        );
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/validateToken", method = RequestMethod.POST)
    public ResponseEntity<Result> findUserByToken(@RequestParam("token") String token){
        Optional result=userDAO.findByToken(token);
        return ResponseEntity.status(HttpStatus.OK).body(
                new Result(!result.isEmpty()?true:false,result.get(),"Validate token")
        );
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/logout", method = RequestMethod.POST)
    public ResponseEntity<Result> logout(@RequestParam("username") String username, @RequestParam("token") String token){

        Result result=userDAO.logout(username,token);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
        //        if(userDAO.logout(username, token))
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("ok", true,"Logout successfully")
//            );
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new Result("no", false,"Failed to logout")
//        );
    }

}
