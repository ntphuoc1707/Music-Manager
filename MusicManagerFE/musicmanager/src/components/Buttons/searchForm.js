import { language } from '../../res'

const searchForm = (lang, originalSongs, setSongs) => (<div className="d-flex" role="search">
    <input
        id='placeholder_input_search'
        className="form-control me-2"
        type="search"
        placeholder={language[lang][4]}
        aria-label="Search"
        onKeyPress={(e) => {
            if (e.key === "Enter") {
                var searchSong = document.getElementById('placeholder_input_search').value.toLowerCase();
                var tempSong = [];
                for (var i = 0; i < originalSongs.length; i++) {
                    if (originalSongs[i].name.toLowerCase().includes(searchSong))
                        tempSong.push(originalSongs[i])
                }
                setSongs(tempSong);
            }
        }
        }
        onChange={() => {
            if (document.getElementById('placeholder_input_search').value.length === 0) { setSongs(originalSongs) }
        }}
    >
    </input>
    {/* <div className="d-grid gap-2 col-5 mx-auto">
        <button
            id='button_search'
            onClick={() => {
                var searchSong = document.getElementById('placeholder_input_search').value.toLowerCase();
                var tempSong = [];
                for (var i = 0; i < originalSongs.length; i++) {
                    if (originalSongs[i].name.toLowerCase().includes(searchSong))
                        tempSong.push(originalSongs[i])
                }
                setSongs(tempSong);
            }}
            className="btn btn-outline-success"
            type="submit"
        >
            {language[lang][4]}
        </button>
    </div> */}
</div >)
export default searchForm