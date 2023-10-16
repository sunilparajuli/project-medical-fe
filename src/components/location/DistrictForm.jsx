import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function DistrictForm({ addDistrict, provinces }) {
  const [districtName, setDistrictName] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDistrict({ name: districtName, province_id: selectedProvince });
    setDistrictName('');
    setSelectedProvince('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="District Name"
        variant="outlined"
        value={districtName}
        onChange={(e) => setDistrictName(e.target.value)}
      />
      <label>Select Province:</label>
      <select
        value={selectedProvince}
        onChange={(e) => setSelectedProvince(e.target.value)}
      >
        <option value="">Select a Province</option>
        {provinces?.map((province) => (
          <option key={province.id} value={province.id}>
            {province.name}
          </option>
        ))}
      </select>
      <Button type="submit" variant="contained" color="primary">
        Add District
      </Button>
    </form>
  );
}

export default DistrictForm;
