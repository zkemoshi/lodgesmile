import React, { useContext, useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';
import {
  ListItem,
  List,
  Button,
  CssBaseline,
  Avatar,
  Grid,
  Typography,
  Container,
  ListItemText,
  Divider,
  Chip,
  ListItemAvatar,
} from '@mui/material';
import { makeStyles } from '@material-ui/core';
import BedroomParentRoundedIcon from '@mui/icons-material/BedroomParentRounded';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarksRoundedIcon from '@mui/icons-material/BookmarksRounded';
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

export default function Landing() {
  const classes = useStyles();

  const history = useHistory();

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
            <Button
              variant='outlined'
              color='warning'
              onClick={() => history.push('/login')}
            >
              GET STARTED
            </Button>
          </Grid>
        </Grid>
        <Typography
          align='center'
          variant='h2'
          className={classes.title}
          sx={{ color: '#ef964c', fontSize: '30px', my: 4 }}
        >
          Manage Your Lodge on the Go
        </Typography>
        <Typography
          align='center'
          variant='body1'
          sx={{ mt: 1, fontSize: '20px' }}
        >
          Our service is to help you manage and monitor your lodge activity
          where ever you are. Keep track of customers who have booked at any
          moment through online booking.
        </Typography>

        <Divider sx={{ my: 2 }} />

        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            alignItems: 'center',
          }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BedroomParentRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Step 1'
              secondary='Lodge owner add rooms to monitors and creates an attendant (mhudumu).'
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <BookmarksRoundedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Step 2:'
              secondary='Attendant adds booking records as customers arrives'
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <NotificationsIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Step 3'
              secondary='Lodge owner get notified of booked room'
            />
          </ListItem>
        </List>
        <Grid align='center'>
          <Button
            variant='outlined'
            alignItems='center'
            color='warning'
            onClick={() => history.push('/login')}
            sx={{ mt: 2.5, mb: 3.5 }}
          >
            GET STARTED
          </Button>
        </Grid>
        <Divider>
          <Chip color='primary' label='Contact Us' />
        </Divider>
        <Grid sx={{ mb: 5 }} className={classes.contact}>
          <Chip
            label='+255755059683'
            component='a'
            href='https://wa.me/message/U7QLQ42VWHRUJ1'
            variant='outlined'
            clickable
            color='primary'
            icon={<WhatsAppIcon />}
          />
          <Chip
            icon={<EmailIcon />}
            label='sales@lodge.co.tz'
            variant='outlined'
            color='warning'
          />
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
