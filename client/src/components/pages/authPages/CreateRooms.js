import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import StoreFilter from '../../components/stores/StoreFilter';
import authContext from '../../../context/auth/authContext';
import { Button } from '@material-ui/core';
import Attendants from '../../attendant/Attendants';
import RoomRegister from '../../rooms/RoomRegister';
import Rooms from '../../rooms/Rooms';

const useStyle = makeStyles({
  box: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
  },
});

const CreateRooms = () => {
  const classes = useStyle();
  const history = useHistory();
  const { token, loadUser } = useContext(authContext);

  useEffect(() => {
    if (token !== null) {
      loadUser();
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Container className={classes.box}>
      <Button
        variant='outlined'
        sx={{ margin: '0.5rem' }}
        onClick={() => history.push('/auth/home')}
      >
        Back
      </Button>
      <RoomRegister />
      {/* <StoreFilter /> */}
      <Rooms />
    </Container>
  );
};

export default CreateRooms;
