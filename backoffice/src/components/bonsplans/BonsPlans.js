import React from 'react';
import withAuth from '../withAuth';
import axios from 'axios';
import './BonsPlans.css';
import { Link } from 'react-router-dom';




class BonsPlans extends React.Component {

    state = {
        bonsplans: []
    }


    componentDidMount() {
        this.getBonsPlans()
    }

    getBonsPlans() {
        axios
            .get('http://localhost:3002/bonsplans')
            .then(res => this.setState({bonsplans: res.data}))
            
    }

    handleDelete = (id) => {
        const response = window.confirm('Souhaitez-vous vraiment supprimer ce bon plan ?')
        if (response) {
            axios
                .delete(`http://localhost:3002/bonsplans/${id}`, {...this.state.bonsplans[id-1], "is_visible": "0"}, {headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("id_token")}})
                .then(window.location.reload())
        }
    }


    render() {
       if (this.state.bonsplans.length > 0)
        return (
            <div>
                <Link to={'/addnewbonplan'}><button className='add-button'>Ajouter un bon plan</button></Link>
                <table className='table'>
                    <caption>Edition des bons plans</caption>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Description</th>
                            <th>Is_visible</th>
                            <th>User_id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.bonsplans.map(e => 
                            <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.title}</td>
                                <td>{e.link}</td>
                                <td>{e.description}</td>
                                <td>{e.is_visible}</td>
                                <td>{e.user_id}</td>
                                    <Link to={`/modifybonplan/${e.id}`}><button>Modifier</button></Link>
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

export default withAuth(BonsPlans)