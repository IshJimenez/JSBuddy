import './App.css';
import Strings from './Components/Strings'
import Login from './Components/Login'
import Home from './Components/Home'
import {Switch, Route, Link} from 'react-router-dom'
import actions from './api'
import Auth from './Components/Auth'
import {useEffect, useState} from 'react';

function App() {

  const [user, setUser] = useState({})

  useEffect(()=> {
    actions.getUser().then(res => {
      setUser(res.data)
    }).catch(console.error)
  }, [])

    return (
    <div className="App">
    <h1>JSBuddy </h1>
    <h4>{user.email}</h4>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/strings">Strings</Link>
      <Link to="/login">Login</Link>
      <Link to ='/auth'>Log In</Link>
    </nav>

    <Switch>
      <Route exact path="/" render={ (props) => <Home {...props} /> } />
      <Route exact path="/strings" render={ (props) => <Strings {...props} /> } />
      <Route exact path="/login" render={ (props) => <Login {...props} /> } />
      <Route exact path='/auth' render={ (props) => <Auth {...props} /> } />
    </Switch>

    </div>
  );
}

export default App;
