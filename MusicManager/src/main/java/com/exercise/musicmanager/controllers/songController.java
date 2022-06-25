package com.exercise.musicmanager.controllers;

import com.exercise.musicmanager.dao.SongDAO;
import com.exercise.musicmanager.dao.SongDAOImpl;
import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.Song;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.*;
import com.google.gson.Gson;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class songController {
    SongDAO songDAO=new SongDAOImpl();

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/musicmanager",method = RequestMethod.POST)
    public ResponseEntity<Result> getAllSongs(@RequestParam("username") String username){
        Result result=songDAO.getAllSong(username);
//        return new Gson().toJson(new Result("Success",l,"Get list music"));
        return ResponseEntity.status(result.getStatus()? HttpStatus.OK :HttpStatus.NOT_FOUND)
                .body(result);
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/get_song/{id}", method = RequestMethod.GET)
    public ResponseEntity<Result> sendFile(@PathVariable("id") String id) {
        Result result=songDAO.getFile(Integer.parseInt(id));

        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
       // return new Gson().toJson(fileContent);
//        return ResponseEntity.status(HttpStatus.OK).body(
//                new Result("OK", new Gson().toJson(fileContent), "Get song successfully")
//        );
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public ResponseEntity<Result> addSong(@RequestParam("file") MultipartFile file
                        , @RequestParam("name") String name
                        , @RequestParam("genre") String genre
                        , @RequestParam("updateTime")String updateTime
                        , @RequestParam("username")String username) {
        Result result=songDAO.addSong(name,genre,file,updateTime,username);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);

//        if(songDAO.addSong(name, genre, file, updateTime, username)){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("ok",true,"Add song successfully")
//            );
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("no",false,"Failed to add song")
//            );
//        }
    }

    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/delete/{ids}", method = RequestMethod.DELETE)
    public ResponseEntity<Result> delete(@PathVariable("ids") String ids){
        Result result=songDAO.deleteSong(ids);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
//        if(songDAO.deleteSong(ids)){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("ok",true,"Delete song successfully")
//            );
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("no",false,"Failed to delete song")
//            );
//        }
    }
//    @RequestParam("name") String name,
//    @RequestParam("genre") String genre,
//    @RequestParam("updateTime") String updateTime,
//    @RequestParam("username") String username
    @CrossOrigin
    @ResponseBody
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Result> update(@PathVariable("id") String id, @RequestBody Song song){
        Result result=songDAO.updateSong(id, song);
        return ResponseEntity.status(HttpStatus.OK)
                .body(result);
//        if(songDAO.updateSong(id,song)){
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("ok",true,"Update song successfully")
//            );
//        }
//        else{
//            return ResponseEntity.status(HttpStatus.OK).body(
//                    new Result("no",false,"Failed to update song")
//            );
//        }

    }
}

