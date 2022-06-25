package com.exercise.musicmanager.dao;

import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.User;
import org.springframework.stereotype.Service;

import java.util.Optional;


public interface UserDAO {
    public Result signup(String username, String password);
    public Result login(String username, String password);

    public Result logout(String username, String token);
    public Optional findByToken(String token);
    User findById(int id);
    User findByUsername(String username);

}
