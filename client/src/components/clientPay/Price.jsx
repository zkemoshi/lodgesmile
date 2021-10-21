import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Change from './Change';
import { makeStyles, Paper } from '@material-ui/core';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';
import paymentContext from '../../context/payment/paymentContext';
import numeral from 'numeral';

const useStyles = makeStyles({
  box: {
    padding: '1rem',
    width: '350px',
    margin: '10px auto',
  },
  header: {
    backgroundColor: '#f2f2f2',
    textAlign: 'center',
  },
  content: {
    textAlign: 'center',
    lineHeight: '1.5',
    backgroundColor: 'ccc',
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1',
  },
});

const Price = ({ amount, scheme }) => {
  const classes = useStyles();
  const history = useHistory();
  const { setCurrent } = useContext(paymentContext);

  const [price, setPrice] = useState(amount);
  const [days, setDays] = useState(31);

  const getCount = (count) => {
    setPrice(amount * count);
    setDays(count * 31);
  };

  return (
    <Card raised className={classes.box}>
      <CardHeader
        title={`TZS ${numeral(price).format('0,0')}`}
        className={classes.header}
      />
      <CardContent className={classes.content}>
        <Paper elevation={0} className={classes.change}>
          <Typography>
            Months
            <Change getCount={getCount} />
          </Typography>
        </Paper>
        <Typography>Unlimited Receipts</Typography>
        <Typography>{scheme}</Typography>
        <Typography>24/7 Support</Typography>
        <Typography>Reports Access</Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button
          variant='outlined'
          color='primary'
          onClick={() => {
            setCurrent({ price, days, scheme });
            history.push('/auth/invoice');
          }}
        >
          Pay Now
        </Button>
      </CardActions>
    </Card>
  );
};

export default Price;
