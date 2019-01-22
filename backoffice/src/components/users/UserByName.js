import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import withAuth from '../withAuth';
import './UserByName.css';

class UserByName extends React.Component {

    state = {
        users: []
    }

    componentDidMount() {
        this.handleSearchByName()
    }

    handleDelete = (id) => {
        const response = window.confirm('Souhaitez-vous vraiment supprimer cet utilisateur ?')
        if (response) {
            axios
                .delete(`http://localhost:3002/user/${id}`, {...this.state.users[id-1], "is_active" : "0"}, {headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
                    .then(window.location.reload())
        }   
    }

    handleSearchByName = () => {
        axios
            .get(`http://localhost:3002/user/username/${this.props.match.params.name}`)
            .then(res => this.setState({users: res.data}))     
            .catch((error) => {
                if (error.response) {
                    alert('Inexistant')
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
        if (this.state.users.length > 0) {
            return(
                <div>
                    <table className='table'>
                    <caption>Edition des utilisateurs</caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Password</th>
                            <th>Creation Date</th>
                            <th>Last Update Date</th>
                            <th>Is_active</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(e => 
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.username}</td>
                                <td>{e.role}</td>
                                <td>{e.password}</td>
                                <td>{e.creation_date}</td>
                                <td>{e.last_update_date}</td>
                                <td>{e.is_active}</td>
                                <td>{e.email}</td>
                                    <Link to={`/modifyuser/${e.id}`}><button>Modifier</button></Link>
                                    <button onClick={() => this.handleDelete(e.id)}>Supprimer</button>
                            </tr>
                        )}
                    </tbody>
                </table>
                <Button className='submit-button back-button' variant="contained" color="primary" onClick={() => window.history.back()}>Retour</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <h3>Aucun utilisateur ne correspond à votre recherche</h3>
                    <Button className='submit-button back-button' variant="contained" color="primary" onClick={() => window.history.back()}>Retour</Button>
                </div>
                
            )
        }
        
    }
}

export default withAuth(UserByName);