import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Tab, Tabs, Typography, Box, Grid, Stack, InputLabel, OutlinedInput, Paper, Select, MenuItem } from '@mui/material';
import withFormHandling from '../hoc/withFormHandling'; // Import the HOC
import SendIcon from '@mui/icons-material/Send';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`vertical-tabpanel-${index}`}
			aria-labelledby={`vertical-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `vertical-tab-${index}`,
		'aria-controls': `vertical-tabpanel-${index}`,
	};
}

// Define the patient form component
function PatientForm(props) {
	const { formData, handleFieldChange, handleSubmit } = props;

	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};


	return (
		<form onSubmit={handleSubmit}>
			<Box sx={{ flexGrow: 1, display: 'flex' }}>
				<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
					<Grid item xs={12} md={2}>
						<Paper elevation={1}>
							<Tabs
								orientation="vertical"
								variant="scrollable"
								value={value}
								onChange={handleChange}
								aria-label="Vertical tabs example"
							>
								<Tab label="General Information" {...a11yProps(0)} />
								<Tab label="Contact Information" {...a11yProps(1)} />
								<Tab label="Family Information" {...a11yProps(2)} />
								<Tab label="Insurance Information" {...a11yProps(3)} />
							</Tabs>
						</Paper>
					</Grid>

					<Grid item xs={12} md={10} spacing={2}>
						<Paper elevation={1}>
							{/* General Information */}
							<TabPanel value={value} index={0} display="flex">
								<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
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
												placeholder="Rick"
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
												placeholder="Rick"
												fullWidth
											/>
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
											>
												<MenuItem value={10}>Male</MenuItem>
												<MenuItem value={20}>Female</MenuItem>
												<MenuItem value={30}>Others</MenuItem>
											</Select>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="citizenshipNumber">Citizenship No.*</InputLabel>
											<OutlinedInput
												id="citizenshipNumber"
												type="citizenshipNumber"
												value={formData.citizenshipNumber || ''}
												name="citizenshipNumber"
												onChange={(e) => handleFieldChange('citizenshipNumber', e.target.value)}
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
											>
												<MenuItem value={10}>Single</MenuItem>
												<MenuItem value={20}>Married</MenuItem>
												<MenuItem value={30}>Divorced</MenuItem>
											</Select>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="occupation">Occupation</InputLabel>
											<OutlinedInput
												id="occupation"
												type="occupation"
												value={formData.occupation || ''}
												name="occupation"
												onChange={(e) => handleFieldChange('occupation', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="contactNumber">Contact No.*</InputLabel>
											<OutlinedInput
												id="contactNumber"
												type="number"
												value={formData.contactNumber || ''}
												name="contactNumber"
												onChange={(e) => handleFieldChange('contactNumber', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="optionalContactNumber">Contact Number (Optional)</InputLabel>
											<OutlinedInput
												id="optionalContactNumber"
												type="optionalContactNumber"
												value={formData.occupation || ''}
												name="optionalContactNumber"
												onChange={(e) => handleFieldChange('optionalContactNumber', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="ethnicGroup">Ethnic Group</InputLabel>
											<OutlinedInput
												id="ethnicGroup"
												type="ethnicGroup"
												value={formData.ethnicGroup || ''}
												name="ethnicGroup"
												onChange={(e) => handleFieldChange('ethnicGroup', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>


									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="religion">Religion</InputLabel>
											<OutlinedInput
												id="religion"
												type="religion"
												value={formData.religion || ''}
												name="religion"
												onChange={(e) => handleFieldChange('religion', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="address">Address*</InputLabel>
											<OutlinedInput
												id="address"
												type="text"
												value={formData.country || ''}
												name="address"
												onChange={(e) => handleFieldChange('address', e.target.value)}
												placeholder="Nepal"
												fullWidth
											/>
										</Stack>
									</Grid>
								</Grid>
							</TabPanel>
							{/* Contact Information */}
							<TabPanel value={value} index={1}>
								<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="relationship">Relationship*</InputLabel>
											<OutlinedInput
												id="relationship"
												type="relationship"
												value={formData.relationship || ''}
												name="relationship"
												onChange={(e) => handleFieldChange('relationship', e.target.value)}
												placeholder="Father"
												fullWidth
											/>
										</Stack>
									</Grid>


									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="contactPerson">Contact Person*</InputLabel>
											<OutlinedInput
												id="contactPerson"
												type="contactPerson"
												value={formData.contactPerson || ''}
												name="contactPerson"
												onChange={(e) => handleFieldChange('contactPerson', e.target.value)}
												placeholder="Father"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="contactPerson">Contact Person Phone Number*</InputLabel>
											<OutlinedInput
												id="contactPersonNumber"
												type="contactPersonNumber"
												value={formData.contactPersonNumber || ''}
												name="contactPersonNumber"
												onChange={(e) => handleFieldChange('contactPersonNumber', e.target.value)}
												placeholder="+97798xxxxxxx"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="contactPersonGender">Gender*</InputLabel>
											<Select
												id="contactPersonGender"
												value={formData.contactPersonGender || ''}
												label="contactPersonGender"
												onChange={(e) => handleFieldChange('contactPersonGender', e.target.value)}
											>
												<MenuItem value={10}>Male</MenuItem>
												<MenuItem value={20}>Female</MenuItem>
												<MenuItem value={30}>Others</MenuItem>
											</Select>
										</Stack>
									</Grid>


									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="country">Country*</InputLabel>
											<OutlinedInput
												id="country"
												type="country"
												value={formData.country || ''}
												name="country"
												onChange={(e) => handleFieldChange('country', e.target.value)}
												placeholder="Nepal"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="state">State*</InputLabel>
											<OutlinedInput
												id="state"
												type="text"
												value={formData.country || ''}
												name="state"
												onChange={(e) => handleFieldChange('state', e.target.value)}
												placeholder="Bagmati Pradesh"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="district">District*</InputLabel>
											<OutlinedInput
												id="district"
												type="text"
												value={formData.country || ''}
												name="district"
												onChange={(e) => handleFieldChange('district', e.target.value)}
												placeholder="Kathmandu"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="city">City*</InputLabel>
											<OutlinedInput
												id="city"
												type="city"
												value={formData.city || ''}
												name="city"
												onChange={(e) => handleFieldChange('city', e.target.value)}
												placeholder="Anamnagar, kathmandu"
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="address">Address*</InputLabel>
											<OutlinedInput
												id="address"
												type="text"
												value={formData.country || ''}
												name="address"
												onChange={(e) => handleFieldChange('address', e.target.value)}
												placeholder="Nepal"
												fullWidth
											/>
										</Stack>
									</Grid>
								</Grid>
							</TabPanel>
							{/* Family Information */}
							<TabPanel value={value} index={2}>
								<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="parentName">Parent Name*</InputLabel>
											<OutlinedInput
												id="parentName"
												type="parentName"
												value={formData.parentName || ''}
												name="parentName"
												onChange={(e) => handleFieldChange('parentName', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="spouseName">Spouse Name</InputLabel>
											<OutlinedInput
												id="spouseName"
												type="spouseName"
												value={formData.spouseName || ''}
												name="spouseName"
												onChange={(e) => handleFieldChange('spouseName', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="spouseOccupation">Spouse Occupation</InputLabel>
											<OutlinedInput
												id="spouseOccupation"
												type="spouseOccupation"
												value={formData.spouseOccupation || ''}
												name="spouseOccupation"
												onChange={(e) => handleFieldChange('spouseOccupation', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="siblingName">Siblings Name</InputLabel>
											<OutlinedInput
												id="siblingName"
												type="siblingName"
												value={formData.siblingName || ''}
												name="siblingName"
												onChange={(e) => handleFieldChange('siblingName', e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>
								</Grid>
							</TabPanel>
							{/* Insurance Information */}
							<TabPanel value={value} index={3}>
								<Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
									{formData.insuranceEntries.map((entry, index) => (
										<div key={index}>
											<TextField
												label={`Insurer Name ${index + 1}`}
												value={entry.insurerName || ''}
												onChange={(e) => handleFieldChange(`insuranceEntries[${index}].insurerName`, e.target.value)}
											/>
											<TextField
												label={`Insurance ID ${index + 1}`}
												value={entry.insuranceId || ''}
												onChange={(e) => handleFieldChange(`insuranceEntries[${index}].insuranceId`, e.target.value)}
											/>
										</div>
									))}
									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="insurerName">Insuree Name*</InputLabel>
											<OutlinedInput
												id="insurerName"
												type="insurerName"
												value={formData.insurerName || ''}
												name="insurerName"
												onChange={(e) => handleFieldChange(`insuranceEntries[${index}].insurerName`, e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>

									<Grid item xs={12} md={3}>
										<Stack spacing={1}>
											<InputLabel htmlFor="insuranceId">Insurance ID</InputLabel>
											<OutlinedInput
												id="insuranceId"
												type="insuranceId"
												value={formData.insuranceId || ''}
												name="insuranceId"
												onChange={(e) => handleFieldChange(`insuranceEntries[${index}].insuranceId`, e.target.value)}
												fullWidth
											/>
										</Stack>
									</Grid>
								</Grid>
							</TabPanel>
						</Paper>

						<Button variant="contained" startIcon={<SendIcon />} sx={{ marginTop: "20px" }}>Save</Button>
					</Grid>
				</Grid>
			</Box>
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
