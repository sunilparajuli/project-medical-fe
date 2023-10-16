import React from 'react';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const InsuranceTable = ({ insuranceData, patientPhoto }) => {
    // Transform your data into a format that DataGrid can use
    const rows = React.useMemo(() => {
        return insuranceData?.insurance?.map((insurance, index) => ({
            id: index,
            schemeName: insurance?.extension.find((ext) => ext.url === 'schemeName')?.valueString || '',
            inforce: insurance?.inforce ? 'Yes' : 'No',
            allowedMoney: insurance.item[0]?.benefit[0]?.allowedMoney.value || 0,
            usedMoney: insurance.item[0]?.benefit[0]?.usedMoney.value || 0,
        }));
    }, [insuranceData]);

    const columns = React.useMemo(
        () => [
            { field: 'schemeName', headerName: 'Scheme Name', flex: 1 },
            { field: 'inforce', headerName: 'Inforce', flex: 1 },
            { field: 'allowedMoney', headerName: 'Allowed Money', flex: 1 },
            { field: 'usedMoney', headerName: 'Used Money', flex: 1 },
        ],
        []
    );
    return (
        <div>
            {/* <h2>Patient Photo</h2>
            <img src={`${patientPhoto?.photo[0]?.data}`} alt="Patient" style={{ height: 100 }} /> */}
            <div>
                <Table size="small" aria-label="dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Scheme Name</TableCell>
                            <TableCell>Inforce</TableCell>
                            <TableCell>Allowed Money</TableCell>
                            <TableCell>Used Money</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows?.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.schemeName}</TableCell>
                                <TableCell>{row.inforce}</TableCell>
                                <TableCell>{row.allowedMoney}</TableCell>
                                <TableCell>{row.usedMoney}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

            </div>

        </div>
    );
};

export default InsuranceTable;
