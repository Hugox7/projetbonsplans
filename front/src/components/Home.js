import React from 'react';
import axios from 'axios';
import WithAuth from '../withAuth';
import Header from './Header';
import './Home.css';
import DisplayBonsPlans from './DisplayBonsPlans';
import { Row, Col, Button, Modal, Input } from 'react-materialize';
import Footer from './Footer';
import { Link } from 'react-router-dom';


class Home extends React.Component {

    state = {
        bonsplans: [],
        bonsplansUser: [],
        title: '',
        link: '',
        description: ''

    }

    componentDidMount() {
        this.getBonsPlans()
        this.getBonsPlansByName()
    }

    getBonsPlans = () => {
        axios
            .get(`http://localhost:3002/bonsplans/all`)
            .then(res => this.setState({bonsplans: res.data}))
            .then(() => console.log(this.state.bonsplans))
    }

    getBonsPlansByName = () => {
        axios
            .get(`http://localhost:3002/bonsplans/mesbonsplans/${this.props.user.username}`)
            .then(res => this.setState({bonsplansUser: res.data}))
            .then(() => console.log('tutu', this.state.bonsplansUser))
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        console.log(this.state)
    }

    handleSubmit = (e) => {
        const { title, link, description } = this.state
        e.preventDefault()
        axios({
            method: 'post',
            url: 'http://localhost:3002/bonsplans',
            data: {
              title: title,
              link: link,
              description: description,
              user_iduser: this.props.user.id
            }
          })
          .then(res => {
            console.log(res)
            window.location.reload()
            alert('Bon plan ajouté')
          })
          .catch(err => {
            console.log(err)
            alert(err)
          })
          
    }

    render() {
        console.log('hello', this.props.user)
        return (
            <div>
                <Header />
                <div className='home-content'>
                    <Row>
                        <Col xs={12} m={4} l={4}>
                            <div className='aside'>
                                <h4 className='h4'>Comment allez-vous <span className='username'>{this.props.user.username}</span> ?</h4>
                                <Modal
                                    header='Ajouter un bon plan'
                                    trigger={<Button className='modal-button'>Ajouter un bon plan</Button>}>
                                    <form class='add-form' onSubmit={this.handleSubmit}>
                                        <Input type='text' name='title' label="Titre" onChange={this.handleChange}></Input>
                                        <Input type='text' name='link' label="Lien de votre bon plan" onChange={this.handleChange}></Input>
                                        <Input type='text' name='description' label="Description de votre bon plan" onChange={this.handleChange}></Input>
                                        <Button type='submit'>Soumettre</Button>
                                    </form>
                                </Modal>
                                <p>Vous avez publié {this.state.bonsplansUser.length} bon(s) plan(s)</p>  
                                <Link to={'/monprofil'}><p>Voir mon profil</p></Link>
                            </div>
                        </Col>
                        <Col xs={12} m={8} l={8}>
                            <DisplayBonsPlans bonsplans={this.state.bonsplans} />
                        </Col>
                    </Row>
                    <Footer />
                    
                </div>
            </div>
        )
    }
}

export default WithAuth(Home);