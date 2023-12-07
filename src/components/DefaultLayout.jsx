import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from "@mui/material/Typography";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import { Link, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppsIcon from '@mui/icons-material/Apps';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import PaymentIcon from '@mui/icons-material/Payment';
import ExploreIcon from '@mui/icons-material/Explore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { logOut } from "../redux/actions/auth.js";
import { useEffect } from "react";
import LocalStorage from '../utils/LocalStorage';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: '250px', // Adjust the width as needed
  },
}));

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);


const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


export default function DefaultLayout() {  

  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(true)
  
  const auth = useSelector((state) => state.auth);
  

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = (ev) => {
    ev.preventDefault();
    const payload = {
      refresh_token: localStorage.getItem('REFRESH_TOKEN')
    }
    dispatch(logOut(payload));   
  };

  useEffect(() => {    
    if(LocalStorage.getAccessToken() == null){        
      window.location.href = '/';
    }
  }, [auth]); 

  const sidebar =
    [
      {
        "menu": "Dashboard",
        "redirect": "/dashboard",
        "icon": <AppsIcon color="default" />
      },
      {
        "menu": "Users",
        "redirect": "/users",
        "icon": <PeopleAltIcon color="primary" />
      },
      {
        "menu": "Patients",
        "redirect": "/patients",
        "icon": <AirlineSeatFlatIcon color="primary" />

      },
      {
        "menu": "Billing",
        "redirect": "/create-billing",
        "icon": <PaymentIcon color="secondary" />
      },
      {
        "menu": "Locations",
        "redirect": "/create-location",
        "icon": <ExploreIcon color="primary" />
      },
      {
        "menu": "Claims",
        "redirect": "/claims",
        "icon": <AutoStoriesIcon color="primary" />
      },
      {
        "menu" : "Attachments",
        "redirect" : "/attachment-upload",
        "icon" : <AutoStoriesIcon color="primary" />
      }
    ];
  

  return (
    <div id="defaultLayout"> 
      <div className="content">
        <header>
          <div>
            Header
          </div>
          <div>   
        
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
          </div>
        </header>
        <Box sx={{ display: 'flex' }} style={{ bgcolor: '#cfe8fc' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{ mr: 2, ...(open && { display: "none" }) }}
              >
                  <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                  Smart Health
              </Typography>
              <div style={{ flexGrow: 1 }} /> 
              <IconButton color="inherit">
                  <NotificationsIcon color="primary" />
              </IconButton>
              <IconButton color="inherit">
                <AccountCircleIcon color="primary" />
              </IconButton>
              <Button
                  color="inherit"
                  startIcon={<ExitToAppIcon />}
                  onClick={
                    onLogout
                  }
                >
                  Logout
                </Button>
            </Toolbar>
          </AppBar>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <Paper sx={{ backgroundColor: 'rgba(255,255,255,0.5)' }}> {/* Set your desired background color here */}
              <List>               
                {sidebar.map((item, index) => (<ListItem disablePadding key={index}>
                  <ListItemButton component={Link} to={item.redirect}>
                    <ListItemIcon>
                      {item.icon && (<>{item.icon}</>)}
                    </ListItemIcon>
                    <ListItemText primary={item.menu} />
                  </ListItemButton>
                </ListItem>))}
              </List>
            </Paper>
            <Divider />
          </Drawer>
          <Main open={open}>
            <DrawerHeader />
            <Outlet />
          </Main>
        </Box>
      </div>
    </div>
  )
}
