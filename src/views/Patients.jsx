import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InsuranceTable from "../components/insuranceData.jsx";
import AvatarPhoto from "../components/AvatarPhoto.jsx";
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext()
  const [chfid, setChfid] = useState('');
  const [patients, setPatients] = useState(null);
  const [patientCov, setPatientCov] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('User was successfully deleted')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }


  const getPatientData = () => {
    setLoading(true);
    axiosClient.get(`/get-patient-details/${chfid}`)
      .then(({ data }) => {
        setLoading(false);
        setPatients(data);
        handleOpen(); // Open the modal when data is fetched.
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const getPatientCoverageData = () => {
    setLoading(true);
    var todayDate = new Date().toISOString().slice(0, 10);
    axiosClient.post(`get-patient-coverage/${chfid}/${todayDate}`)
      .then(({ data }) => {
        setLoading(false);
        setPatientCov(data);
        handleOpen(); // Open the modal when data is fetched.
      })
      .catch(() => {
        setLoading(false);
      });
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const keyPress = () => {
    setPatients(null);
    setPatientCov(null);
    getPatientData();
    getPatientCoverageData();
  }

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, width: 800 }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {chfid}
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <AvatarPhoto photo={patientCov?.patient} />
              {patients != null ? (<div>
                <TableContainer component={Paper}>
                  <Table size="small" aria-label="patient table" border="1px" cellPadding={0}>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Date of Birth</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Telecom</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {patients?.entry?.map((entry, index) => {
                        const patient = entry.resource;
                        const name = `${patient?.name[0]?.given[0]} ${patient?.name[0]?.family}`;
                        const dateOfBirth = patient?.birthDate;
                        const address = patient?.address[0]?.text || '';
                        const telecom = patient?.telecom?.map((t) => t.value).join(', ');

                        return (
                          <TableRow key={index}>
                            <TableCell>{name}</TableCell>
                            <TableCell>{dateOfBirth}</TableCell>
                            <TableCell>{address}</TableCell>
                            <TableCell>{telecom}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>) : <CircularProgress />}
            </Typography>

            {patientCov != null ? (<InsuranceTable insuranceData={patientCov} patientPhoto={patientCov?.patient} />) : <CircularProgress />}
          </Box>
        </Modal>
      </div>
      <TableContainer component={Paper}>
        <TextField id="outlined-basic" label="standard" variant="standard" value={chfid} onChange={(e) => setChfid(e.target.value)} />
        <Button onClick={keyPress}> Search </Button>
        <Link to="/patient-add">
          <Button > Add New </Button>
        </Link>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Dessert (100g serving)</TableCell>
              <TableCell align="right">Calories</TableCell>
              <TableCell align="right">Fat&nbsp;(g)</TableCell>
              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  )
}
