import axios from 'axios'

import { language, localhost } from '../../res'
import { create_announce, display_announce } from '../Announce'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';



const buttonAdd = ((e, lang, fileMusic, username, navigate) => (<button
    id='button_add_song'
    data-toggle="modal" data-target="#exampleModalCenter"
    onClick={() => {
        if (e === 'add') {
            navigate('/addSong')
        }
        else
            if (create_announce('add', fileMusic)) {
                let currentTime = new Date()
                var time = currentTime.getFullYear()
                    + "-" + (currentTime.getMonth()+1)
                    + "-" + (currentTime.getDate())
                    + " " + currentTime.getHours()
                    + ":" + currentTime.getMinutes()
                    + ":" + currentTime.getSeconds()
                var formData = new FormData();

                formData.append("name", document.querySelector("#nameSong").value)
                formData.append("genre", document.querySelector("#genreSong").value)
                formData.append("file", fileMusic);
                formData.append("updateTime", time)
                formData.append("username", username)
               
                console.log(formData)
                axios.post(localhost + '/add', formData)
                    .then(res => {
                        console.log(res)
                        if (res.data.status)
                            display_announce('primary', 'Add')
                        else
                            display_announce('warning', 'Add')
                        navigate('/home')
                    });

            }



    }}
    className="btn btn-outline-success"
    type="submit"
>
    {language[lang][2]}
</button>))
export default buttonAdd