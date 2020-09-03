import React from 'react';
import './App.css';
import Homepage from './views/Homepage';
import Signup from './views/Signup';
import Login from './views/Login';
import SearchResults from './views/SearchResults';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    };
  }
  
  componentDidMount() {
    if(localStorage.user) {
      if(localStorage.user.length > 4) {
      let userInfo = JSON.parse(localStorage.user);
      this.setState({userInfo})
      }
  };
  }

  render() {
  return (
    <div className="App">
    <Router>
      <Switch>
      <Route path='/searchresults'>
          <SearchResults />
        </Route>
        <Route path='/signup'>
          <Signup />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/'>
          <Homepage userInfo={this.state.userInfo} />
        </Route>
      </Switch>
    </Router>
    </div>
  )};
}

export default App;
