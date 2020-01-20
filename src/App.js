import React, { useState } from 'react';
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

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUserOut = () => {
    auth.signOut();
    setCurrentUser(null);
  }

  auth.onAuthStateChanged(async userAuth => {
    if (userAuth) {
      const userRef = await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot => {
        setCurrentUser(
          {
            id: snapShot.id,
            ...snapShot.data()
          }
        )
      });
    }
  });

  return (
    <div className="App" >
      <CurrentUserContext.Provider value={currentUser}>
        <Header />

        <Switch>
          <Route exact path='/'
            render={() => <HomePage signUserOut={signUserOut} />}
          />
          <Route exact path='/entries'
            render={() =>
              !currentUser ? (
                <Redirect to='/signin' />
              ) : (
                  <Entries />
                )}
          />
          <Route exact path='/newentryform'
            render={() =>
              !currentUser ? (
                <Redirect to='/signin' />
              ) : (
                  <NewEntryForm />
                )}
          />
          <Route
            exact path='/signin'
            render={() =>
              currentUser ? (
                <Redirect to='/entries' />
              ) : (
                  <SignIn />
                )}
          />
          <Route path='/signup'
            render={() =>
              currentUser ? (
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

export default App;