import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import SignIn from './components/sign-in/sign-in.component';
import SignUp from './components/sign-up/sign-up.component';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={'/'} component={HomePage} />
        <Route path={'/signin'} component={SignIn} />
        <Route path={'/signup'} component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;
