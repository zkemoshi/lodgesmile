import { makeStyles } from '@material-ui/core';
import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import paymentContext from '../../context/payment/paymentContext';
import authContext from '../../context/auth/authContext';
import moment from 'moment';
import numeral from 'numeral';

const useStyles = makeStyles({
  box: {
    marginBottom: '1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
  small: {
    fontSize: '2rem',
    textAlign: 'right',
  },
  bill: {
    marginTop: '1rem',
    padding: '1rem',
  },
  date: {
    marginTop: '1rem',
    padding: '.5rem',
  },
  grid: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  title: {
    padding: '.5rem',
    backgroundColor: '#000',
    color: '#fff',
  },
  total: {
    marginTop: '3rem',
    marginBottom: '3rem',
  },
});

const Invoice = () => {
  const classes = useStyles();
  const { current, addPayment } = useContext(paymentContext);
  const { user } = useContext(authContext);
  const history = useHistory();

  useEffect(() => {
    if (current === null) history.push('/auth/pricing');
  }, []);

  return (
    <Container>
      <Grid container className={classes.header}>
        <Grid item xs={12} md={2}>
          <Typography variant='h5'></Typography>
        </Grid>
        <Grid item xs={12} md={10} align='right'>
          <Typography variant='h3'>Proforma Invoice</Typography>
          <Typography align='right' variant='subtitle1'>
            #88
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.box}>
        <Grid item xs={12} md={4}>
          <Paper elevation={0}>
            <Typography>ZC Technologies</Typography>
            <Typography>TIN: 133-234-55</Typography>
            <Typography>MOB: +255 718 137 722</Typography>
          </Paper>

          <Paper variant='outlined' className={classes.bill}>
            <Typography variant='h6'>Bill To:</Typography>
            <Typography>{user && `${user.business}`}</Typography>
            <Typography>{user && `Tin: ${user.tin}`}</Typography>
            <Typography>{user && `Email: ${user.email}`}</Typography>
            <Typography>{user && `Mobile: ${user.phone}`}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container className={classes.date}>
            <Grid item xs={6} className={classes.grid}>
              <div>
                <Typography>Date:</Typography>
                <Typography>Payment Terms:</Typography>
                <Typography>Due Date:</Typography>
                <Typography>Balance Due:</Typography>
              </div>
            </Grid>
            <Grid item xs={6} className={classes.grid}>
              <div>
                <Typography>{moment().format('MMM Do YY')}</Typography>
                <Typography>Online</Typography>
                <Typography>{moment().format('MMM Do YY')}</Typography>
                <Typography>
                  {current && `TZS ${numeral(current.price).format('0,0')}`}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={classes.title}>Item</Typography>
          <Typography>
            {current && `${current.days} days subscription for Efd`}{' '}
          </Typography>
        </Grid>
        <Grid item xs={2} align='center'>
          <Typography className={classes.title}>Qty</Typography>
          <Typography>1</Typography>
        </Grid>
        <Grid item xs={4} align='right'>
          <Typography className={classes.title}>Amount</Typography>
          <Typography>
            {current && `TZS ${numeral(current.price).format('0,0')}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container className={classes.total}>
        <Grid item xs={8} align='right'>
          <Typography variant='subtitle2' sx={{ fontWeight: 'bold' }}>
            Total
          </Typography>
        </Grid>
        <Grid item xs={4} align='right'>
          <Typography variant='subtitle2'>
            {current && `TZS ${numeral(current.price).format('0,0')}`}
          </Typography>
        </Grid>
      </Grid>
      <Typography variant='paragraph'>
        Terms and Condition as described on www.efdrisiti.com
      </Typography>
      <Grid align='center' sx={{ padding: '1rem' }}>
        <Button
          onClick={() => history.push('/auth/pricing')}
          color='primary'
          variant='contained'
          sx={{ margin: '1rem' }}
        >
          Back
        </Button>
        <Button
          variant='outlined'
          onClick={() => {
            addPayment(current);
            history.push('/auth/home');
          }}
        >
          Pay Now
        </Button>
      </Grid>
    </Container>
  );
};

export default Invoice;
