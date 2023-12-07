import { Link, Navigate } from "react-router-dom";
//import { useStateContext } from "../context/ContextProvider.jsx";
import { useState, useEffect } from "react";
import "../index.css";

// MUI Compoments
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Redux action
import { logIn } from "../redux/actions/auth.js";
import { useDispatch, useSelector } from "react-redux";

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  //const { user, token, setUser, setToken, setRefreshToken } = useStateContext()
  const [message, setMessage] = useState(null)
  

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get('username'),
      password: data.get('password'),
    }
    dispatch(logIn(payload));

    /* axiosClient.post('/api/users/token/', payload)
      .then(({ data }) => {
        setUser(data.username)
        setToken(data.access_token);
        setRefreshToken(data.refresh_token);
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setMessage(response.data.message)
        }
      }) */
  }
  

  /* useEffect(() => {
    if (auth.authData) {     
      console.log('Auth Data', auth.authData)
      setUser(auth.authData.username)
      setToken(auth.authData.c);
      setRefreshToken(auth.authData.refresh_token);
    } else{
      setUser({})
      setToken(null); 
      
    }
  }, [auth]); */

  if (auth.authenticated) {
    return <Navigate to="/dashboard" />
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
             
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoFocus
            />

            {message &&
              <div className="alert">
                <p>{message}</p>
              </div>
            }

            <TextField
              margin="normal"
              required
              fullWidth
             
              label="Password"
              type="password"
              id="password"
              name="password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={auth.loading}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
