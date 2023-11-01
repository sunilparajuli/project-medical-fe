import { useEffect, useState, useMemo } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import { MaterialReactTable } from 'material-react-table';
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
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InsuranceTable from "../components/insuranceData.jsx";
import AvatarPhoto from "../components/AvatarPhoto.jsx";
import SendIcon from '@mui/icons-material/Send';
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

const data = [
  {
    name: "John",
    age: 30
  },
  {
    name: "Sara",
    age: 25
  }
];
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext()
  const [chfid, setChfid] = useState('');
  const [patients, setPatients] = useState(null);
  const [patientCov, setPatientCov] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientlists, setPatientlists] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  // useEffect(() => {
  //     setLoading(true)
  //     axiosClient.get('/api/patients/')
  //       .then(({ data }) => {
  //         setLoading(false)
  //         setPatientlists(data.data)
  //       })
  //       .catch(() => {
  //         setLoading(false)
  //       })

  // }, [])

  // useEffect(() => {
  // }, [patientlists]);

  const [data, setData] = useState([]);

  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefetching, setIsRefetching] = useState(false);
  const [rowCount, setRowCount] = useState(0);

  //table state
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const fetchData = async () => {
    if (!data.length) {
      setIsLoading(true);
    } else {
      setIsRefetching(true);
    }

    try {
      const response = await axiosClient.get('/api/patients/', {
        params: {
          start: `${pagination.pageIndex * pagination.pageSize}`,
          size: `${pagination.pageSize}`,
          filters: JSON.stringify(columnFilters ?? []),
          globalFilter: globalFilter ?? '',
          sorting: JSON.stringify(sorting ?? []),
        },
      });

      const data = response.data.data;
      setData(data);
      setRowCount(data.count);
    } catch (error) {
      setIsError(true);
      console.error(error);
      return;
    }

    setIsError(false);
    setIsLoading(false);
    setIsRefetching(false);
  };

  // Use the fetchData function in your useEffect
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnFilters, globalFilter, pagination.pageIndex, pagination.pageSize, sorting]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getPatientData = async () => {
    try {
      const response = await axiosClient.get(`/api/patients/fhir/v4/patient/${chfid}/`);
      console.log('Patient data:', response.data);
      // Further processing of the response data
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      // Handle the error state
    }
  };

  const getPatientCoverageData = async () => {
    try {
      const response = await axiosClient.get(`/api/patients/fhir/v4/coverage/${chfid}/2021-01-01/`);
      console.log('Patient data:', response.data);
      // Further processing of the response data
      setPatientCov(response.data);
    } catch (error) {
      console.error('Error fetching patient data:', error);
      // Handle the error state
    }
  };
  const keyPress = () => {
    setPatients(null);
    setPatientCov(null);
    getPatientData();
    getPatientCoverageData();
    setOpen(true);
  }
  


  const columns = useMemo(
    () => [
      {
        //simple accessorFn that works the same way as an `accessorKey`
        accessorFn: (row) => row.identifier,
        id: 'identifier',
        header: 'identifier',
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({
              backgroundColor
                : theme.palette.primary.light,
              borderRadius: '0.25rem',
              color: '#fff',
              maxWidth: '9ch',
              p: '0.25rem',
            })}
          >
            {cell.getValue()?.toLocaleString?.('en-US', {
              style: 'currency',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </Box>
        ),
      },
      {
        //accessorFn function that combines multiple data together
        accessorFn: (row) => `${row.first_name} ${row?.middle_name} ${row.last_name}`,
        id: 'name',
        header: 'Name',
      },
      {
        //accessorFn used to access nested data, though you could just use dot notation in an accessorKey
        accessorFn: (row) => row.phone,
        id: 'phone',
        header: 'Phone',
      },
      {
        //accessorFn used to access nested data, though you could just use dot notation in an accessorKey
        accessorFn: (row) => row.email,
        id: 'email',
        header: 'email',
      },
      {
        //accessorFn used to access nested data, though you could just use dot notation in an accessorKey
        accessorFn: (row) => row.created_at,
        id: 'created_at',
        header: 'created_at',
      },
    ],
    [],
  );

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
            <Button variant="contained" startIcon={<SendIcon />} sx={{ marginTop: "20px" }}>Start OPD Visit</Button>
          </Box>
        </Modal>
      </div>

      <TableContainer component={Paper}>
        <TextField id="outlined-basic" label="standard" variant="standard" value={chfid} onChange={(e) => setChfid(e.target.value)} />
        <Button onClick={keyPress}> Search </Button>


      </TableContainer>
      <MaterialReactTable
        columns={columns}
        data={data}
        enableRowSelection
        getRowId={(row) => row.id}
        initialState={{ showColumnFilters: true }}
        manualFiltering
        manualPagination
        manualSorting
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
          >
            <Link to="/patient-add">

              <Button
                color="primary"
                //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
                // onClick={handleExportData}
                // startIcon={<FileDownloadIcon />}
                variant="contained"
              >
                Add New
              </Button>
            </Link>
          </Box>)}

        muiToolbarAlertBannerProps={
          isError
            ? {
              color: 'error',
              children: 'Error loading data',
            }
            : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onGlobalFilterChange={setGlobalFilter}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        rowCount={rowCount}
        enableRowActions
        renderRowActionMenuItems={({ row }) => [
          <MenuItem key="edit" onClick={() => console.info('Edit')}>
            Edit
          </MenuItem>,
          <MenuItem key="delete" onClick={() => console.info('Delete')}>
            Delete
          </MenuItem>,
          <MenuItem key="edit" onClick={() => console.info('Edit')}>
            CheckEligibility
          </MenuItem>,

        ]}
        state={{
          columnFilters,
          globalFilter,
          isLoading,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          sorting,
        }}
      />
    </div>
  )
}
