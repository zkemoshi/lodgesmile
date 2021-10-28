import React, { useContext, useEffect } from 'react';
import { CircularProgress, Stack, Typography } from '@mui/material';
import roomContext from '../../context/room/roomContext';
import bookContext from '../../context/booking/bookContext';
import alertContext from '../../context/alert/alertContext';
import moment from 'moment';
import BookItem from './BookItem';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  card: {
    display: 'grid',
  },
});

const Book = () => {
  const classes = useStyles();
  const { setAlert } = useContext(alertContext);
  const { rooms, getRooms, loading } = useContext(roomContext);
  const { getBooking, getCurrentBooking, current } = useContext(bookContext);

  useEffect(() => {
    getRooms();
    getBooking();
    // getCurrentBooking(today);
    //eslint-disable-next-line
  }, [current, setAlert]);

  if (rooms !== null && rooms.length === 0 && !loading) {
    return <h4>Please add rooms</h4>;
  }
  return (
    <Stack direction='row' spacing={2} className={classes.card}>
      {rooms !== null && !loading ? (
        <>
          {rooms.map((room) => (
            <BookItem key={room._id} room={room} />
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </Stack>
  );
};

export default Book;
