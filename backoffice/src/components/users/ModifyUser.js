import React from 'react';
import withAuth from '../withAuth';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';

class ModifyUser extends React.Component {

    state = {
        modifyInputValue : { username: '', password: '' }
    }

    componentDidMount() {
        this.getUser();
    }

    getUser() {
        axios
            .get(`http://localhost:3002/user/${this.props.match.params.id}`)
            .then(res => this.setState({modifyInputValue: res.data[0]}))
            .then(() => console.log('tutu', this.state.modifyInputValue))
    }

    handleChange = e => {
        this.setState({modifyInputValue: {...this.state.modifyInputValue, [e.target.name]: e.target.value} })
    }

    submitModifiedUser = e => {
        e.preventDefault();
        axios
            .patch(`http://localhost:3002/user/${this.props.match.params.id}`, this.state.modifyInputValue, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(window.history.back())
            .then(alert('Les modifications ont bien été enregistrées'))
            .then(window.location.reload())
    }

    render() {
        return(
            <div className='form-global'>
                <form className='modify-form' onSubmit={this.submitModifiedBonPlan}>
                    <div className='form-title'>
                        <h3>Modifier l'utilisateur : {this.state.modifyInputValue.username}</h3>
                    </div>
                    <div className='form-body'>
                    <TextField
                        className='input1'
                        label="Nom d'utilisateur"
                        placeholder="Nom d'utilisateur"
                        margin="normal"
                        name="username"
                        value={this.state.modifyInputValue.username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Mot de passe"
                        placeholder="Mot de passe"
                        margin="normal"
                        name="password"
                        value={this.state.modifyInputValue.password}
                        onChange={this.handleChange}
                    />
                        <div>
                            <Button className='submit-button' variant="contained" color="primary" onClick={this.submitModifiedUser}>Soumettre</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withAuth(ModifyUser);

