import React from 'react';
import axios from 'axios';
import './Register.css';
import { Input, Row, Button } from 'react-materialize';

class Register extends React.Component {

    state = {
        username: '',
        password: '',
        email: '',
        avatar: '',
        bio: '',
        first_name: '',
        last_name: ''
    }

    handleChange = async (e) => {
        await this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios
            .post(`http://localhost:3002/user/register`, {...this.state})
            .then(res => {
                console.log(res)
                window.history.back();
                alert('Vous avez bien été enregistré, vous pouvez maintenant vous connecter')
            })
            .catch(err => alert(err))
    }

    render() {
        return (
            <div className='registerPart'>
                <h3 className= 'register-title'>Crééz votre compte...</h3>
                <form className='register-form' onSubmit={this.handleSubmit} method='post' enctype='multipart/form-data'>
                    <Row>
                        <Input type='text' name='username' label="Nom d'utilisateur" s={12} m={6} l={6} onChange={this.handleChange}></Input>
                        <Input type='password' name='password' label="Mot de passe" s={12} m={6} l={6} onChange={this.handleChange}></Input>
                        <Input type='text' name='email' label="Adresse mail" s={12} onChange={this.handleChange}></Input> 
                        <Input id='file' type='file' name='avatar' label="Fichier" multiple placeholder="Votre photo de profil" s={12}></Input>
                        <Input type='textarea' name='bio' label="Votre biographie" s={12} onChange={this.handleChange}></Input>
                        <Input type='text' name='first_name' label="Prénom" s={6} onChange={this.handleChange}></Input>
                        <Input type='text' name='last_name' label="Nom de famille" s={6} onChange={this.handleChange}></Input>
                        <Button className='register-button' type='submit'>S'inscrire</Button>     
                    </Row>
                </form>
            </div>
        )
    }
}

export default Register;