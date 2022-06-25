import React from "react";
import axios from 'axios'
import { buttonAdd, buttonDelete, searchForm } from "../../components/Buttons";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle'
import {useNavigate} from 'react-router-dom'
import  listMusic  from "../../components/TableMusic";
import { Context } from "../../App";
import { localhost } from "../../res";


function Home(props) {
    const context=React.useContext(Context)
    var lang = context.lang
    var username= context.username
    const [checked, setChecked] = React.useState([])
    const [checkedAll, setCheckedAll] = React.useState(false)
    const [songs, setSongs] = React.useState([])
    const [toggle, setToggle] = React.useState(false)
    const [originalSongs, setOriginalSongs] = React.useState([])
    const navigate=useNavigate();

    React.useEffect(() => {
        var formData=new FormData();
        formData.append('username', username)
        axios.post(localhost+'/musicmanager',formData)
            .then(res => {
                setSongs(res.data.data);
                setOriginalSongs(res.data.data)
            })
    }, [toggle])


    const table_list_music = listMusic(lang, songs, checked, setChecked, checkedAll, setCheckedAll, props.setCurrentSong, navigate)

    return (
        <>
            <div className="hstack gap-3">
                <div className="bg-light border" id='aaa'>
                    {buttonAdd('add', lang, null, null, navigate)}
                </div>
                <div className="bg-light border" >
                    {buttonDelete('delete', lang, songs, checked, setChecked, toggle, setToggle, setCheckedAll, navigate)}
                </div>
                <div className="bg-light border ms-auto">
                    {searchForm(lang, originalSongs, setSongs)}
                </div>
            </div>
            <div style={{ border: 3, borderStyle: "solid", marginTop: "15px", padding: 0 }}>
                {table_list_music}
            
            </div >
        </ >
    );
}
export default Home