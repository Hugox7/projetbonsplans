import React from 'react';
import AuthService from './AuthService';
import './Login.css';
//import withAuth from './withAuth';
//import { promises } from 'fs';

const Auth = new AuthService();
class Login extends React.Component {

    constructor(){
        super();
        this.state={
            username: '',
            password: ''
        }
    }

    componentWillMount(){
        
        if(Auth.loggedIn())
            this.props.history.replace('/');
            console.log('tutu')
    }

    handleChange=(e)=>{
        this.setState(
            {
                [e.target.name]: e.target.value
            }
        )
    }
    
    handleFormSubmit=(e)=>{
        e.preventDefault();
        if (!this.state.username || !this.state.password )
            alert('Veuillez remplir tous les champs !')
        else {
            const { username, password } = this.state
             Auth.login(username, password)   
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err =>{
                alert(err);
            })
        }
    }


    render() {
        return(
            <div className="center">
                <div className="card">
                    <h1>Login</h1>
                    <form>
                        <input
                            className="form-item"
                            placeholder="Nom d'utilisateur..."
                            name="username"
                            type="text"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-item"
                            placeholder="Mot de passe..."
                            name="password"
                            type="password"
                            onChange={this.handleChange}
                            required
                        />
                        <input
                            className="form-submit"
                            value="VALIDER"
                            type="submit"

                            onClick={this.handleFormSubmit}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;