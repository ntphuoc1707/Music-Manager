import { language } from "../../res";
import React from "react"

function CreateSelectItemTag(props) {
    let array = props.data
    var lang = props.lang;
    return (<div>
            <label style={{ fontSize: "20px" }}>{language[lang][19]}: {array.length}</label>
        </div>
    );
}

function listMusic(lang, songs, checked, setChecked, checkedAll, setCheckedAll, setCurrentSong, navigate) {
    return (
        (<>
            <div className="tableFixHead" style={{ overflowY: "auto", maxHeight: "400px", padding: 0 }} >
                <table className="table_data" style={{ width: '100%', scrollY: "200px", "scrollCollapse": true, }}>
                    <thead>
                        <tr style={{ width: '100%', textAlign: "center", borderBottom: 1, borderStyle: "solid" }}>
                            <th style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                <input
                                    id='checkedAll'
                                    className="form-check-input"
                                    type='checkbox'
                                    onClick={() => {
                                        for (var i = 0; i < songs.length; i++) {
                                            var t = document.getElementById('check' + i)
                                            if (checkedAll)
                                                t.checked = false
                                            else t.checked = true
                                        }
                                        var temp = []
                                        if (!checkedAll) {
                                            for (var i = 0; i < songs.length; i++)
                                                temp.push(songs[i].id)
                                        }
                                        setCheckedAll(!checkedAll)
                                        setChecked(temp)
                                    }}
                                >
                                </input>
                            </th>
                            {/* <th>ID</th> */}
                            <th id='name_song' style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>{language[lang][5]}</th>
                            <th id='genre_song' style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>{language[lang][6]}</th>
                            <th id='action_song' style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>{language[lang][7]}</th>
                        </tr>
                    </thead>
                    <tbody id='bodyTable'>
                        {
                            songs.map((e, index) =>
                                <tr id={'row' + index} key={'row' + index} style={{ width: '100%' }}>
                                    <td style={{ width: "50px", textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value="{songs.indexOf(e)}"
                                            id={'check' + index}
                                            onClick={() => {
                                                if (checked.includes(e.id)) {
                                                    checked.splice(checked.indexOf(e.id), 1)
                                                    document.getElementById('checkedAll').checked = false;
                                                    setCheckedAll(false)
                                                }
                                                else checked.push(e.id);
                                                if (checked.length === songs.length) {
                                                    document.getElementById('checkedAll').checked = true;
                                                    setCheckedAll(true)
                                                }
                                                console.log(checked)
                                                setChecked([].concat(checked))
                                            }}>
                                        </input>
                                    </td>
                                    {/* <td style={{ textAlign: "center" }}>{e.id}</td> */}
                                    <td style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}> {e.name}</td>
                                    <td style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>{e.genre}</td>
                                    <td style={{ textAlign: "center", borderBottom: 1, borderStyle: "solid", paddingTop: "5px", paddingBottom: "5px" }}>
                                        <button
                                            id={'play_song' + e.id}
                                            style={{ marginRight: "10px" }}
                                            className="btn btn-outline-success"
                                            type="submit"
                                            key={'play' + index}
                                            onClick={() => {
                                                setCurrentSong(e)
                                                localStorage.setItem("currentSong", JSON.stringify(e))
                                                navigate('/playSong')
                                            }
                                            }
                                        >
                                            {language[lang][8]}
                                        </button>
                                        <button
                                            id={'edit_song' + e.id}
                                            style={{ marginLeft: "10px" }}
                                            key={'edit' + index}
                                            onClick={() => {
                                                setCurrentSong(e)
                                                localStorage.setItem("currentSong", JSON.stringify(e))
                                                navigate('/editSong')
                                            }}
                                            className="btn btn-outline-success"
                                            type="submit"
                                        >
                                            {language[lang][9]}
                                        </button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div colSpan="5">
                <label style={{ fontSize: "20px", paddingTop: "20px" }} >{language[lang][17]}: {songs.length}</label>
            </div>
            <div id='foot' >
                {
                    (checkedAll || checked.length > 0) && <CreateSelectItemTag data={checked} lang={lang} />
                }
            </div>

        </>)
    );
}

export default listMusic