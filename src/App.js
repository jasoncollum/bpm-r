import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import Entries from './components/entries/entries.component';
import Days from './components/days/days.component';
import NewEntryForm from './components/new-entry-form/new-entry-form.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';

import CurrentUserContext from './contexts/current-user.context';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [entries, setEntries] = useState([]);

  // Auth Listener
  useEffect(() => {
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
  }, []);

  // Get Entries
  useEffect(() => {
    if (currentUser) {
      fetchEntries()
    }
  }, [currentUser]);

  const signUserOut = () => {
    auth.signOut();
    setCurrentUser(null);
  };

  const fetchEntries = async () => {
    const snapshot = await firestore.collection(`users/${currentUser.id}/entries`)
      .orderBy("date", "desc")
      .get();
    setEntries(snapshot.docs.map(doc => {
      let data = doc.data()
      return { ...data, id: doc.id }
    }));
  };

  return (
    <div className="App" >
      <CurrentUserContext.Provider value={currentUser}>
        <Header entries={entries} />

        <Switch>
          <Route exact path='/'
            render={() => <HomePage signUserOut={signUserOut} />}
          />
          <Route exact path='/entries'
            render={() =>
              currentUser ? (
                <Entries />
              ) : (
                  <Redirect to='/signin' />
                )}
          />
          <Route path='/days/'
            render={(props) =>
              currentUser ? (
                <Days sevenDays={props.location.state.sevenDays} entries={entries} />
              ) : (
                  <Redirect to='/signin' />
                )}
          />
          <Route exact path='/newentryform'
            render={() =>
              currentUser ? (
                <NewEntryForm />
              ) : (
                  <Redirect to='/signin' />
                )}
          />
          <Route
            exact path='/signin'
            render={() =>
              !currentUser ? (
                <SignIn />
              ) : (
                  <Redirect to='/entries' />
                )}
          />
          <Route path='/signup'
            render={() =>
              !currentUser ? (
                <SignUp />
              ) : (
                  <Redirect to='/entries' />
                )}
          />
        </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;