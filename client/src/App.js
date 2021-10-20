import setAuthToken from './utils/setAuthToken';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <Switch>
      <Route exact path='/' component={SignIn} />
      <Route exact path='/register' component={SignUp} />
    </Switch>
  );
};

export default App;
