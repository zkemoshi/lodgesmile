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
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
import Change from './Change';

const useStyles = makeStyles({
  card: {
    width: '280px',
    marginTop: '1rem',
  },
});

const BookForm = () => {
  const { addBooking, current, clearCurrent, error, clearErrors } =
    useContext(bookContext);
  const { setAlert } = useContext(alertContext);

  const [book, setBooking] = useState({
    name: '',
    number: '',
    price: '',
    checkOut: null,
    vacancy: false,
  });

  const [days, setDays] = useState(1);

  const date = moment().add(days, 'day').format('DD-MM-YYYY 10:00:00');
  console.log(date);
  const [checkout, setCheckOut] = useState(date);

  useEffect(() => {
    // if (current !== null) {
    //   setBooking({ ...current, vacancy: false });
    // } else {
    //   setBooking({
    //     name: '',
    //     number: '',
    //     price: '',
    //     checkOut: null,
    //     vacancy: false,
    //   });
    // }
    if (error === 'Room Already Booked') {
      setAlert(error, 'danger', 2000);
      clearErrors();
    }
  }, [current, error, days]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(book);
    clearAll();
    setAlert('Booked Successfully', 'danger', 2000);
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
  return (
    <Fragment>
      {true && (
        <Card raised className={classes.card}>
          <CardContent>
            <Typography align='center' variant='h6'>
              Booking...
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
              How many Days:
              <Change getCount={getCount} />
            </Typography>
            <Typography variant='body2'>
              Check-Out Date:
              <br />
              {checkout}
            </Typography>
          </CardContent>
          <CardActions>
            <Grid container>
              <Grid item xs={6}>
                <Button size='small'>Cancel</Button>
              </Grid>
              <Grid item xs={6}>
                <Button size='small' color='primary'>
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
