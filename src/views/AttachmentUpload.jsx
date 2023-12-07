import React, { useState } from 'react';
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";
import {
  Paper,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';


const MyForm = () => {
    const { setNotification, setErrorNotification } = useStateContext();
  const [claims, setClaims] = useState({
    claim: '363E8415-2AB4-498D-9F97-4C15BCBA3C9F',
    documents: [
      {
        filename: 'test_pdf.pdf',
        mime: 'application/pdf',
        date: '2023-04-06',
        title: 'test_pdf',
        document: '',
      },
    ],
  });

  const handleAddDocument = () => {
    setClaims((prevState) => ({
      ...prevState,
      documents: [
        ...prevState.documents,
        {
          filename: '',
          mime: '',
          date: '',
          title: '',
          document: '',
        },
      ],
    }));
  };

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    setClaims((prevState) => ({
      ...prevState,
      documents: prevState.documents.map((doc, i) =>
        i === index ? { ...doc, [name]: value } : doc
      ),
    }));
  };

  const handleFileChange = (index, event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setClaims((prevState) => ({
        ...prevState,
        documents: prevState.documents.map((doc, i) =>
          i === index
            ? {
                ...doc,
                filename: file.name,
                mime: file.type,
                document: reader.result,
              }
            : doc
        ),
      }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    console.log("claims", claims)
    try {
      const response = await axiosClient.post('/api/patients/fhir/v4/attachments/upload/', claims);
      console.log(response.data);
      // Handle success
    } catch (error) {
        setErrorNotification(error.response.data);
      console.error('Error submitting form:', error);
      // Handle error
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Document</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {claims.documents.map((doc, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextField
                    type="date"
                    name="date"
                    value={doc.date}
                    onChange={(e) => handleInputChange(index, e)}
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(index, e)}
                    style={{ display: 'none' }}
                    id={`file-input-${index}`}
                  />
                  <label htmlFor={`file-input-${index}`}>
                    <Button component="span" variant="contained">
                      Upload Document
                    </Button>
                  </label>
                  {doc.document && (
                    <div>
                      {doc.mime.startsWith('image') ? (
                        <img src={doc.document} alt={doc.filename} style={{ maxWidth: '100px' }} />
                      ) : (
                        <p>{doc.filename}</p>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={handleAddDocument} variant="contained" color="primary">
                    Add Document
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={handleFormSubmit} variant="contained" color="primary" style={{ marginTop: '20px' }}>
        Submit Form
      </Button>
    </Paper>
  );
};

export default MyForm;
