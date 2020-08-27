import React from 'react';
import {MyApiClient} from './my-api-client.js';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            userInfo: {}
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        MyApiClient
            .post('/login', {
                username: this.state.username,
                password: this.state.password
            })
            .then((response) => {
                if(response.data) {
                    this.setState({userInfo: response.data});
                }
            })
            .then(() => {
                let user = JSON.stringify(this.state.userInfo);
                if(user !== '{}') {
                    localStorage.setItem('user', user);
                } else {
                    throw 404;
                }
            })
            .then(() => {
                window.location = '/';
            })
    }

    render() {
        return(
            <div>
                <h1>Login</h1>
                <form name='signup' method='POST'>
                <input onChange={this.handleOnChange} type='text' name='username' placeholder='Email' />
                <input onChange={this.handleOnChange} type='password' name='password'  placeholder='Password' />
                <button onClick={this.handleSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}