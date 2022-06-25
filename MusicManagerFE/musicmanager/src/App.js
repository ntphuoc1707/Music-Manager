import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Login, AddSong, EditSong, Home, SignUp, NoPage, PlaySong } from './pages';
import { Routes, Route } from 'react-router-dom';
import { path } from './res';

export const Context = React.createContext()

function App() {
  const [lang, setLanguage] = React.useState('eng')
  const [currentSong, setCurrentSong] = React.useState({})
  const [username, setUsername] = React.useState('')
  const [token, setToken]=React.useState('')

  return (
    <Context.Provider value={{ lang: lang, username: username, token: token }}>
      <Routes>
        <Route path='/' element={ <Navbar setLanguage={setLanguage} />}>
          <Route path={path.LOGIN} element={
            <Login
              setUsername={setUsername}
              setToken={setToken}
            />} />
          <Route path={path.SIGNUP} element={
            <SignUp />
          } />
          {token !== '' && <Route path={path.HOME} element={
            <Home
              setCurrentSong={setCurrentSong}
            />}
          />}
          {token !== '' && <Route path={path.ADDSONG} element={
            <AddSong />
          } />}
          {token !== '' && <Route path={path.PLAYSONG} element={
            <PlaySong
              currentSong={currentSong}
              setCurrentSong={setCurrentSong}
            />
          } />}
          {token !== '' && <Route path={path.EDITSONG} element={
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
