import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  Grid,
  Box,
  Container,
  Typography,
  InputAdornment,
  IconButton,
  FormControl,
  OutlinedInput,
  InputLabel,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import alertContext from '../../context/alert/alertContext';
import authContext from '../../context/auth/authContext';
import Alerts from '../layout/Alerts';

const theme = createTheme();

const SignUp = () => {
  const { setAlert } = useContext(alertContext);
  const { register, error, clearErrors, isAuthenticated } =
    useContext(authContext);
  const history = useHistory();

  // Use Effects
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/auth/home');
    }
    if (error === 'User already exists') {
      setAlert(error, 'error', 2000);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  const [formInput, setFormInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    showPassword: false,
  });

  const { firstName, lastName, email, phone, password, showPassword } =
    formInput;

  const handleSubmit = (e) => {
    e.preventDefault();
    register({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
  };

  const handleClickShowPassword = () => {
    setFormInput({
      ...formInput,
      showPassword: !showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Alerts />
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box
            component='form'
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  value={firstName}
                  onChange={(e) =>
                    setFormInput({ ...formInput, firstName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  value={lastName}
                  onChange={(e) =>
                    setFormInput({ ...formInput, lastName: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={email}
                  onChange={(e) =>
                    setFormInput({ ...formInput, email: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='phone'
                  label='Mobile'
                  name='phone'
                  value={phone}
                  onChange={(e) =>
                    setFormInput({ ...formInput, phone: e.target.value })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl variant='outlined' sx={{ width: '100%' }}>
                  <InputLabel htmlFor='outlined-adornment-password'>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type={showPassword ? 'text' : 'password'}
                    id='outlined-adornment-password'
                    value={password}
                    onChange={(e) =>
                      setFormInput({ ...formInput, password: e.target.value })
                    }
                    endAdornment={
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge='end'
                        >
                          {showPassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <typography variant='body2'>
                  By creating an account you have aggreed to our{' '}
                  <Link to='/terms'>Terms &amp; Conditions</Link> and
                  <Link to='/privacy'> Privacy Policy</Link>
                </typography>
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to='/login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
