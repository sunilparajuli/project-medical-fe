import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import axiosClient from '../axios-client';
import SubtitlesOffIcon from '@mui/icons-material/SubtitlesOff';
import AttachEmailIcon from '@mui/icons-material/AttachEmail';


function MyDataGrid() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [patientIdFilter, setPatientIdFilter] = useState('');
  const [dateClaimedFilter, setDateClaimedFilter] = useState('');

  useEffect(() => {
    // Fetch data from the API
    axiosClient.get(`/get-submitted-claim-lists`)
      .then((response) => {
        setData(response.data.response.data); // Set the initial data
        setFilteredData(response.data.response.data); // Set the filtered data as well
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, []);
  

  useEffect(() => {
    // Apply filters to the data
    let filtered = [...data];

    if (patientIdFilter) {
      filtered = filtered.filter((item) =>
        item.patient_id.includes(patientIdFilter)
      );
    }

    if (dateClaimedFilter) {
      filtered = filtered.filter((item) =>
        item.date_claimed.includes(dateClaimedFilter)
      );
    }

    setFilteredData(filtered);
  }, [patientIdFilter, dateClaimedFilter, data]);

  const columns = [
    { field: 'claim uuid', headerName: 'claim uuid', flex: 1 },
    { field: 'claimed amount', headerName: 'Claimed Amount', flex: 1 },
    {
      field: "approved",
      headerName: "Approved Amount",
    },
    { field: 'approved', headerName: 'Approved Amount', flex: 1 },
    {
      field: 'attachment status', // Field name with space
      headerName: 'Attachment Status',
      sortable: false,
      width: 140,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return params.row['attachment status'] === 'disabled' ? (
          <SubtitlesOffIcon style={{ color: 'red' }}/>
        ) : (
          // Render something else when attachment status is not disabled
          // For example, return a text or another icon
          <span><AttachEmailIcon  style={{ color: 'green' }}/></span>
        );
      },
    },
    { field: 'client_claim_id', headerName: 'Client ID', flex: 1 },
    
    // Add other columns as needed
  ];

  return (
    <Card>
      <Paper>
        <TextField
          label="Patient ID"
          value={patientIdFilter}
          onChange={(e) => setPatientIdFilter(e.target.value)}
        />
        <TextField
          label="Date Claimed"
          value={dateClaimedFilter}
          onChange={(e) => setDateClaimedFilter(e.target.value)}
        />
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            getRowId={row => row.client_claim_id}
            rows={filteredData}
            columns={columns}
            pageSize={10}
          />
        </div>
      </Paper>
    </Card>
  );
}

export default MyDataGrid;
