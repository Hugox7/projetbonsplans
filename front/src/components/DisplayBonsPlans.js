import React from 'react';
import WithAuth from '../withAuth';
//import { Chip } from 'react-materialize';
import './DisplayBonsPlans.css';

const profileDefault = require('../assets/profile.jpg')


const DisplayBonsPlans = ({bonsplans}) => {
    return (
        <div>
            <div className='head'>
                <h3 className='h3'>Les derniers bons plans...</h3>
            </div>
            {bonsplans.slice(0).reverse().map(e => {
                return (<div className='aCard'>
                            <div className='entete'>
                                <p className='title padding'>{e.title}</p>
                                <div className='user-block'> 
                                    <p className='usernameCard'>{e.username}</p>
                                    <img className='profilePic' src={e.avatar || profileDefault}  alt={'profile pic of ' + e.username} />
                                </div>
                            </div>
                            <div className='body padding'>
                                {e.description}
                            </div>
                            <div className='footer padding'>
                                {e.link}
                            </div>
                        </div>)
            })}
        </div>
    )
}

export default WithAuth(DisplayBonsPlans);