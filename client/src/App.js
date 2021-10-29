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
import AttendantState from './context/attendant/AttendantState';
import Privacy from './components/pages/Privacy';
import Terms from './components/pages/Terms';
import RoomState from './context/room/RoomState';
import BookState from './context/booking/BookState';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  return (
    <AuthState>
      <AlertState>
        <PaymentState>
          <AdminState>
            <AttendantState>
              <RoomState>
                <BookState>
                  <Switch>
                    <PrivateRoute path='/auth' component={AuthPages} />
                    <PrivateRoute path='/admin' component={Dashboard} />
                    <Route exact path='/' component={SignIn} />
                    <Route exact path='/register' component={SignUp} />
                    <Route exact path='/privacy' component={Privacy} />
                    <Route exact path='/terms' component={Terms} />
                  </Switch>
                </BookState>
              </RoomState>
            </AttendantState>
          </AdminState>
        </PaymentState>
      </AlertState>
    </AuthState>
  );
};

export default App;
