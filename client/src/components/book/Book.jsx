import React, { useContext, useEffect } from 'react';
import {
  CircularProgress,
  Typography,
  Button,
  Grid,
  Card,
  CardHeader,
  Paper,
} from '@mui/material';
import roomContext from '../../context/room/roomContext';
import bookContext from '../../context/booking/bookContext';
import alertContext from '../../context/alert/alertContext';
import moment from 'moment';
import BookItem from './BookItem';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5,1fr)',
    gap: 15,
  },
  card: {
    padding: '0.5rem',
    marginTop: '1rem',
  },
  btn: {
    textDecoration: 'none',
  },
  paper: {
    marginTop: '1rem',
    padding: '1rem',
  },
});

const Book = () => {
  const classes = useStyles();
  const { setAlert } = useContext(alertContext);
  const { rooms, getRooms, loading } = useContext(roomContext);
  const { getBooking, current } = useContext(bookContext);

  useEffect(() => {
    getRooms();
    getBooking();
    //eslint-disable-next-line
  }, [current, setAlert]);

  if (rooms !== null && rooms.length === 0 && !loading) {
    return (
      <Paper align='center' className={classes.paper}>
        <Typography align='center' sx={{ mb: 3 }}>
          Currently no rooms Created for this Lodge
        </Typography>
        <Button variant='outlined'>
          <Link to='/auth/rooms' className={classes.btn}>
            Click to add rooms
          </Link>
        </Button>
      </Paper>
    );
  }
  return (
    <Card className={classes.card}>
      <CardHeader title='Select a room to Book' />
      <Grid spacing={3} className={classes.grid}>
        {rooms !== null && !loading ? (
          <>
            {rooms.map((room) => (
              <BookItem key={room._id} room={room} />
            ))}
          </>
        ) : (
          <CircularProgress />
        )}
      </Grid>
    </Card>
  );
};

export default Book;
