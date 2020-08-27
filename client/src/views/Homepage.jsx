import React from 'react';
import axios from 'axios'; 
import SearchLocationInput from './SearchLocationInput';
import {MyApiClient} from './my-api-client.js';
function SearchBar(props) {
    return(
        <div>
            <form className='searchBar' name='searchBar' method='POST'>
                <input type='text' name='searchText' />
                <SearchLocationInput />
                <button onClick={props.submitSearchBar}>Submit</button>
            </form>
        </div>
    )
}

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    submitSearchBar(e) {
        e.preventDefault();
        console.log('button function is working');
    }

    handleLogout = (e) => {
        e.preventDefault();
        if(localStorage.user) {
            localStorage.removeItem('user');
        }
        MyApiClient.post('/logout', {})
            .then((res) => {
                if(res.data.redirect) {
                    window.location = '/';
                }
            })
    }

    render() {
        console.log(this.props.userInfo);
        return (
            <div>
                {Object.keys(this.props.userInfo).length === 0 ? 
                <div className='loginHeader'>
                    <a href='/login'>Login</a>
                    <a href='/signup'>Signup</a>
                </div> : <a href='/' onClick={this.handleLogout}>Logout</a>}
                <SearchBar submitSearchBar={this.submitSearchBar}>
                <SearchLocationInput />
                </SearchBar> 
            </div>
        )
    }
}