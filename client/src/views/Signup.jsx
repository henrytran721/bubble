import React from 'react';
import {MyApiClient} from './my-api-client.js';
import '../sass/login.scss';
export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            zipCode: '',
            password: ''
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
            .post('/signup', {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                zip: this.state.zipCode,
                password: this.state.password
            })
            .then((response) => {
                if(response.data.redirect) {
                    window.location = '/';
                } else {
                    document.querySelector('.errorHandler').textContent = response.data;
                }
            })
    }

    render() {
        return(
            <div class='loginContainer'>
                <div class='login'>
                <h1>Sign up</h1>
                <form name='signup' method='POST'>
                    <input onChange={this.handleOnChange} type='text' name='first_name' placeholder='First Name' />
                    <input onChange={this.handleOnChange} type='text' name='last_name' placeholder='Last Name' />
                    <input onChange={this.handleOnChange} type='email' name='email' placeholder='Email' />
                    <input onChange={this.handleOnChange} type="text" name="zipCode" placeholder='Zip Code'  />
                    <input onChange={this.handleOnChange} type='password' name='password'  placeholder='Password' />
                    <button onClick={this.handleSubmit}>Submit</button>
                </form>
                <p className='errorHandler'></p>
                </div>
            </div>
        )
    }
}