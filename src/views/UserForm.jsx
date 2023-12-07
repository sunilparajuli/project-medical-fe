import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";
import { TextField, Button, Tab, Tabs, Typography, Box, Grid, Stack, InputLabel, OutlinedInput, Paper, Select, MenuItem, Divider, Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


export default function UserForm() {
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()

  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('User was successfully updated')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          setNotification('User was successfully created')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    }
  }

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            Loading...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
          
          <form onSubmit={onSubmit}>
          <Paper sx={{ padding: '20px' }} elevation={1}>
            <Typography sx={{ marginBottom: '10px', fontWeight: 'bold' }}>New Patient</Typography>
            <Divider />
            <Grid container direction='row' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: '10px' }}>
              <Grid item xs={12} md={10}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="name">Name</InputLabel>
                      <OutlinedInput
                        id="name"  
                        type="name"                
                        value={user.name}
                        name="name"                  
                        onChange={ev => setUser({...user, name: ev.target.value})}
                        placeholder="Name"
                        size='small'
                        fullWidth                    
                      />
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="email">Email</InputLabel>
                      <OutlinedInput
                        id="email"  
                        type="email"                
                        value={user.email}
                        name="email"                  
                        onChange={ev => setUser({...user, email: ev.target.value})}
                        placeholder="Email"
                        size='small'
                        fullWidth                    
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password">Password</InputLabel>
                      <OutlinedInput
                        id="password"  
                        type="password"                                      
                        name="password"                  
                        onChange={ev => setUser({...user, password: ev.target.value})}
                        placeholder="Password"
                        size='small'
                        fullWidth                    
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <Stack spacing={1}>
                      <InputLabel htmlFor="password_confirmation">Password Confirmation</InputLabel>
                      <OutlinedInput
                        id="password_confirmation"  
                        type="password_confirmation"                                      
                        name="password_confirmation"                  
                        onChange={ev => setUser({...user, password_confirmation: ev.target.value})}
                        placeholder="Password Confirmation"
                        size='small'
                        fullWidth                    
                      />
                    </Stack>
                  </Grid>



                </Grid>
              </Grid>
            </Grid>
            <Button className="btn" variant="contained" startIcon={<SendIcon />} sx={{ marginTop: "20px", marginRight: '20px' }}>Save</Button>         
            </Paper>
          </form>
        )}
      </div>
    </>
  )
}
