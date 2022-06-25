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
                + "-" + (currentTime.getMonth()+1)
                + "-" + currentTime.getDate()
                + " " + currentTime.getHours()
                + ":" + currentTime.getMinutes()
                + ":" + currentTime.getSeconds()
            var temp = {
                name: document.getElementById('updateName').value
                    || currentSong.name,
                genre: document.getElementById('updateGenre').value
                    || currentSong.genre,
                updateTime: time
            }

            axios.put(localhost + '/update/' + currentSong.id, temp)
                .then((res) => {
                    console.log(res)
                    if (func === 'playSong') {
                        setCurrentSong(temp)
                        setStateWhenPlay(true)
                    }
                    else {
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

