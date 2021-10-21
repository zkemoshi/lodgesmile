import setAuthToken from './utils/setAuthToken';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthPages from './components/pages/AuthPages';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <Switch>
          <PrivateRoute path='/auth' component={AuthPages} />
          <Route exact path='/' component={SignIn} />
          <Route exact path='/register' component={SignUp} />
        </Switch>
      </AlertState>
    </AuthState>
  );
};

export default App;
