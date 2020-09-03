import React from 'react';
import axios from 'axios'; 
import SearchLocationInput from './SearchLocationInput';
import {MyApiClient} from './my-api-client.js';
import '../sass/homepage.scss';
function SearchBar(props) {
    return(
        <div className='searchBar'>
            <form className='searchBar' name='searchBar' method='POST'>
                <div className='ogInputDiv'>
                <input className='ogInput' type='text' name='searchText' onChange={props.handleOnChange} placeholder='Find' />
                </div>
                <SearchLocationInput />
                <button onClick={props.submitSearchBar}>
                    <svg width="25px" height="30px" viewBox="0 0 37 35" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <title>Group 4</title>
                        <desc>Created with Sketch.</desc>
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Desktop" transform="translate(-797.000000, -408.000000)" stroke="#FFFFFF">
                                <g id="Group-2" transform="translate(173.000000, 394.000000)">
                                    <g id="Group-4" transform="translate(624.000000, 14.000000)">
                                        <ellipse id="Oval" cx="10.5" cy="10" rx="10" ry="9.5"></ellipse>
                                        <path d="M18,17 C18,17 24.3333333,22.6666667 37,34" id="Line-2" strokeLinecap="round"></path>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </button>
            </form>
        </div>
    )
}

export default class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
            searchText: '',
        }
    }

    componentDidMount() {
        if(localStorage.user) {
            if(localStorage.user.length > 4) {
                var userInfo = JSON.parse(localStorage.user);
                console.log(userInfo.zipcode);
                if(userInfo.zipcode) {
                    var location;
                    var googleMaps = `https://maps.googleapis.com/maps/api/geocode/json?address=${userInfo.zipcode}&key=${process.env.REACT_APP_GOOGLE_API}`;
                    fetch(googleMaps)
                        .then((response) => {
                           return response.json();
                        })
                        .then((data) => {
                            location = data.results[0].address_components[1].long_name + '+' + data.results[0].address_components[3].long_name;
                        })
                        .then(() => {
                            var restaurantSearch = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+${location}&key=${process.env.REACT_APP_GOOGLE_API}`;
                            MyApiClient
                                .post('/', {url: restaurantSearch})
                                .then((res) => {
                                    var places = res.data;
                                    places.sort((a, b) => {
                                        return b.rating - a.rating;
                                    })
                                    var placesArr = [];
                                    for(let i = 0; i < 3; i++) {
                                        placesArr.push(places[i]);
                                    }
                                    this.setState({
                                        places: placesArr,
                                    })
                                })
                        })
                }
            }
        }
    }

    submitSearchBar = (e) => {
        e.preventDefault();
        var location = document.querySelector('.searchLocation').value;
        var locationAndSearch =  this.state.searchText + ' in ' + location;
        // format our location and string search
        location = location.split(', ').join('+');
        var stringQuery = this.state.searchText.trim().split(' ').join('+');
        var searchStr = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${stringQuery}+${location}&key=${process.env.REACT_APP_GOOGLE_API}`;
        if(location && stringQuery) {
            localStorage.removeItem('homepageSearch');
            localStorage.removeItem('searchString');
            localStorage.setItem('homepageSearch', searchStr);
            localStorage.setItem('searchString', locationAndSearch);
            window.location = '/searchresults';
        }
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

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        console.log(this.state.searchText);
        return (
            <div>
            <div className='homepageContainer'>
                {Object.keys(this.props.userInfo).length === 0 ? 
                <div className='loginHeader'>
                <a href='/login'>Login</a>
                <a href='/signup'>Signup</a>
                </div> : <div className='loginHeader'><a href='/' onClick={this.handleLogout}>Logout</a></div>}
                <svg width="245px" height="251px" viewBox="0 0 245 251" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Desktop" transform="translate(-389.000000, -73.000000)">
                    <g id="Group" transform="translate(389.000000, 73.000000)">
                    <text id="BUBBLE" fill="#FFA6A6" fontFamily="Roboto-Light, Roboto" fontSize="50" fontWeight="300" letterSpacing="-0.25">
                    <tspan x="33" y="142">BUBBLE</tspan>
                    </text>
                    <ellipse id="Oval" stroke="#FFA6A6" strokeWidth="3" cx="122.5" cy="125.5" rx="121" ry="124"></ellipse>
                    <path d="M126,239 C185.646753,239 234,188.184319 234,125.5" id="Oval-Copy-3" stroke="#FFA6A6" strokeWidth="3" strokeLinecap="round"></path>
                    <path d="M47.1867647,49 C29.1044668,68.9246673 18,95.9199007 18,125.643932" id="Oval-Copy-2" stroke="#FFA6A6" strokeWidth="3" strokeLinecap="round"></path>
                    <path d="M94,19 C81.7316738,22.656679 70.5278956,30.1704689 61,38" id="Oval-Copy" stroke="#FFA6A6" strokeWidth="3" strokeLinecap="round"></path>
                    </g>
                    </g>
                    </g>
                </svg>
                <SearchBar 
                submitSearchBar={this.submitSearchBar}
                handleOnChange={this.handleOnChange}
                >
                <SearchLocationInput />
                </SearchBar>
                <div className='bubbleText'><p>Find restaurants in your bubble</p></div>
            </div>
            <div className='backgroundVector'>
            <svg width="2129px" height="1066px" viewBox="0 0 2129 1066" version="1.1" xmlns="http://www.w3.org/2000/svg">
                <title>Rectangle Copy 3</title>
                <desc>Created with Sketch.</desc>
                <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <path d="M0,0 C267.713064,44.7822211 445.517867,96.2623965 533.41441,154.440526 C580.983969,185.926496 593.941455,334.110264 629.545205,374.913482 C729.937506,489.966783 1183.0088,154.440526 1733.97071,180.849333 C1858.79759,186.832558 1990.47402,214.174216 2129,262.874308 L2129,1066 L0,1066 L0,0 Z" id="Rectangle-Copy-3" fill="#F2F4FF"></path>
                </g>
            </svg>
            <div className='popularDiv'>
            <h2 className='popularText'>Most Popular Restaurants In Your Area</h2>
            <div className='recommendedBoxes'>
                {this.state.places.map((place) => {
                    var photoRef = place.photos[0].photo_reference;
                    var rating = (place.rating / 5) * 100;
                    rating = rating + '%';
                    return (
                        <div className='rBox' key={place.name}>
                            <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.REACT_APP_GOOGLE_API}`} />
                            <h2>{place.name}</h2>
                            <div className='rating'>
                                <div className="star-ratings-css">
                                <div className="star-ratings-css-top" style={{width: rating}}><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                                <div className="star-ratings-css-bottom"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
                                </div>
                                <p>{place.user_ratings_total}</p>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div> 
            </div>
            </div>
        )
    }
}