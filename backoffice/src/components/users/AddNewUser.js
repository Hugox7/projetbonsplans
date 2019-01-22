import React from 'react';
import withAuth from '../withAuth';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core'

class AddNewUser extends React.Component {

    state = {
        addInputValue: { username: '', password: '', email: '' }
    }

    handleChange = e => {
        const addInputValue = {...this.state.addInputValue}
        addInputValue[e.target.name] = e.target.value
        this.setState({ addInputValue })
    }

    submitNewUser = e => {
        e.preventDefault();
        axios
            .post('http://localhost:3002/user/register', this.state.addInputValue, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})  
            .then((response) => {
                console.log(response.data)
                this.setState({})
                window.history.back()
                alert('Les modifications ont bien été enregistrées')
                window.location.reload()
            })
            .catch((error) => {
                if (error.response) {
                    alert('Mail ou username déjà existant ou tous les champs ne sont pas remplis')
                }
                else if (error.request) {
                    alert('Le serveur ne répond pas')
                }
                else {
                    alert(error.message)
                }
            })
    }

    render() {
        return(
            <div>
                <form onSubmit={this.submitNewBonPlan}>
                    <TextField
                        className='input1'
                        label="Nom d'utilisateur"
                        placeholder="Nom d'utilisateur"
                        margin="normal"
                        name="username"
                        value={this.state.addInputValue.username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Mot de passe"
                        type="password"
                        placeholder="Mot de passe"
                        margin="normal"
                        name="password"
                        value={this.state.addInputValue.password}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="e-mail"
                        placeholder="e-mail"
                        margin="normal"
                        name="email"
                        value={this.state.addInputValue.email}
                        onChange={this.handleChange}
                    />
                    <Button className='submit-button' variant="contained" color="primary" onClick={this.submitNewUser}>Soumettre</Button>
                </form>
            </div>
        )
    }
}

export default withAuth(AddNewUser);

