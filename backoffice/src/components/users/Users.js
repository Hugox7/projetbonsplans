import React from 'react';
import './Users.css';
import withAuth from '../withAuth';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Users extends React.Component {

    state = {
        users : [],
        addInputValue: { byName: '', byId: undefined }
    }

    componentDidMount() {
        this.getUsers()
    }

    getUsers() {
        axios 
            .get('http://localhost:3002/user')
            .then(res => this.setState({users: res.data}))
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

    handleChange = e => {
        const addInputValue = {...this.state.addInputValue};
        addInputValue[e.target.name] = e.target.value
        this.setState({ addInputValue })
    }



    render() {
        if (this.state.users.length > 0)
        return(
            <div>
                <div className='users-head'>
                    <Link to={'/addnewuser'}><button className='add-button'>Ajouter un utilisateur</button></Link>
                    <div className='search-div'>
                        <form>
                            <label className='searchInput'>Rechercher par nom : </label>
                            <input onChange={this.handleChange}  name='byName'></input>
                            <Link to={`/userbyname/${this.state.addInputValue.byName}`}><button /*onClick={(e) => this.handleSearchByName(e, this.state.addInputValue.byName)}*/>OK</button></Link>
                        </form>
                        <form>
                            <label className='searchInput'>Rechercher par identifiant : </label>
                            <input placeholder='Veuillez entrer un nombre' onChange={this.handleChange} name='byId'></input>
                            <Link to={`/userbyid/${this.state.addInputValue.byId}`}><button className='searchButton'/*onClick={(e) => this.handleSearchByName(e, this.state.addInputValue.byName)}*/>OK</button></Link>
                        </form>
                    </div>
                </div>
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
            </div>
        )
        else return (<div>Loading...</div>)
    }
}

export default withAuth(Users);
