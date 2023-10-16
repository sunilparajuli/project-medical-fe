import React from 'react';
import { OutlinedInput } from '@mui/material';

const InvoiceField = ({ onEditItem, cellData }) => {
	// console.log("celldata", cellData);
	return (
		<OutlinedInput
			className={cellData.className}
			type={cellData.type}
			placeholder={cellData.placeholder}
			min={cellData.min}
			max={cellData.max}
			step={cellData.step}
			name={cellData.name}
			id={cellData.id}
			value={cellData.value}
			onChange={onEditItem}
			size='small'
			required
		/>
	);
};

export default InvoiceField;