import { useState, useEffect } from 'react';
import { uid } from 'uid';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import axiosClient from '../../axios-client';
import {useStateContext} from "../../context/ContextProvider";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Select, MenuItem, Grid, InputLabel, OutlinedInput, Stack, Tab } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';


// import incrementString from '../../utils/helper/incrementString';
const date = new Date();
const today = date.toLocaleDateString('en-GB', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
});

const submitData = (e) => {
    e.preventDefault();
    axiosClient
      .post('/api/post-claim', items)
      .then((response) => {
        // Handle the response data here
        console.log('Response:', response.data);
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Error:', error);
        setNotification(`${JSON.stringify(error)}`)
      });
  };

const incrementString = (string) => {
    // Convert pass args to string
    const str = string.toString();
    // Extract string's number
    let number = str.match(/\d+/) === null ? 0 : str.match(/\d+/)[0];

    // Store number's length
    const numberLength = number.length;

    // Increment number by 1
    number = (parseInt(number) + 1).toString();

    // If there were leading 0s, add them again
    while (number.length < numberLength) {
        number = '0' + number;
    }

    return str.replace(/[0-9]/g, '').concat(number);
};

const InvoiceForm = () => {
    
    const [isOpen, setIsOpen] = useState(false);
    const [discount, setDiscount] = useState('');
    const [tax, setTax] = useState('');
    const [invoiceNumber, setInvoiceNumber] = useState(1);
    const [cashierName, setCashierName] = useState('');
    const [customerName, setCustomerName] = useState('');
    const {setNotification, setErrorNotification} = useStateContext()

    const [items, setItems] = useState([
        {
            id: uid(6),
            item: {
                name: "",
                code: "",
                price: "0.00",
                type: "item"
            },
            name: '',
            qty: 1,
            price: '1.00',
            total : '0.0'
        },
    ]);

    const reviewInvoiceHandler = (event) => {
        event.preventDefault();
        setIsOpen(true);
    };

    const addNextInvoiceHandler = () => {
        setInvoiceNumber((prevNumber) => incrementString(prevNumber));
        setItems([
            {
                id: uid(6),
                name: '',
                qty: 1,
                price: '1.00',
            },
        ]);
    };

    const addItemHandler = () => {
        const id = uid(6);
        setItems((prevItem) => [
            ...prevItem,
            {
                id: id,
                name: '',
                qty: 1,
                price: '1.00',
            },
        ]);
        console.log(items);
    };

    const submitBill = ev => {

        ev.preventDefault()

        const payload = {
            items: items
        }
        axiosClient.post('/post-claim', payload)
            .then(({ data }) => {
                setNotification("failed");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 500) {
                    setErrorNotification(JSON.stringify(response.data.message))
                }
            })

    }

    const deleteItemHandler = (id) => {
        setItems((prevItem) => prevItem.filter((item) => item.id !== id));
    };

    const editItemHandler = (event) => {
        const editedItem = {
            id: event.target.id,
            name: event.target.name,
            value: event.target.value,
        };

        const newItems = items.map((items) => {
            for (const key in items) {
                if (key === editedItem.name && items.id === editedItem.id) {
                    items[key] = editedItem.value;
                }
            }
            return items;
        });

        setItems(newItems);
    };

    const subtotal = items.reduce((prev, curr) => {
        console.log("prev", "curr", prev, curr)
        if (curr.name.trim().length > 0)
            return prev + Number(curr.price * Math.floor(curr.qty));
        else return prev;
    }, 0);
    let _total = 0.0;
    const t = items.map((i) => {
        _total += parseFloat(_total) + (i.price * i.qty);
        return _total;
    });
    console.log("subtotal", subtotal);
    const taxRate = (tax * subtotal) / 100;
    const discountRate = (discount * subtotal) / 100;
    const total = subtotal - discountRate + taxRate;

    return (

        <Paper elevation={1} sx={{ m: "10px", p: "20px" }}>
            <form>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Invoice Id</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="2023092801"
                                fullWidth
                                size='small'
                                disabled
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Date*</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="2023-09-28"
                                fullWidth
                                size='small'
                                disabled
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Customer Name*</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="John"
                                fullWidth
                                size='small'
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} md={3}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">First Name*</InputLabel>
                            <OutlinedInput
                                id="firstName"
                                type="text"
                                name="firstName"
                                placeholder="John"
                                fullWidth
                                size='small'
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12}>
                        <h5 style={{ fontSize: '14px', fontWeight: 'bold' }}>Detail</h5>
                        <TableContainer>
                            <Table>
                                <TableHead sx={{ backgroundColor: '#fafafa', borderTop: '1px solid #f0f0f0', borderBottom: '2px solid #f0f0f0' }}>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Qty</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {
                                        items.map((item) => (
                                            <InvoiceItem
                                                key={item.id}
                                                id={item.id}
                                                name={item.name}
                                                description={item.description}
                                                qty={item.qty}
                                                itemservices={item}
                                                setItems={setItems}
                                                price={item.price}
                                                onDeleteItem={deleteItemHandler}
                                                onEditItem={editItemHandler}
                                            />
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Button variant='outlined' startIcon={<AddIcon />} onClick={addItemHandler}>Add</Button>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName">Discount (%)</InputLabel>
                                    <OutlinedInput
                                        id="discount"
                                        type="number"
                                        name="discount"
                                        value={discount}
                                        onChange={(event) => setDiscount(event.target.value)}
                                        min="0"
                                        step="0.01"
                                        placeholder="0.0"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={6}>
                                <Stack spacing={1}>
                                    <InputLabel htmlFor="firstName">Tax(%)</InputLabel>
                                    <OutlinedInput
                                        id="tax"
                                        type="number"
                                        name="tax"
                                        value={tax}
                                        onChange={(event) => setTax(event.target.value)}
                                        min="0.01"
                                        step="0.01"
                                        placeholder="0.0"
                                        size='small'
                                        fullWidth
                                    />
                                </Stack>
                            </Grid>

                            <Grid item xs={12}>
                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ margin: "10px " }}>
                                    <p>Subtotal:</p>
                                    <p>Rs.{subtotal.toFixed(2)}</p>
                                </Stack>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ margin: "10px " }}>
                                    <p>Discount:</p>
                                    <p>({discount || '0'}%)Rs.{discountRate.toFixed(2)}</p>
                                </Stack>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ margin: "10px " }}>
                                    <p>Tax:</p>
                                    <p>({tax || '0'}%)Rs.{taxRate.toFixed(2)}</p>
                                </Stack>

                                <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ margin: "10px " }}>
                                    <p style={{ fontWeight: 'bold' }}>Grand Total: {t}</p>
                                    <p style={{ fontWeight: 'bold' }}>Rs.{total % 1 === 0 ? total : total.toFixed(2)}</p>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack spacing={1}>
                            <InputLabel htmlFor="firstName">Notes</InputLabel>
                            <OutlinedInput
                                id="notes"
                                type="text"
                                name="notes"
                                placeholder="Notes"
                                fullWidth
                            />
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack direction="flex" flexDirection="column">
                            <InputLabel htmlFor="firstName">Set Currency</InputLabel>
                            <Select
                                id="currency"
                                name="currency"
                                label="currency"
                                sx={{ width: "40%" }}
                                size='small'
                            >
                                <MenuItem value={10}>Nepali</MenuItem>
                                <MenuItem value={20}>US Dollar</MenuItem>
                                <MenuItem value={30}>Others</MenuItem>
                            </Select>
                        </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Stack direction="row"
                            justifyContent="flex-end"
                            alignItems="flex-end"
                            spacing={2}
                            sx={{ height: "100%" }}>
                            <Button variant='outlined'>Save</Button>
                            <Button variant='outlined'>Print</Button>
                        </Stack>
                    </Grid>
                </Grid>
                <button onClick={submitBill}> submit </button>
            </form>
        </Paper>
    );
};

export default InvoiceForm;