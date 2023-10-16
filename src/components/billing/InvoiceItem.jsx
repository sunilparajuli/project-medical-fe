import React, { useEffect } from 'react';
import InvoiceField from './InvoiceField';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import DeleteIcon from '@mui/icons-material/Delete';


const options = [{
  "name": "Adjustment",
  "code": "ADJ01",
  "price": "0.00",
  "validity_from": "2018-07-02T13:20:40.667",
  "type": "item"
},
{
  "name": "Medical Bill",
  "code": "ADJ02",
  "price": "0.00",
  "validity_from": "2018-07-02T13:20:40.667",
  "type": "item"
},
{
  "name": "Paracetamol",
  "code": "MED01",
  "price": "5.00",
  "validity_from": "2018-07-03T13:20:00",
  "type": "item"
}
];

const InvoiceItem = ({ id, name, description, qty, price, onDeleteItem, onEditItem, itemservices, setItems }) => {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  
  const deleteItemHandler = (id) => {
    console.log('Delete Item Handler:', id);
    onDeleteItem(id);
  };
  const TotalPrice =()=>{
    itemservices.total = itemservices.qty * itemservices.price;
    return <div>{itemservices.total} </div>;
  }

  useEffect(() => {
    
    // This effect will trigger when 'value' changes
    // setItems({...itemservices, price : value})
    //changeItemHandler();
  }, [itemservices.total]);

  return (
    <TableRow>
      <TableCell>1</TableCell>
      <TableCell>
        {/* <InvoiceField
					onEditItem={(event) => onEditItem(event)}
					cellData={{
						placeholder: 'Item name',
						type: 'text',
						name: 'name',
						id: id,
						value: name,
					}}
				/> */}
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            console.log("itemservices", itemservices);
            setValue(newValue);
            itemservices.item = newValue;
            itemservices.price = parseInt(newValue.price);
            onEditItem(event); 
            //changeItemHandler();
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          getOptionLabel={(option) => option.name} // Define how to display the option in the input
          renderInput={(params) => <TextField {...params} label="Select an option" variant="outlined" />}
          size='small'
        />
      </TableCell>

      <TableCell>
        <InvoiceField
          onEditItem={(event) => onEditItem(event)}
          cellData={{
            item: {
              name: "Adjustment",
              code: "ADJ01",
              price: "0.00",
              validity_from: "2018-07-02T13:20:40.667",
              type: "item"
            },
            name: 'description',
            type: 'text',
            value: description,
            placeholder: 'Description',
          }}
        />
      </TableCell>

      <TableCell>
        <InvoiceField
          onEditItem={(event) => onEditItem(event)}
          cellData={{
            type: 'number',
            min: '1',
            name: 'qty',
            id: id,
            value: qty,
          }}
        />
      </TableCell>

      <TableCell>
        <InvoiceField
          onEditItem={(event) => onEditItem(event)}
          cellData={{
            className: 'text-right',
            type: 'number',
            min: '0.01',
            step: '0.01',
            name: 'price',
            id: id,
            value: price,
          }}
        />
      </TableCell>

      <TableCell>
        <p>{TotalPrice}</p>
      </TableCell>
      <TableCell>
        <DeleteIcon onClick={() => deleteItemHandler(id)} />
      </TableCell>
    </TableRow>
  );
};

export default InvoiceItem;