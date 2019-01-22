import React from 'react';
import withAuth from '../withAuth';
import axios from 'axios';
import { TextField, Button } from '@material-ui/core';



class AddNewBonPlan extends React.Component {

    state = {
        addInputValue : { title : '', link : '', description : '', user_id : ''  }
    }


    handleChange = (e) => {
        const addInputValue = {...this.state.addInputValue}
        addInputValue[e.target.name] = e.target.value
        this.setState({ addInputValue })
    }

    submitNewBonPlan = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3002/bonsplans', this.state.addInputValue, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(this.setState({}))
            .then(window.history.back())
            .then(alert('Les modifications ont bien été enregistrées'))
            .then(window.location.reload())
            

    }

    render() {
        return(
            <div>
                <form onSubmit={this.submitNewBonPlan}>
                    <TextField
                        className='input1'
                        label="Titre"
                        placeholder="Titre"
                        margin="normal"
                        name="title"
                        value={this.state.addInputValue.title}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Lien"
                        placeholder="Lien"
                        margin="normal"
                        name="link"
                        value={this.state.addInputValue.link}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Description"
                        placeholder="Description"
                        multiline
                        margin="normal"
                        variant="outlined"
                        name="description"
                        value={this.state.addInputValue.description}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Id de l'utilisateur"
                        placeholder="Id de l'utilisateur"
                        margin="normal"
                        name="user_id"
                        value={this.state.addInputValue.user_id}
                        onChange={this.handleChange}
                    />
                    <Button className='submit-button' variant="contained" color="primary" onClick={this.submitNewBonPlan}>Soumettre</Button>
                </form>
            </div>
        )
    }
}

export default withAuth(AddNewBonPlan);