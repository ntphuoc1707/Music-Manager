import { language, localhost } from '../../res'
import axios from 'axios'

const buttonLogin = (lang, setUsername, setToken, setCondition, navigate) => (
    <button
        className="btn btn-outline-light btn-lg px-5"
        type="submit"
        onClick={() => {
            const username = document.getElementById('username').value
            const password = document.getElementById('password').value
            var formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            axios.post(localhost+'/login', formData)
                .then((res) => {
                    console.log(res)
                    if (!res.data.status) {
                        setCondition(false)
                    }
                    else {
                        setUsername(username)
                        setToken(res.data.data)
                        navigate('/home')
                        
                    }
                })
        }}
    >
        {language[lang][20]}
        
    </button>
);
export default buttonLogin