import React from "react";
import { language } from "../../res";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import { buttonLogin } from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import { Context } from "../../App";

function Login(props) {
    var lang = React.useContext(Context).lang
    
    const navigate = useNavigate();
    const [condition, setCondition] = React.useState(true)
    return (
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">{language[lang][20].toUpperCase()}</h2>
                                <p className="text-white-50 mb-5">{language[lang][22]}</p>
                                {!condition && <p style={{ color: 'red' }}> Username or password incorrect</p>}
                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="text"
                                        id="username"
                                        className="form-control form-control-lg"
                                        placeholder={language[lang][23]}
                                        onChange={() => {
                                            if (!condition) setCondition(true)
                                        }} />
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control form-control-lg"
                                        placeholder={language[lang][24]}
                                        onChange={() => {
                                            if (!condition) setCondition(true)
                                        }}
                                    />
                                </div>
                                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">{language[lang][26]}</a></p>


                                {buttonLogin(lang, props.setUsername, props.setToken, setCondition, navigate)}




                            </div>
                            <div>
                                <p className="mb-0">{language[lang][25]} <a href="#" onClick={() => {navigate('/signup') }} className="text-white-50 fw-bold">{language[lang][27]}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login