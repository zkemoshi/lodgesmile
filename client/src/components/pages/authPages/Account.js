import { Container } from '@mui/material';
import { makeStyles } from '@material-ui/styles';
import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// import StoreFilter from '../../components/stores/StoreFilter';
import authContext from '../../../context/auth/authContext';
import { Button } from '@material-ui/core';
import AttendantRegister from '../../attendant/AttendantRegister';
import Attendants from '../../attendant/Attendants';

const useStyle = makeStyles({
  box: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    maxWidth: '500px',
  },
});

const Accounts = () => {
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
      <AttendantRegister />
      {/* <StoreFilter /> */}
      <Attendants />
    </Container>
  );
};

export default Accounts;
