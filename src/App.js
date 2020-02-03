import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Header from './components/header/header.component';

import HomePage from './pages/homepage/homepage.component';
import Entries from './components/entries/entries.component';
import Days from './components/days/days.component';
import NewEntryForm from './components/new-entry-form/new-entry-form.component';
import EditEntryForm from './components/edit-entry-form/edit-entry-form.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';
import ErrorMessage from './components/error-message/error-message.component';

import { auth, createUserProfileDocument, firestore } from './firebase/firebase.utils';

import BpmContext from './contexts/bpm.context';

import './App.css';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [entries, setEntries] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Auth Listener
  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        const snapShot = await userRef.get()
        setCurrentUser(
          {
            id: snapShot.id,
            ...snapShot.data()
          }
        )
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
    try {
      setIsLoading(true)
      const snapshot = await firestore.collection('entries')
        .where("userId", "==", currentUser.id)
        .orderBy("date", "desc")
        .get();

      setEntries(snapshot.docs.map(doc => {
        let data = doc.data()
        return { ...data, id: doc.id }
      }));
      setIsLoading(false);
    } catch (error) {
      setHasError(true);
    }
  };

  return (
    <div className="App" >
      <BpmContext.Provider value={{ currentUser, entries, fetchEntries }}>
        <Header entries={entries} />
        {hasError && <ErrorMessage message='Unable to fetch bpm entries' />}

        <Switch>
          <Route exact path='/'
            render={() => <HomePage signUserOut={signUserOut} isLoading={isLoading} />}
          />
          <Route exact path='/entries'
            render={() =>
              currentUser ? (
                <Entries isLoading={isLoading} />
              ) : (
                  <Redirect to='/signin' />
                )}
          />
          <Route exact path='/days'
            render={(props) =>
              currentUser && props.location.state ? (
                <Days days={props.location.state.days} />
              ) : (
                  <Redirect to='/entries' />
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
          <Route exact path='/editentryform/:id'
            render={(props) => {
              if (currentUser) {
                let entry = entries.find(entry =>
                  entry.id === props.match.params.id)
                return < EditEntryForm entry={entry} />
              } else {
                return <Redirect to='/signin' />
              }
            }
            }
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
      </BpmContext.Provider>
    </div>
  );
}

export default App;