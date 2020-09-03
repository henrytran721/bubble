import React from 'react';
import axios from 'axios'; 
import {MyApiClient} from './my-api-client.js';
import '../sass/searchResults.scss';
import SearchLocationInput from './SearchLocationInput';

function SearchBar(props) {
    return (
        <div className='searchBar'>
        <form className='searchBar' name='searchBar' method='POST'>
            <div className='ogInputDiv'>
            <input className='ogInput' type='text' name='searchText' placeholder='Find' />
            </div>
            <SearchLocationInput />
            <button>
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

function SearchBox(props) {
    return(
        <div className='searchBoxDiv'>
            <h1 class='searchRText'>Search Results for '{props.locationAndSearch}'</h1>
            {props.searchResults.map((res) => {
                var photoRef;
                try {
                    if(res.photos[0] !== undefined) {
                        photoRef = res.photos[0].photo_reference;
                    } else {
                        photoRef = '';
                    }
                } catch(err){};
                return (
                    <div className='searchBox' key={res.id}>
                    {res.photos !== undefined ? <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.REACT_APP_GOOGLE_API}`} /> : <img src='https://lh3.googleusercontent.com/proxy/Mh1jHJMiGZChykY-K8IMMUXiI4P2sHq3ltal001IL11-3s8xysRALJmnAoJc4NBN1SOQbZWaNW8CGrW2Zur6PljS42RgBsE3S49eTBvsVk3R1DI_URrrATsrxdjlqkFam9mbMz1zbQ' />}
                    <div className='searchInfo'>
                    <h1>{res.name}</h1>
                    {
                        (() => {
                            if(res.opening_hours) {
                                if(res.opening_hours.open_now !== undefined) {
                                    console.log(res.opening_hours.open_now);
                                    if(res.opening_hours.open_now) {
                                        return <p className='open'>Open</p>
                                    } else {
                                        return <p className='closed'>Closed</p>
                                    }
                                }
                            }
                        })()
                    }
                    <p>{res.formatted_address}</p>
                    </div>
                </div>
                )
            })}
        </div>
    )
}

function Map(props) {
    return (
        <div>MAP</div>
    )
}

export default class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            searchText: '',
            locationAndSearch: ''
        }
    }

    componentDidMount() {
        if(localStorage.homepageSearch) {
            var searchText = localStorage.homepageSearch;
            MyApiClient
                .post('/searchQuery', {url: localStorage.homepageSearch})
                .then((res) => {
                    this.setState({
                        searchResults: res.data
                    })
                })
        }
        if(localStorage.searchString) {
            this.setState({
                locationAndSearch: localStorage.searchString
            })
        }
    }

    render() {
        return(
            <div>
                <div className='searchResultsContainer'>                    
                    <div>
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
                    </div>
                        <SearchBar 
                        //submitSearchBar={this.submitSearchBar}
                        //handleOnChange={this.handleOnChange}
                        >
                        <SearchLocationInput />
                        </SearchBar>
                </div>
                <div class='searchResultsBody'>
                    <SearchBox 
                    locationAndSearch={this.state.locationAndSearch}
                    searchResults = {this.state.searchResults}
                    />
                    <Map/>
                </div>
            </div>
        )
    }
}