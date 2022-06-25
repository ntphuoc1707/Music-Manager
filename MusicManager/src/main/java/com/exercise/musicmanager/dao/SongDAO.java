package com.exercise.musicmanager.dao;

import com.exercise.musicmanager.models.Result;
import com.exercise.musicmanager.models.Song;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SongDAO {
    public Result getAllSong(String username);
    public Song getSong(int id);
    public Result addSong(String name, String genre, MultipartFile file, String updateTime, String username);
    public Result deleteSong(String id);
    public Result updateSong(String id, Song song);
    public Result getFile(int id);
}
