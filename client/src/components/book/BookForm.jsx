import React, { Fragment, useContext, useState, useEffect } from 'react';
import bookContext from '../../context/booking/bookContext';
import alertContext from '../../context/alert/alertContext';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Grid,
  Button,
  Avatar,
  Stack,
} from '@mui/material';
import { green, red } from '@mui/material/colors';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import Change from './Change';

const useStyles = makeStyles({
  card: {
    width: '280px',
    marginTop: '1rem',
  },
  booked: {
    padding: '2rem',
    marginTop: '1rem',
  },
});

const BookForm = () => {
  const { addBooking, current, clearCurrent, clearErrors } =
    useContext(bookContext);
  const { setAlert } = useContext(alertContext);

  const [days, setDays] = useState(1);
  const date = moment().add(days, 'day').format('DD-MM-YYYY 10:00:00');
  const [checkout, setCheckOut] = useState(date);
  console.log(current);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking({ ...current, checkout });
    clearAll();
    setAlert(`Room ${current.number} booked successfully`, 'success', 2000);
    clearErrors();
  };

  const clearAll = () => {
    clearCurrent();
  };

  const getCount = (count) => {
    setDays(count);
    setCheckOut(date);
  };
  const classes = useStyles();

  if (current && !moment(current.checkout, 'DD-MM-YYYY hh:mm:ss').isBefore()) {
    setTimeout(() => {
      clearAll();
    }, 3000);
    return (
      <Card raised className={classes.booked} sx={{ bgcolor: red[200] }}>
        <Typography>
          Room {current.number} is already Booked for {days} days until{' '}
          {checkout}
        </Typography>
      </Card>
    );
  }
  return (
    <Fragment>
      {current && moment(current.checkout, 'DD-MM-YYYY hh:mm:ss').isBefore() && (
        <Card raised className={classes.card}>
          <CardContent>
            <Typography align='center' variant='h6'>
              Booking Details
            </Typography>
            <Typography
              sx={{ fontSize: 20 }}
              color='text.secondary'
              gutterBottom
            >
              Room No. {current && current.number}
            </Typography>

            <Typography sx={{ mb: 1.5, fontSize: 20 }} color='text.secondary'>
              Room Name: {current && current.name}
            </Typography>
            <Typography sx={{ mb: 1.5, fontSize: 20 }} color='text.secondary'>
              <Stack direction='row' spacing={2} sx={{ mb: 1.5 }}>
                <span>Days</span>
                <Avatar sx={{ bgcolor: green[500] }} variant='rounded'>
                  {days}
                </Avatar>
              </Stack>
              <Change getCount={getCount} />
            </Typography>
            <Typography align='center' variant='body1'>
              Check-Out
              <br />
            </Typography>
            <Typography variant='h5' align='center'>
              {checkout}{' '}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container align='center' sx={{ mb: 1.5 }}>
              <Grid item xs={6}>
                <Button
                  size='small'
                  variant='outlined'
                  color='secondary'
                  onClick={clearAll}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  size='small'
                  variant='outlined'
                  color='primary'
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      )}
    </Fragment>
  );
};
export default BookForm;
