import axios from 'axios'
import { language, localhost } from '../../res';
import { display_announce } from '../Announce';

const buttonSignup = (lang, navigate, setCondition) => (
    <button
        className="btn btn-outline-light btn-lg px-5"
        type="submit"
        onClick={() => {
            const username = document.getElementById('usernameSignup').value
            const password = document.getElementById('passwordSignup').value
            var formData = new FormData()
            formData.append("username", username)
            formData.append("password", password)
            axios.post(localhost + '/signup', formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.status) {
                        navigate('/login')
                        display_announce('primary', 'Sign up')
                    }
                    else {
                        setCondition(false)
                    }

                })

        }}
    >
        {language[lang][27]}
    </button>
);
export default buttonSignup