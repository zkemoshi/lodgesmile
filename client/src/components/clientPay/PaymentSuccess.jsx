import {
  Button,
  Container,
  makeStyles,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import authContext from '../../context/auth/authContext';
import paymentContext from '../../context/payment/paymentContext';
import moment from 'moment';

const useStyle = makeStyles({
  box: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  payment: {
    padding: '1rem',
    textAlign: 'center',
  },
  link: {
    textDecoration: 'none',
  },
});

const PaymentSuccess = () => {
  const classes = useStyle();
  const { user, loadUser } = useContext(authContext);
  const { current } = useContext(paymentContext);

  useEffect(() => {
    // Loading user
    loadUser();
  }, [current]);

  return (
    <Container className={classes.box}>
      <Paper className={classes.payment}>
        <Typography variant='h4'>Payment Done Successfully</Typography>
        <br />
        <Typography variant='h6'>
          Your Have{' '}
          {user && moment(user.expiredAt, 'DD-MM-YYYY').diff(moment(), 'days')}{' '}
          Active Days.
        </Typography>
        <br />
        <Button variant='outlined' color='primary'>
          <Link to='/auth/home' className={classes.link}>
            Go Home
          </Link>
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccess;
