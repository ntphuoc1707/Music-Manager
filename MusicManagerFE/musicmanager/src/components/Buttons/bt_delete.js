import axios from 'axios'
import { language, localhost } from '../../res'
import { display_announce } from '../Announce'


const buttonDelete = ((tag, lang, songs, checked, setChecked, toggle, setToggle, setCheckedAll, navigate) => (<button
    style={{ marginLeft: "20px" }}
    id='button_delete'
    data-toggle="modal" data-target="#exampleModalCenter"
    onClick={() => {
        if (checked.length > 0) {
            console.log(localhost + '/delete/' + checked)
            axios.delete(localhost + '/delete/' + checked)
                .then(res => {
                    console.log(res)
                    if (tag === 'delete') {
                        setChecked([])
                        for (var i = 0; i < songs.length; i++) {
                            var t = document.getElementById('check' + i)
                            t.checked = false
                        }
                        document.getElementById('checkedAll').checked = false;
                        document.getElementById('placeholder_input_search').value = ''
                        setCheckedAll(false)
                        setToggle(!toggle)
                    }

                    if (res.data.status) {
                        display_announce('danger', 'Delete')
                    }
                    else {
                        display_announce('warning', 'Delete')
                    }
                    if (tag !== 'delete')
                        navigate('/home')
                })
        }



    }
    }
    className="btn btn-outline-success"
    type="submit"
>
    {language[lang][3]}
</button>))
export default buttonDelete
