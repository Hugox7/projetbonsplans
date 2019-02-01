import React, { Component } from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './Login'
import Register from './components/Register';
import Home from './components/Home'
import MyProfile from './components/MyProfile';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
            <Route path = '/login' component={Login} />
            <Route path= '/register' component={Register} />
            <Route exact path= '/' component={Home} />
            <Route path= '/monprofil' component={MyProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
