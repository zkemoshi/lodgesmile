import { Container, makeStyles } from '@material-ui/core';

import React, { useContext, useEffect } from 'react';
import authContext from '../../../context/auth/authContext';
import paymentContext from '../../../context/payment/paymentContext';
import Book from '../../book/Book';
import BookForm from '../../book/BookForm';

const useStyle = makeStyles({
  box: {
    // minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Home = () => {
  const classes = useStyle();
  const { token, loadUser } = useContext(authContext);
  const { current } = useContext(paymentContext);

  useEffect(() => {
    if (token !== null) loadUser();
    // eslint-disable-next-line
  }, [current]);

  return (
    <Container className={classes.box}>
      <Book />
      <BookForm />
    </Container>
  );
};

export default Home;
