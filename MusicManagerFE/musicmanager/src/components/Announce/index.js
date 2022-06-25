
export function display_announce(type, func) {
    let time = 0;
    let interval = setInterval(frame, 100);
    function frame() {
        if (time === 10) {
            document.getElementById('mess').removeChild(document.getElementById('mess').firstChild)
            clearInterval(interval);
        } else {
            time++;
            if (document.getElementById('message') === null) {
                let m = document.createElement('div')
                m.id = 'message'
                m.role = "alert"
                m.className = "alert alert-" + type
                m.textContent = func + " song " + (type === 'warning' ? 'unsuccessfully!' : 'successfully!')
                document.querySelector('#mess').appendChild(m)
            }
        }
    }
}


export function create_announce(e, fileMusic) {
    if (e === 'add') {
        if (document.getElementById('nameSong').value === '') {
            document.getElementById('nameSong').setAttribute("required", true)
            return false;
        }
        else if (fileMusic === null) {
            let parent = document.getElementById('slt');
            if (parent !== null) parent.removeChild(parent.firstChild)
            let label = document.createElement('label')
            if (fileMusic === null || !fileMusic.type.incluces("audio")) label.textContent = 'File is empty'
            else label.textContent = 'Not a audio file'
            // (fileMusic === null) ? label.textContent = 'File is empty' : label.textContent = 'Not a audio file'
            label.style.color = 'red'
            label.id = 'lb'
            let td = document.createElement('div')
            td.id = 'slt'

            document.querySelector('#inputFile').appendChild(td)
            document.querySelector('#slt').appendChild(label)
            return false;
        }
    }
    return true;
}

// export function CreateSelectItemTag(props) {
//     let array = props.data
//     var lang = props.lang;
//     return (<div>
//             <label style={{ fontSize: "20px" }}>{language[lang][19]}: {array.length}</label>
//         </div>
//     );
// }