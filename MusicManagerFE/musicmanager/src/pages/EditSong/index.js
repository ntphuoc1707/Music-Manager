import React from "react";
import { language } from "../../res";
import { buttonBack, buttonDelete, buttonSave } from "../../components/Buttons";
import {useNavigate} from 'react-router-dom'
import { Context } from "../../App";


function EditSong(props) {
    const context=React.useContext(Context);
    var lang = context.lang
    var username=context.username
    const navigate=useNavigate();

    const edit_infor = (<>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">{language[lang][5]}</span>
            </div>
            <input text={props.currentSong.name} placeholder={props.currentSong.name} id='updateName' type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
        </div>
        <div className="input-group input-group-sm mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="inputGroup-sizing-sm">{language[lang][6]}</span>
            </div>
            <input text={props.currentSong.genre} placeholder={props.currentSong.genre} id='updateGenre' type="text" className="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"></input>
        </div>

    </>)

    return (
        <>
            <div style={{ border: 3, borderStyle: "solid", marginTop: "15px", padding: 0 }}>

                <div className='row'>
                    {edit_infor}
                    <label style={{ margin: "10px", fontSize: "15px" }}>{language[lang][15]}: {props.currentSong.updateTime}</label>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="hstack gap-3">
                        <div className="bg-light border" id='aaa'>
                            {buttonBack(lang,navigate)}
                        </div>
                        <div className="bg-light border ms-auto" style={{ float: 'right' }}>
                            {buttonSave(lang, null, props.currentSong, props.setCurrentSong, props.func, username, navigate)}
                            <div className="bg-light border ms-auto" style={{ float: 'right' }}>
                                {buttonDelete('delete_single', lang, null, [props.currentSong.id], null, null, null, null, navigate)}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


export default EditSong