import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function MunicipalityForm({ addMunicipality, districts }) {
  const [municipalityName, setMunicipalityName] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addMunicipality({ name: municipalityName, district_id: selectedDistrict });
    setMunicipalityName('');
    setSelectedDistrict('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Municipality Name"
        variant="outlined"
        value={municipalityName}
        onChange={(e) => setMunicipalityName(e.target.value)}
      />
      <label>Select District:</label>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
      >
        <option value="">Select a District</option>
        {districts?.map((district) => (
          <option key={district.id} value={district.id}>
            {district.name}
          </option>
        ))}
      </select>
      <Button type="submit" variant="contained" color="primary">
        Add Municipality
      </Button>
    </form>
  );
}

export default MunicipalityForm;
