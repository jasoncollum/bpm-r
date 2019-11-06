import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import { auth } from './firebase/firebase.utils';

import './App.css';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({ currentUser: user });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App" >
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path={'/'} component={HomePage} />
          <Route path={'/signin'} component={SignIn} />
          <Route path={'/signup'} component={SignUp} />
        </Switch>
      </div>
    );
  }
}

export default App;
