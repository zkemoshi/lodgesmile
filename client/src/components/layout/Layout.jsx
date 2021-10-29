import {
  Drawer,
  makeStyles,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  IconButton,
  Grid,
} from '@material-ui/core';
import { AddCircleOutlineOutlined, SubjectOutlined } from '@material-ui/icons';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import moment from 'moment';

import authContext from '../../context/auth/authContext';
import { Avatar, Chip } from '@mui/material';
import logo from './logo.png';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: '#f9f9f9',
      width: '100%',
      padding: theme.spacing(3),
    },

    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    active: {
      background: '#f4f4f4',
    },
    title: {
      padding: theme.spacing(0),
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    logout: {
      marginLeft: '5px',
      padding: '2px',
      backgroundColor: '#f4f6f4',
      '&:hover': {
        backgroundColor: '#f4f4f4',
        border: 'red',
      },
    },
    date: {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    toolbar: theme.mixins.toolbar,
  };
});

const Layout = ({ children }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const [openDrawer, setOpenDrawer] = useState(false);
  const { logout, user, loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
    // eslint-disable-next-line
  }, []);

  const menuItems = [
    {
      text: 'Home',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/auth/home',
    },
    {
      text: 'Create Room',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/auth/rooms',
    },
    {
      text: 'Attendant',
      icon: <AddCircleOutlineOutlined color='primary' />,
      path: '/auth/attendant',
    },
    {
      text: 'Pricing',
      icon: <AssessmentIcon color='primary' />,
      path: '/auth/pricing',
    },
    {
      text: 'Dashboard',
      icon: <AssessmentIcon color='primary' />,
      path: '/auth/dashboard',
    },
    {
      text: 'Admin',
      icon: <AssessmentIcon color='primary' />,
      path: '/admin',
    },
    {
      text: 'Logout',
      icon: <LogoutIcon color='primary' />,
      path: '/auth/logout',
    },
  ];

  const attendantMenu = [
    {
      text: 'Create Receipt',
      icon: <SubjectOutlined color='secondary' />,
      path: '/auth/home',
    },
    {
      text: 'View Receipts',
      icon: <ReceiptIcon color='primary' />,
      path: '/auth/viewReceipts',
    },

    {
      text: 'Logout',
      icon: <LogoutIcon color='primary' />,
      path: '/auth/logout',
    },
  ];

  const handleList = (path) => {
    if (path === '/auth/logout') {
      logout();
      history.push('/');
    } else {
      history.push(path);
    }
  };

  return (
    <div className={classes.root}>
      {/* App bar */}
      <AppBar
        position='fixed'
        color='default'
        elevation={0}
        // className={openDrawer ? classes.appBar : ''}
      >
        <Toolbar>
          <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
            <MenuIcon />
          </IconButton>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
          >
            <Grid item xs={12} md={6}>
              <Typography className={classes.date}>
                {openDrawer ? '' : <>{moment().format('MMM Do, YY')}</>}
                <Chip
                  avatar={
                    <Avatar
                      sx={{ backgroundColor: '#f3f3f3', fontWeight: 'bold' }}
                    >
                      {user &&
                        moment(user.expiredAt, 'DD-MM-YYYY').diff(
                          moment(),
                          'days'
                        )}
                    </Avatar>
                  }
                  label={
                    user &&
                    moment(user.expiredAt, 'DD-MM-YYYY').diff(
                      moment(),
                      'days'
                    ) > 0
                      ? `Days`
                      : 'Inactive'
                  }
                />
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} align='right'>
              <Typography>Welcome, {user && user.lastName}</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
        className={classes.drawer}
        anchor='left'
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography className={classes.title}>
            <img src={logo} alt='logo' width={150} />
          </Typography>
        </div>

        {/* List Links */}
        {user !== null && user.user ? (
          <List>
            {attendantMenu.map((item) => (
              <ListItem
                divider
                key={item.text}
                button
                onClick={() => handleList(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        ) : (
          <List>
            {menuItems.map((item) => (
              <ListItem
                divider
                key={item.text}
                button
                onClick={() => handleList(item.path)}
                className={
                  location.pathname === item.path ? classes.active : null
                }
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        )}
      </Drawer>
      <div>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
