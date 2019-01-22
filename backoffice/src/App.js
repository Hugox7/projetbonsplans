import React, { Component } from 'react';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import BonsPlans from './components/bonsplans/BonsPlans';
import ModifyBonPlan from './components/bonsplans/ModifyBonPlan';
import AddNewBonPlan from './components/bonsplans/AddNewBonPlan';
import Users from './components/users/Users';
import ModifyUser from './components/users/ModifyUser';
import AddNewUser from './components/users/AddNewUser';
import UserByName from './components/users/UserByName';
import UserById from './components/users/UserById';


class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to={'/'}><button>Accueil</button></Link>
          <Link to={'/users'}><button>Utilisateurs</button></Link>
          <Link to={'/bonsplans'}><button>Bons plans</button></Link>
        </header>

        <Switch>
          <Route path="/login" render={(props) => <Login {...props}/>} />
          <Route exact path="/" component={Home} />
          <Route path="/bonsplans" render={(props) => <BonsPlans {...props}/>} />
          <Route path="/modifybonplan/:id" render={(props) => <ModifyBonPlan {...props} />} />
          <Route path="/addnewbonplan" component={AddNewBonPlan} />
          <Route path="/users" render={(props) => <Users {...props} />} />
          <Route path="/modifyuser/:id" render={(props) => <ModifyUser {...props} />} /> 
          <Route path="/addnewuser" component={AddNewUser} /> 
          <Route path="/userbyname/:name" render={(props) => <UserByName {...props} />} />
          <Route path="/userbyid/:id" render={(props) => <UserById {...props} />} />
        </Switch>
      </div>
    );
  }
}

export default App;
