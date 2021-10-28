import { CircularProgress, Typography } from '@mui/material';
import React, { Fragment, useContext, useEffect } from 'react';
import AttendantContext from '../../context/attendant/attendantContext';
import AttendantItem from './AttendantItem';

const Attendants = () => {
  const attendantContext = useContext(AttendantContext);

  const { attendants, getAttendants, loading } = attendantContext;

  useEffect(() => {
    getAttendants();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      {attendants !== null && !loading ? (
        <>
          <Typography align='center'> Attendant Lists </Typography>

          {attendants.map((attendant) => (
            <AttendantItem key={attendant._id} attendant={attendant} />
          ))}
        </>
      ) : (
        <CircularProgress />
      )}
    </Fragment>
  );
};

export default Attendants;
