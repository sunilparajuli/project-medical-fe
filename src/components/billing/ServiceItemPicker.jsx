import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import axiosClient from "../../axios-client";

export default function ServiceItemPicker({ onItemSelect, onEditItem }) {
  const [items, setItems] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API using Axios
    axiosClient.get('/item-and-service-list')
      .then(({ data }) => {
        setItems(data.data);
        setIsLoading(false); // Mark loading as complete
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false); // Mark loading as complete even in case of an error
      });
  }, []);

  const handleSelect = (selectedItem) => {
    setValue(selectedItem);
    
    // Extract the 'code' value from the selected item
    const editedItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      value: selectedItem.code, // Use 'code' as the value
    };

    // Call the onItemSelect and onEditItem callbacks
    onItemSelect(selectedItem);
    onEditItem(editedItem);
  };

  return (
    <div>
      <div>{`value: ${value ? value.name : 'null'}`}</div>
      <div>{`inputValue: '${inputValue}'`}</div>
      <br />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            handleSelect(newValue); // Call the handleSelect function
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="service-item-picker"
          options={items}
          getOptionLabel={(item) => item.name}
          getOptionSelected={(item, selectedValue) => item.code === selectedValue.code}
          renderInput={(params) => <TextField {...params} label="Service Item" />}
        />
      )}
    </div>
  );
}
