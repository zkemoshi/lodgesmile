import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Invoice from '../clientPay/Invoice';
import Layout from '../layout/Layout';
import Home from './authPages/Home';
import Pricing from './authPages/Pricing';
import Account from './authPages/Account';
import CreateRooms from './authPages/CreateRooms';

const AuthPages = ({ match }) => {
  return (
    <Layout>
      <Switch>
        <Route exact path={`${match.url}/home`} component={Home} />
        <Route exact path={`${match.url}/rooms`} component={CreateRooms} />
        <Route exact path={`${match.url}/attendant`} component={Account} />
        <Route exact path={`${match.url}/pricing`} component={Pricing} />
        <Route exact path={`${match.url}/invoice`} component={Invoice} />
      </Switch>
    </Layout>
  );
};

export default AuthPages;
