import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import Entries from './components/entries/entries.component';
import NewEntryForm from './components/new-entry-form/new-entry-form.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user.context';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    };

    this.signUserOut = this.signUserOut.bind(this);
  }

  signUserOut() {
    auth.signOut();
    localStorage.removeItem('currentUser');
    this.setState({ currentUser: null });
  }

  unsubscribeFromAuth = null;

  componentWillMount() {
    localStorage.getItem('currentUser') && this.setState({
      currentUser: JSON.parse(localStorage.getItem('currentUser'))
    })
  }

  componentDidMount() {
    if (!localStorage.getItem('currentUser')) {
      this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
        if (userAuth) {
          const userRef = await createUserProfileDocument(userAuth);

          userRef.onSnapshot(snapShot => {
            this.setState({
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            });
          });
        }

        this.setState(userAuth);

      });
    } else {
      console.log('Using data from localStorage')
    }
  }

  componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('currentUser', JSON.stringify(nextState.currentUser));
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div className="App" >
        <CurrentUserContext.Provider value={this.state.currentUser}>
          <Header />

          <Switch>
            <Route exact path='/'
              render={() => <HomePage signUserOut={this.signUserOut} />}
            />
            <Route exact path='/entries'
              render={() =>
                !this.state.currentUser ? (
                  <Redirect to='/signin' />
                ) : (
                    <Entries />
                  )}
            />
            <Route exact path='/newentryform'
              render={() =>
                !this.state.currentUser ? (
                  <Redirect to='/signin' />
                ) : (
                    <NewEntryForm />
                  )}
            />
            <Route
              exact path='/signin'
              render={() =>
                this.state.currentUser ? (
                  <Redirect to='/entries' />
                ) : (
                    <SignIn />
                  )}
            />
            <Route path='/signup'
              render={() =>
                this.state.currentUser ? (
                  <Redirect to='/entries' />
                ) : (
                    <SignUp />
                  )}
            />
          </Switch>
        </CurrentUserContext.Provider>
      </div>
    );
  }
}

export default App;