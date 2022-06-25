import { language } from "../../res";
import { buttonSignup } from "../../components/Buttons";
import React from "react";
import {useNavigate} from 'react-router-dom'
import { Context } from "../../App";

function Signup(){
    var lang=React.useContext(Context).lang
    const navigate= useNavigate()
    const [condition, setCondition]= React.useState(true)
    return(
        <React.Fragment>
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div className="card bg-dark text-white" style={{ borderRadius: "1rem" }}>
                        <div className="card-body p-5 text-center">
                            <div className="mb-md-5 mt-md-4 pb-5">
                                <h2 className="fw-bold mb-2 text-uppercase">{language[lang][27].toUpperCase()}</h2>
                                <p className="text-white-50 mb-5">{language[lang][22]}</p>
                                {!condition && <p style={{color: 'red'}}> Username can already existed or ...</p>}
                                <div className="form-outline form-white mb-4">
                                    <input 
                                        type="text" 
                                        id="usernameSignup" 
                                        className="form-control form-control-lg" 
                                        placeholder={language[lang][23]}
                                        onChange={()=>{
                                            if(!condition) setCondition(true)
                                        }}/>
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input 
                                    type="password" 
                                    id="passwordSignup" 
                                    className="form-control form-control-lg"
                                    placeholder={language[lang][24]} 
                                    onChange={()=>{
                                        if(!condition) setCondition(true)
                                    }}
                                    />
                                </div>
                                <div className="form-outline form-white mb-4">
                                    <input 
                                    type="password" 
                                    id="confirmPassword" 
                                    className="form-control form-control-lg"
                                    placeholder={language[lang][30]} 
                                    onChange={()=>{
                                        if(!condition) setCondition(true)
                                    }}
                                    />
                                </div>
                                {buttonSignup(lang, navigate, setCondition)}
                            </div>
                            <div>
                                <p className="mb-0">{language[lang][29]} <a href="#!" onClick={()=>{navigate('/login')}} className="text-white-50 fw-bold">{language[lang][20]}</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment>
    );
}

export default Signup