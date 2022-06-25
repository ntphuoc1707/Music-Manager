import { language } from '../../res'
const buttonEdit = (lang, setStateWhenPlay) => (<button
    id='button_add'
    data-toggle="modal" data-target="#exampleModalCenter"
    onClick={() => {
        setStateWhenPlay(false)
    }}
    className="btn btn-outline-success"
    type="submit"
>
    {language[lang][9]}
</button>)
export default buttonEdit