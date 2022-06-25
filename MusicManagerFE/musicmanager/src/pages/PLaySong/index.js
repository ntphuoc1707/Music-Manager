import React from "react";
import { language, localhost } from "../../res";
import { buttonBack, buttonDelete, buttonEdit, buttonSave } from "../../components/Buttons";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Context } from "../../App";

function PlaySong(props) {
    const context=React.useContext(Context);
    var lang = context.lang
    var username=context.username
    const [stateWhenPlay, setStateWhenPlay] = React.useState(true)
    const [url, setUrl] = React.useState(null);
    var unedited_infor = null;
    const navigate = useNavigate();


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

    React.useEffect(() => {
        axios.get(localhost + '/get_song/' + props.currentSong.id)
            .then(res => {
                console.log(res)
                const src = res.data.data.replace('[', '').replace(']', '').split(',').map(str => Number(str))
                var blob = new Blob([new Uint8Array(src)], { type: 'audio/mpeg' });
                var p = window.URL.createObjectURL(blob);
                setUrl(p);
            })
    })
    unedited_infor = (<>
        <label style={{ margin: "10px", fontSize: "15px" }}>
            <b>
                {language[lang][5]}: {stateWhenPlay ? props.currentSong.name : (<input type='text'></input>)}
            </b>
        </label>
        <label style={{ margin: "10px", fontSize: "15px" }}>
            <b>
                {language[lang][6]}: {stateWhenPlay ? props.currentSong.genre : (<input type='text'></input>)}
            </b>
        </label>

    </>);


    return (
        <>
            <div style={{ border: 3, borderStyle: "solid", marginTop: "15px", padding: 0 }}>
                <div className='container'>
                    <div className='row'>
                        <audio
                            id='audio'
                            autoPlay
                            src={url}
                            controls
                            style={{ width: "100%" }}
                        >
                        </audio>
                    </div>
                    <div className='row'>
                        <h1>{language[lang][14]}</h1>
                    </div>

                </div>

                <div className='row'>
                    {stateWhenPlay ? unedited_infor : edit_infor}
                    <label style={{ margin: "10px", fontSize: "15px" }}>{language[lang][15]}: {props.currentSong.updateTime}</label>
                </div>
                <div className="row" style={{ padding: "10px" }}>
                    <div className="hstack gap-3">
                        <div className="bg-light border" id='aaa'>
                            {buttonBack(lang, navigate)}
                        </div>
                        <div className="bg-light border ms-auto" style={{ float: 'right' }}>
                            {stateWhenPlay ? buttonEdit(lang, setStateWhenPlay) : buttonSave(lang, setStateWhenPlay, props.currentSong, props.setCurrentSong, "playSong", username, null)}
                            <div className="bg-light border ms-auto" style={{ float: 'right' }}>
                                {buttonDelete('delete_single', lang, null, [props.currentSong.id], null, null, null, null,navigate)}
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}


export default PlaySong