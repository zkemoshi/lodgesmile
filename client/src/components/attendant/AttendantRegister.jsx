import { makeStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AttendantContext from '../../context/attendant/attendantContext';
import generator from 'generate-password';
import Alerts from '../layout/Alerts';

const useStyle = makeStyles({
  box: {
    maxWidth: '400px',
    margin: '1rem auto',
  },
});
const btnSytle = {
  margin: '8px 0',
};

const AttendantRegister = (props) => {
  const classes = useStyle();
  const alertContext = useContext(AlertContext);
  const attendantContext = useContext(AttendantContext);

  const { setAlert } = alertContext;
  const {
    current,
    clearCurrent,
    updateAttendant,
    attendants,
    addAttendant,
    error,
    clearErrors,
  } = attendantContext;

  const [user, setUser] = useState({
    name: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    if (error === 'Username already exists') {
      setAlert(error, 'error', 2000);
      clearErrors();
    }
    if (error === 'You have reached your Account Limit') {
      setAlert(error, 'error', 2000);
      clearErrors();
    }
    if (current !== null) {
      setUser(current);
    } else {
      setUser({
        name: '',
        username: '',
        password: '',
      });
    }
    //eslint-disable-next-line
  }, [error, current, attendants]);
  const { name, username, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (current !== null) {
      updateAttendant(user);
    } else {
      addAttendant({
        name,
        username,
        password,
      });
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className={classes.box}>
      <Alerts />
      <Typography align='center'> Add Attendant</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant='standard'
          fullWidth
          type='text'
          name='name'
          value={name}
          required
          id='standard-basic'
          label='Name'
          placeholder='Enter account name'
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />

        <TextField
          variant='standard'
          fullWidth
          id='standard-basic'
          label='Username'
          name='email'
          value={username}
          required
          placeholder='Enter username'
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />

        <TextField
          variant='standard'
          fullWidth
          id='standard-basic'
          label='Password'
          name='password'
          value={password}
          required
          placeholder='Enter Password'
          minLength='6'
          onFocus={(e) =>
            setUser({
              ...user,
              password: generator.generate({
                length: 6,
                numbers: true,
              }),
            })
          }
        />

        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
          style={btnSytle}
        >
          {current ? 'Update Attendant' : 'Register New Attendant'}
        </Button>
        {current && (
          <div>
            <Button
              type='submit'
              color='primary'
              variant='contained'
              fullWidth
              style={btnSytle}
              onClick={clearAll}
            >
              Clear
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default AttendantRegister;
