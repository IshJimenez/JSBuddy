import './App.css';
import Strings from './Components/Strings'
import Login from './Components/Login'
import Home from './Components/Home'
import {Switch, Route, Link} from 'react-router-dom'
import Auth from './Components/Auth'

function App() {
  return (
    <div className="App">
    <h1>JSBuddy</h1>
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
