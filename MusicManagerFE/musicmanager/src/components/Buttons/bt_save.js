import React from "react";
import { language, localhost } from '../../res'
import axios from 'axios'

const buttonSave = (lang, setStateWhenPlay, currentSong, setCurrentSong, func, username, navigate) => (<button
    id='button_save'
    data-toggle="modal" data-target="#exampleModalCenter"
    onClick={() => {
        var updateName = document.getElementById('updateName').value;
        var updateGenre = document.getElementById('updateGenre').value
        if (updateName !== null || updateGenre !== null) {
            let currentTime = new Date()
            var time = currentTime.getFullYear()
                + "-" + (currentTime.getMonth() + 1)
                + "-" + currentTime.getDate()
                + " " + currentTime.getHours()
                + ":" + currentTime.getMinutes()
                + ":" + currentTime.getSeconds()
            var temp = {
                id: currentSong.id,
                name: document.getElementById('updateName').value
                    || currentSong.name, genre: document.getElementById('updateGenre').value
                        || currentSong.genre,
                updateTime: time
            }

            var formData = new FormData();
            formData.append("name", temp.name)
            formData.append("genre", temp.genre)
            formData.append("updateTime", time)
            formData.append("username", username)

            axios.put(localhost+'/update/' + currentSong.id, formData)
                .then((res) => {
                    console.log(res)
                    if (func === 'playSong') {
                        setCurrentSong(temp)
                        localStorage.setItem("currentSong", JSON.stringify(temp))
                        setStateWhenPlay(true)
                    }
                    else {
                        localStorage.setItem("currentSong", JSON.stringify(temp))
                        setCurrentSong(temp)
                        navigate('/home')
                    }
                    
                })

        }


    }}
    className="btn btn-outline-success"
    type="submit"
>
    {language[lang][16]}
</button>)
export default buttonSave