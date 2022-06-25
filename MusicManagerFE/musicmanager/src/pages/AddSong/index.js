import { language } from "../../res";
import React from "react";
import { buttonAdd, buttonBack } from "../../components/Buttons";
import {useNavigate} from 'react-router-dom'
import { Context } from "../../App";

function AddSong() {
    const navigate=useNavigate();
    const [fileMusic, setFileMusic] =React.useState(null)
    const context=React.useContext(Context)
    const lang=context.lang
    const username=context.username
    return (
        <>
            <div style={{ border: 3, borderStyle: "solid", marginTop: "15px", padding: 0 }}>
                <div className="container" >
                    <div className="row">
                        <h1 style={{ margin: "5px" }}>{language[lang][10]}</h1>
                        <form className="was-validated">
                            <div className="form-group">
                                <label htmlFor="validationTextarea">{language[lang][5]}</label>
                                <textarea className="form-control is-invalid" id="nameSong" placeholder={language[lang][13]} ></textarea>
                            </div>
                            <div className="form-group">
                                <label htmlFor="validationTextarea">{language[lang][6]}</label>
                                <textarea className="form-control is-invalid" id="genreSong" placeholder={language[lang][18]} ></textarea>
                            </div>
                            <div className="custom-file" style={{ marginTop: "10px" }} id='inputFile'>
                                <input
                                    style={{ width: "100%" }}
                                    type="file"
                                    className="custom-file-input"
                                    accept="audio/*"
                                    id="sourceFile"
                                    name="asdhjbn"
                                    required={false}
                                    onChange={(e) => {
                                        setFileMusic(e.target.files[0]);
                                        let parent = document.getElementById('#slt');
                                        if (parent !== null && fileMusic !== null && fileMusic.type.includes("audio")) parent.removeChild(parent.firstChild)
                                    }}></input>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="hstack gap-3" style={{ marginTop: "20px" }}>
                        <div className="bg-light border" id='aaa'>
                            <div className="col-9" style={{ marginTop: "20px", width: "fit-content" }}>
                                {buttonBack(lang, navigate)}
                            </div>
                        </div>
                        <div className="bg-light border ms-auto">
                            <div className="bg-light border" id='aaa'>
                                {buttonAdd('add_song', lang, fileMusic, username, navigate)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default AddSong