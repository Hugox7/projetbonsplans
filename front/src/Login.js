import React from 'react';
import AuthService from './AuthService';
import { Button, Input } from 'react-materialize';
import { Link } from 'react-router-dom'
import './Login.css'

const Auth = new AuthService();

class Login extends React.Component {

    state = {
        username: '',
        password: ''
    }

    componentWillMount() {
        if (Auth.loggedIn()) {
            this.props.history.replace('/')
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = this.state
        console.log(this.state)
        Auth.login(username, password)
        .then(res => {
            console.log('tutu', res)
            window.location.reload()
        })
        .catch(err => {
            alert(err)
        })
    }

    render() {
        return(
            <div className='loginPage'>
                <div className='loginTitle'>
                    {/* <h3>Partagez vos bons plans entre amis !</h3> */}
                </div>
                <form className='loginForm' onSubmit={this.handleSubmit}>
                    <Input 
                        placeholder="Entrez votre nom d'utilisateur" 
                        name='username' 
                        type='text' 
                        onChange={this.handleChange}>
                    </Input>
                    <Input 
                        placeholder="Entrez votre mot de passe" 
                        name='password' 
                        type='password' 
                        onChange={this.handleChange}>
                    </Input>
                    <Button className='submitButton' type='submit'>Go !</Button>
                    <p className='registerLink'>Pas de compte ? s'enregistrer <Link to={'/register'}>ici</Link></p>
                </form>
                <div className='loginFooter'>
                    <p>2019 - Copyright NosBonsPlans</p>
                </div>
            </div> 
        )
    }
}

export default Login;