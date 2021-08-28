import React, {useState, useEffect} from 'react'
import UserAuthorization from './components/UserAuthorization'
import NavBar from './components/NavBar'
import Index from './workouts/Index';

function App() {
const [sessionToken, setSessionToken] = useState('')
const [globalUsername, setGlobalUsername] = useState(null);



useEffect(() => { 
  if(localStorage.getItem('token')){
    setSessionToken(localStorage.getItem('token'))
  }
  if(localStorage.getItem('username')){
    setGlobalUsername(localStorage.getItem('username'))
  }
}, [])

const updateToken = newToken => {
  localStorage.setItem('token', newToken)
  setSessionToken(newToken)
}

const clearToken = () => {
  localStorage.clear()
  setSessionToken('')
  setGlobalUsername('')
}

const updateUsername = usernameFromRes => {
  localStorage.setItem('username', usernameFromRes)
  setGlobalUsername(usernameFromRes)
}

const protectedViews = () => {
    return (
    sessionToken!==undefined && sessionToken === localStorage.getItem('token') 
        ? <Index token={sessionToken}/> 
        : <Auth updateToken={updateToken} updateUsername={updateUsername}/>
    )
}

  return (
    <div>
      <Sitebar clickLogout={clearToken} username={globalUsername}/>
      {protectedViews()}
    </div>
  );
}

export default App;