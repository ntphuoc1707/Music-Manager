import { language } from '../../res';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { buttonLogout } from '../Buttons';
import { Context } from '../../App';
import React from 'react';
import { Outlet } from 'react-router';

function Navbar(props) {
    const context=React.useContext(Context)
    const lang=context.lang
    const username=context.username
    const token=context.token
    return (
        <div className="container">
            <div className="row">
                <div style={{ margin: "20px" }}>
                    {username!==''&&buttonLogout(lang, username, token)}
                    <select
                        onChange={(e) => {props.setLanguage(e.target.value)}}
                        style={{ float: "right", width: "fit-content" }}
                        className="form-select"
                        aria-label="Default select example"
                    >
                        {
                            Object.keys(language).map((key) => {
                                return (
                                    <option key={key} value={key}>{language[key][21]}</option>
                                );
                            })
                        }
                    </select>
                    <h2 id="heading" style={{ "marginLeft": "10px", float: "right" }}>{username} {username!==''&& '|'} {language[lang][1]}:</h2>
                    {username !== '' && <img
                        style={{ float: "right" }}
                        src="https://rgl.mobi/IFScD"
                        alt="avatar" srcSet=""
                        width="32.59px"
                        height="32.59px">
                    </img>
                    }
                </div>
            </div>
            <div id='mess'>

            </div>
            <Outlet/>
        </div>
    );
}

export default Navbar;