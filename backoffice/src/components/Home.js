import React from 'react';
import AuthService from './AuthService';
import withAuth from './withAuth';
const Auth = new AuthService();

class Home extends React.Component {

    handleLogout=()=>{
        Auth.logout()
        this.props.history.push('/login');
     }

    render() {
        return (
            <div>
                <h3>Welcome {this.props.user.username} !</h3>
                <p className="App-intro">
                    <button type="button" className="form-submit" onClick={this.handleLogout}>Deconnection</button>
                </p>
            </div>
        )
    }
}

export default withAuth(Home);