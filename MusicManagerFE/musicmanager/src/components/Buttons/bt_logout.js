import axios from 'axios'
import { language, localhost } from '../../res'


const buttonLogout = (lang, username, token) => (<button
    id='button_add'
    data-toggle="modal" data-target="#exampleModalCenter"
    style={{ float: 'right', marginLeft: '5px' }}
    onClick={() => {
        
        var formData = new FormData();
        formData.append("username", username)
        formData.append("token", token)
        axios.post(localhost+'/logout', formData)
            .then((res) => {
               window.location.assign('/login')
               
            })

    }}
    className="btn btn-outline-success"
    type="submit"
>
    {language[lang][28]}
</button>)

export default buttonLogout