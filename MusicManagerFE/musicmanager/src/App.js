import React from 'react';
import './App.css';
import Header from './components/Header';
import { Login, AddSong, EditSong, Home, SignUp, NoPage, PlaySong } from './pages';
import { Routes, Route } from 'react-router-dom';
import { localhost, path } from './res';
import axios from 'axios';

export const Context = React.createContext()




function App() {
  const [lang, setLanguage] = React.useState('eng')
  const [currentSong, setCurrentSong] = React.useState(JSON.parse(localStorage.getItem("currentSong")))
  const [username, setUsername] = React.useState(localStorage.getItem("username"))
  const [token, setToken] = React.useState(localStorage.getItem("token"))
  const [accuracy, setAccuracy] = React.useState(false)
  React.useEffect(() => {
    if (!token) setAccuracy(false)
    else {
      var formData = new FormData()
      formData.append("token", token)
      axios.post(localhost + '/validateToken', formData)
        .then((res) => {
          if(res.data.data){
            setAccuracy(true);
          }
          else{
            localStorage.removeItem("username")
            localStorage.removeItem("token")
            setUsername('')
            setToken('')
          }
        })
    }
  },[])

  return (
    <Context.Provider value={{ lang: lang, username: username, token: token, accuracy: accuracy }}>
      <Routes>
        <Route path='/' element={<Header setLanguage={setLanguage} />}>
          <Route path='' element={<NoPage/>}/>
          <Route path={path.LOGIN} element={
            <Login
              setUsername={setUsername}
              setToken={setToken}
              setAccuracy={setAccuracy}
            />} />
          <Route path={path.SIGNUP} element={
            <SignUp />
          } />
          {accuracy && <Route path={path.HOME} element={
            <Home
              setCurrentSong={setCurrentSong}
            />}
          />}
          {accuracy && <Route path={path.ADDSONG} element={
            <AddSong />
          } />}
          {accuracy && <Route path={path.PLAYSONG} element={
            <PlaySong
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
            />
          } />}
          {accuracy && <Route path={path.EDITSONG} element={
            <EditSong
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
            />
          } />}
        </Route>
        <Route path='*' element={
          <NoPage />
        } />

      </Routes>
    </Context.Provider>
  );
}

export default App;