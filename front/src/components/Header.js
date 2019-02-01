import React from 'react';
import WithAuth from '../withAuth';
import { Navbar, Button } from 'react-materialize';
import './Header.css';
import AuthService from '../AuthService';
//import { Link } from 'react-router-dom';

const Auth = new AuthService();

class Header extends React.Component {

    handleLogout = () => {
        Auth.logout()
        window.location.reload()
    }

    render() {
        console.log(this.props)
        return (
            <header>
                <Navbar className='nav' brand='NosBonsPlans.fr' right>
                    <Button onClick={this.handleLogout} className='deco'>Deconnection</Button>
                </Navbar>
            </header>
        )
    }
}

export default WithAuth(Header);