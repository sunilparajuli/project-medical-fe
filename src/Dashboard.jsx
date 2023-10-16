

import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';


const dashboard = [
  {
    "type": "card",
    "content": {
      "text": "Patients",
      "image": "https://example.com/card1-image.jpg"
    }
  },
  {
    "type": "card",
    "content": {
      "text": "Users",
      "image": "https://example.com/card2-image.jpg"
    }
  },
  {
    "type": "card",
    "content": {
      "text": "Dashboard",
      "image": "https://example.com/card3-image.jpg"
    }
  }
];

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
function Dashboard() {


  return (
    <div>
      <h1>Dashboard</h1>


      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {dashboard.map((item, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>{item.content.text}</Item>
          </Grid>
        ))} 
      </Grid>

    </div>
  )
}

export default Dashboard
