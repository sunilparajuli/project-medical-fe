import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Tab, Tabs, Typography, Box, Grid, Stack, InputLabel, OutlinedInput, Paper, Select, MenuItem, Divider, Avatar } from '@mui/material';
import withFormHandling from '../hoc/withFormHandling'; // Import the HOC
import SendIcon from '@mui/icons-material/Send';
import UploadIcon from '@mui/icons-material/Upload';
import axiosClient from '../axios-client';
import { useStateContext } from "../context/ContextProvider.jsx";
import CircularProgress from '@mui/material/CircularProgress';
import {Navigate} from "react-router-dom";
// Define the patient form component
function PatientForm(props) {
  const { formData, handleFieldChange, handleSubmit, validationErrors } = props;
  const [value, setValue] = React.useState(0);
  const [countries, setCountry] = useState([]);
  const [location, setLocation] = useState([]);
  const [district, setDistrict] = useState([]);
  const [municipality, setMunicipality] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState({});
  const { setNotification, setErrorNotification } = useStateContext();
  //https://raw.githubusercontent.com/abhirimal/nepal-location-data-json/main/nepal_location.json

  const validateForm = (formData) => {
    // Implement your dynamic validation logic here
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = "First Name is required";
    }
    if (!formData.lastName) {
      errors.lastName = "Last Name is required";
    }

    // Add more validation rules for other form fields as needed

    return errors;
  };




  useEffect(() => {
    axiosClient.get("/api/locations/countries")
      .then((res) => {
        setCountry(res.data);
      });
  }, [location]);

  useEffect(() => {

  }, [municipality]);


  const handleChangeCountry = (e, newValue) => {
    const selectedCountry = e.target.value;
    handleFieldChange('country', selectedCountry);
    console.log("selectedCountry", selectedCountry);
    axiosClient.get(`/api/locations/countries/${selectedCountry}/provinces/`)
      .then((data) => {
        setLocation(data.data);
      });
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const gender = [
    { "label": "Male", "value": "male" },
    { "label": "Female", "value": "female" },
    { "label": "Others", "value": "others" }
  ];
  const savePatient = () => {
    axiosClient.post(`/api/patients/`, formData)
      .then(({ data }) => {
        setLoading(false)
        setNotification(JSON.stringify(data));
        return <Navigate to="/patients" />
      })
      .catch((error) => {
        // setErrors(error);
        
        setErrorNotification(error.response.data);
        setLoading(false)
      })
  }

  const handleLocationChange = (e, newValue) => {

    const selectedLocation = e.target.value; //e.target.value;
    if (selectedLocation) {
      handleFieldChange('state', selectedLocation);

      axiosClient.get(`/api/locations/provinces/${selectedLocation}/districts/`)
        .then((data) => {
          setDistrict(data.data);
        })

    }
  }
  const handleDistrictChange = e => {
    const selectedDistrict = e.target.value;
    if (selectedDistrict) {
      axiosClient.get(`/api/locations/districts/${selectedDistrict}/municipalities/`).then((data) => {
        setMunicipality(data.data);
      });
      handleFieldChange('district', selectedDistrict);
    }
  }

  const handleImageChange = (e) => {
    console.log(e.target.files);
    const file = e.target.files[0]; // Get the first selected file
    if (file) {
      // Set the selected image file to state
      setSelectedImage(URL.createObjectURL(file));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ padding: '20px' }} elevation={1}>
        <Typography sx={{ marginBottom: '10px', fontWeight: 'bold' }}>New Patient</Typography>
        <Divider />
        {/* New Patient General Information */}
        <Grid container direction='row' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: '10px' }}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="patientIdentifier">Patient Identifier*</InputLabel>
                  <OutlinedInput
                    id="patientIdentifier"
                    type="patientIdentifier"
                    value={formData.patientIdentifier || ''}
                    name="patientIdentifier"
                    onChange={(e) => handleFieldChange('patientIdentifier', e.target.value)}
                    placeholder="S2076000001"
                    size='small'
                    fullWidth
                    disabled
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="firstName">First Name*</InputLabel>
                  <OutlinedInput
                    id="firstName"
                    type="firstName"
                    value={formData.firstName || ''}
                    name="firstName"
                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                    placeholder="John"
                    size='small'
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="middleName">Middle Name*</InputLabel>
                  <OutlinedInput
                    id="middleName"
                    type="middleName"
                    value={formData.middleName || ''}
                    name="middleName"
                    onChange={(e) => handleFieldChange('middleName', e.target.value)}
                    placeholder="John"
                    size='small'
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="lastName">Last Name*</InputLabel>
                  <OutlinedInput
                    id="lastName"
                    type="lastName"
                    value={formData.lastName || ''}
                    name="lastName"
                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                    placeholder="John"
                    size='small'
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="gender">Gender*</InputLabel>
                  <Select
                    id="gender"
                    value={formData.gender || ''}
                    label="gender"
                    onChange={(e) => handleFieldChange('gender', e.target.value)}
                    size='small'
                  >
                    {gender.map((item) => (<MenuItem value={item.value}>{item.label}</MenuItem>))}
                  </Select>
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="dateOfBirth">Date of Birth*</InputLabel>
                  <OutlinedInput
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth || ''}
                    name="dateOfBirth"
                    onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
                    fullWidth
                    size='small'
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <OutlinedInput
                    id="age"
                    type="number"
                    value={formData.age || ''}
                    name="age"
                    onChange={(e) => handleFieldChange('age', e.target.value)}
                    placeholder="27"
                    size='small'
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} md={3}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="maritalStatus">Marital Status*</InputLabel>
                  <Select
                    id="maritalStatus"
                    value={formData.maritalStatus || ''}
                    label="maritalStatus"
                    onChange={(e) => handleFieldChange('maritalStatus', e.target.value)}
                    size='small'
                  >
                    <MenuItem value={10}>Single</MenuItem>
                    <MenuItem value={20}>Married</MenuItem>
                    <MenuItem value={30}>Others</MenuItem>
                  </Select>
                </Stack>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} md={2}>
            <Stack spacing={1} direction="row" alignItems='center' alignContent='center'>
              <Avatar sx={{ height: '30px', width: '30px', borderRadius: '4px' }} variant='square'>
                <label htmlFor='image-upload' style={{ cursor: 'pointer' }}>
                  <UploadIcon type='file' />
                  <input
                    id='image-upload'
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
              </Avatar>
              <Avatar alt="Remy Sharp" src={selectedImage} sx={{ height: '100px', width: '100px' }} variant='square' />
            </Stack>
          </Grid>
        </Grid>

        <Typography sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Address Information</Typography>
        <Divider />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: '10px' }}>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="country">Country*</InputLabel>
              <Select
                id="country"
                value={formData.country || ''}
                label="country"
                onChange={handleChangeCountry}
                size='small'
              >
                {countries?.map(
                  (item) =>
                  (<MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>)
                )}

              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="state">State*</InputLabel>
              <Select
                id="state"
                value={formData.state || ''}
                label="state"
                onChange={handleLocationChange}
                size='small'
              >
                {location?.map((item) =>
                (<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="district">District*</InputLabel>
              <Select
                id="district"
                value={formData.district || ''}
                label="district"
                onChange={handleDistrictChange}
                size='small'
              >

                {district?.map((item) =>
                (<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}

              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="city">Municipality*</InputLabel>
              <Select
                id="city"
                value={formData.city || ''}
                label="city"
                onChange={(e) => handleFieldChange('city', e.target.value)}
                size='small'
              >
                {municipality?.map((item) =>
                (<MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                ))}

              </Select>
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="address">Address*</InputLabel>
              <OutlinedInput
                id="address"
                type="address"
                value={formData.address || ''}
                name="address"
                onChange={(e) => handleFieldChange('address', e.target.value)}
                placeholder="Koteshwor, Kathmandu"
                size='small'
                fullWidth
              />
            </Stack>
          </Grid>
        </Grid>

        <Typography sx={{ marginTop: '20px', marginBottom: '10px', fontWeight: 'bold' }}>Other Information</Typography>
        <Divider />
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ paddingTop: '10px' }}>
          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="contactNumber">Contact Number*</InputLabel>
              <OutlinedInput
                id="contactNumber"
                type="number"
                value={formData.contactNumber || ''}
                name="contactNumber"
                onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
                placeholder="+977-98XXXXXXXX"
                size='small'
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="phoneNumber">Alternate Phone Number*</InputLabel>
              <OutlinedInput
                id="phoneNumber"
                type="phoneNumber"
                value={formData.phoneNumber || ''}
                name="phoneNumber"
                onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                placeholder="+977-98XXXXXXXX"
                size='small'
                fullWidth
              />
            </Stack>
          </Grid>

          <Grid item xs={12} md={3}>
            <Stack spacing={1}>
              <InputLabel htmlFor="email">Email*</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                value={formData.email || ''}
                name="email"
                onChange={(e) => handleFieldChange('email', e.target.value)}
                placeholder="XXXX@gmail.com"
                size='small'
                fullWidth
              />
            </Stack>
          </Grid>
        </Grid>
      </Paper>
      {validationErrors.firstName && (
        <span className="error-message">{validationErrors.firstName}</span>
      )}
      {loading ? (<CircularProgress />) :
        (<Button variant="contained" startIcon={<SendIcon />} sx={{ marginTop: "20px", marginRight: '20px' }} onClick={savePatient}>
          Save
        </Button>)}
      <Button variant="contained" startIcon={<SendIcon />} sx={{ marginTop: "20px" }}>Start OPD Visit</Button>
    </form>
  );
  
}

// Wrap PatientForm component with the HOC and provide initial state
const FormWithState = withFormHandling(PatientForm, {
  firstName: '',
  lastName: '',
  middleName: '',
  dateOfBirth: '',
  gender: '',
  citizenshipNumber: '',
  maritalStatus: '',
  occupation: '',
  contactNumber: '',
  optionalContactNumber: '',
  ethnicGroup: '',
  religion: '',
  country: '',
  city: '',
  state: '',
  parentName: '',
  spouseName: '',
  spouseOccupation: '',
  siblingName: '',
  employerName: '',
  employerId: '',
  employerContactAddress: '',
  insuranceEntries: [],
});

export default FormWithState; // Export the wrapped form component
