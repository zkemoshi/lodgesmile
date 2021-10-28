import { CircularProgress, Typography } from '@mui/material';
import React, { Fragment, useContext, useEffect } from 'react';
import roomContext from '../../context/room/roomContext';
import AttendantItem from './RoomsItems';

const Rooms = () => {
  const { rooms, getRooms, loading } = useContext(roomContext);

  useEffect(() => {
    getRooms();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {rooms !== null && !loading ? (
        <>
          <Typography align='center'> List of Rooms </Typography>

          {rooms.map((room) => (
            <AttendantItem key={room._id} room={room} />
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default Rooms;
