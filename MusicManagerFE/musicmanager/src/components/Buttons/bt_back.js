import React from "react"
import { language } from '../../res'
const buttonBack = (lang, navigate) => (
    <button
        id='button_back'
        data-toggle="modal" data-target="#exampleModalCenter"
        onClick={() => {
            localStorage.removeItem("currentSong")
            navigate(-1)
        }}
        className="btn btn-outline-success"
        type="submit"
    >
        {language[lang][12]}
    </button>
)
export default buttonBack