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
import ReviewsRoundedIcon from '@mui/icons-material/ReviewsRounded';
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
              secondary='Owner add rooms to monitors'
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
              secondary='Attendant records a booked room'
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
              secondary='Owner get notified of booked room'
            />
          </ListItem>
        </List>
        {/* <Card sx={{ mb: 2 }}>
          <CardMedia
            component='img'
            height='140'
            image={step1}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Step 1
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Add rooms to monitors
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component='img'
            height='140'
            image={step2}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Step 2
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Book a room marking it accupied as customers request.
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ mb: 2 }}>
          <CardMedia
            component='img'
            height='140'
            image={step3}
            alt='green iguana'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Step 3
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Get notifications of booked rooms immediately
            </Typography>
          </CardContent>
        </Card> */}
        <Button
          fullWidth
          variant='outlined'
          color='warning'
          onClick={() => history.push('/login')}
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
