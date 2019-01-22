import React from 'react';
import withAuth from '../withAuth';
import axios from 'axios';
import './ModifyBonPlan.css';
import { TextField, Button } from '@material-ui/core';


class ModifyBonPlan extends React.Component {

    state = { modifyInputValue : { title: '', link: '', description: '' } }


    componentDidMount() {
        this.getBonPlan()
    }

    getBonPlan = (e) => {
        axios
            .get(`http://localhost:3002/bonsplans/${this.props.match.params.id}`)
            .then(res => this.setState({modifyInputValue: res.data[0]}))
    }

    handleChange = (e) => {
        this.setState({modifyInputValue : {...this.state.modifyInputValue, [e.target.name]: e.target.value} })
    }

    submitModifiedBonPlan = (e) => {
        e.preventDefault();
        axios
            .patch(`http://localhost:3002/bonsplans/${this.props.match.params.id}`, this.state.modifyInputValue, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
            .then(window.history.back())
            .then(alert('Les modifications ont bien été enregistrées'))
            .then(window.location.reload())
    }

    render() {
        return (
            <div className='form-global'>
                <form className='modify-form' onSubmit={this.submitModifiedBonPlan}>
                    <div className='form-title'>
                        <h3>Modifier le bon plan : {this.state.modifyInputValue.title}</h3>
                    </div>
                    <div className='form-body'>
                    <TextField
                        className='input1'
                        label="Titre"
                        placeholder="Titre"
                        margin="normal"
                        name="title"
                        value={this.state.modifyInputValue.title}
                        onChange={this.handleChange}
                    />
                    <TextField
                        className='input1'
                        label="Lien"
                        placeholder="Lien"
                        margin="normal"
                        name="link"
                        value={this.state.modifyInputValue.link}
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
                        value={this.state.modifyInputValue.description}
                        onChange={this.handleChange}
                    />
                        <div>
                            <Button className='submit-button' variant="contained" color="primary" onClick={this.submitModifiedBonPlan}>Soumettre</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withAuth(ModifyBonPlan);