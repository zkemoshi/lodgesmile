import { Container, makeStyles } from '@material-ui/core';

import React, { useContext, useEffect } from 'react';
import authContext from '../../../context/auth/authContext';

const useStyle = makeStyles({
  box: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const classes = useStyle();
  const { token, loadUser } = useContext(authContext);

  useEffect(() => {
    if (token !== null) loadUser();
    // eslint-disable-next-line
  }, []);

  return <Container className={classes.box}>Welcome Home</Container>;
};

export default Home;
