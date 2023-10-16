import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import { useEffect } from "react";
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Paper } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { makeStyles } from '@mui/styles';
import AirlineSeatFlatIcon from '@mui/icons-material/AirlineSeatFlat';
import AppsIcon from '@mui/icons-material/Apps';
import PaymentIcon from '@mui/icons-material/Payment';
import ExploreIcon from '@mui/icons-material/Explore';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AlertDialog from "./AlertDialog";

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
  const { user, token, setUser, setToken, notification, errornotification } = useStateContext();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  if (!token) {
    return <Navigate to="/login" />
  }

  const onLogout = (ev) => {
    ev.preventDefault();

    axiosClient.post('/logout').then(() => {
      setUser({});
      setToken(null);
    });
  };

  useEffect(() => {
    axiosClient.get('/user')
      .then(({ data }) => {
        setUser(data)
      })
  }, [])

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
      }
    ];

  return (

    <div id="defaultLayout">
      {/* <aside>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/patients">Patients</Link>
      </aside> */}
      <div className="content">
        <header>
          <div>
            Header
          </div>

          <div>
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
          </div>
        </header>

        {notification &&
          <>
            {/* <div className="notification">
            {notification}
          </div> */}
            <AlertDialog message={notification} type="success" />
          </>
        }

        {errornotification &&
          <>
            {/* <div className="alert">
            {errornotification}
          </div> */}
            <AlertDialog message={errornotification} type="error" />
          </>
        }
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
              <div style={{ flexGrow: 1 }} /> {/* This pushes the following items to the right */}
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
                {/* <Link to="/dashboard">Dashboard</Link>
              
              <Link to="/patients">Patients</Link> */}

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
