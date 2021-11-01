import React, { useContext, useState, useEffect } from 'react';

import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import { Link, useHistory } from 'react-router-dom';
import Alerts from '../layout/Alerts';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  Divider,
  Chip,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from '../layout/logo.png';

const theme = createTheme();

const useStyles = makeStyles({
  logo: {
    padding: '0',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  contact: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
});

export default function SignIn() {
  const classes = useStyles();
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const { setAlert } = alertContext;
  const { login, error, clearErrors, token } = authContext;

  useEffect(() => {
    if (token) {
      history.push('/auth/home');
    }
    if (error === 'Invalid Credentials') {
      setAlert(error, 'error', 2000);
      clearErrors();
    }
    //eslint-disable-next-line
  }, [error, token]);

  const [User, setUser] = useState({
    email: '',
    password: '',
  });
  const { email, password } = User;

  const handleSubmit = (e) => {
    e.preventDefault();

    login({
      email,
      password,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Grid container sx={{ mt: 2 }} alignItems='center'>
          <Grid item xs={6}>
            <Typography className={classes.logo}>
              <img src={logo} alt='logo' width={150} />
            </Typography>
          </Grid>
          <Grid item xs={6} align='right'>
            <Button variant='outlined' color='warning'>
              GET STARTED
            </Button>
          </Grid>
        </Grid>
        <Typography
          align='center'
          variant='h2'
          className={classes.title}
          sx={{ color: '#ef964c', fontSize: '34px' }}
        >
          Manage Your Lodge on The Go
        </Typography>
        <Box
          sx={{
            marginTop: 4,
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
            Sign in
          </Typography>
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email/Username'
              name='email'
              autoComplete='email'
              autoFocus
              value={email}
              onChange={(e) => setUser({ ...User, email: e.target.value })}
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              autoComplete='current-password'
              value={password}
              onChange={(e) => setUser({ ...User, password: e.target.value })}
            />
            {/* <FormControlLabel
              control={<Checkbox value='remember' color='primary' />}
              label='Remember me'
            /> */}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 2.5, mb: 3.5 }}
            >
              Sign In
            </Button>

            <Grid container spacing={1}>
              <Grid item xs>
                <Link to='/' variant='body2'>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Grid className='details' sx={{ mt: 3 }}>
          <Paper sx={{ p: 2, bgcolor: '#b154c4', color: 'white' }}>
            <Typography align='center'>
              Our service will enable you to easily get notified when a customer
              book a room.
            </Typography>
          </Paper>
          <Paper sx={{ mt: 2, p: 2, bgcolor: '#3A9AC5', color: 'white' }}>
            <Typography align='center'>
              Get detailed report to assist in making informed business decision
            </Typography>
          </Paper>
        </Grid>
        <Button
          fullWidth
          variant='outlined'
          color='warning'
          sx={{ mt: 2.5, mb: 3.5 }}
        >
          GET STARTED
        </Button>
        <Divider>
          <Chip color='primary' label='Contact Us' />
        </Divider>
        <Grid sx={{ mb: 5 }} className={classes.contact}>
          <Chip
            label='+255755059683'
            component='a'
            href='#basic-chip'
            variant='outlined'
            clickable
            color='primary'
            icon={<WhatsAppIcon />}
          />
          <Chip
            icon={<EmailIcon />}
            label='info@lodge.co.tz'
            variant='outlined'
            color='warning'
          />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
