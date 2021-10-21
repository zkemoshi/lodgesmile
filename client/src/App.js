import setAuthToken from './utils/setAuthToken';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import PrivateRoute from './components/routing/PrivateRoute';
import AuthPages from './components/pages/AuthPages';
import PaymentState from './context/payment/PaymentState';
import Dashboard from './components/admin/Dashboard';
import AdminState from './context/admin/AdminState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <PaymentState>
          <AdminState>
            <Switch>
              <PrivateRoute path='/auth' component={AuthPages} />
              <PrivateRoute path='/admin' component={Dashboard} />
              <Route exact path='/' component={SignIn} />
              <Route exact path='/register' component={SignUp} />
            </Switch>
          </AdminState>
        </PaymentState>
      </AlertState>
    </AuthState>
  );
};

export default App;
