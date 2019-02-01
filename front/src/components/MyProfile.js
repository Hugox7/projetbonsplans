import React from 'react';
import WithAuth from '../withAuth';
import Header from './Header';
import axios from 'axios';

class MyProfile extends React.Component {

    state = {
        bonsplans: []
    }

    componentDidMount() {
        this.getBonsPlans()
    }

    getBonsPlans = () => {
        axios
            .get(`http://localhost:3002/bonsplans/mesbonsplans/${this.props.user.id}`)
            .then(res => {
                this.setState({bonsplans: res.data})
                console.log(this.state.bonsplans)
            })
            
    }

    render() {
        return(
            <div>
                <Header />
                <div>
                   <img src={this.props.user.avatar || '../assets/profile.jpg'} alt={`Profile pic of ${this.props.user.username}`}></img> 
                   <p>{this.props.user.username}</p>
                </div>
            </div>
        )
    }
}

export default WithAuth(MyProfile);