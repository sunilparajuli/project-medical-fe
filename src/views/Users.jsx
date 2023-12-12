import { useEffect, useState, useMemo } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import * as React from 'react';
import DataTable from '../components/Datagrid';
import {Box, Button, MenuItem} from '@mui/material';
import { MaterialReactTable } from 'material-react-table';
// Redux action
import { fetchUsers } from "../redux/actions/users.js";
import { useDispatch, useSelector } from "react-redux";
export default function Users() {
  //const [users, setUsers] = useState([]);
  const { setNotification } = useStateContext();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user);

  
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: users?.pagination?.page_size || 0,
  });

  const handlePaginationChange = (newPagination) => {
    setPagination(newPagination);

    // Trigger data fetch based on new pagination parameters
    dispatch(fetchUsers(newPagination.pageIndex,
             newPagination.pageSize));
    // dispatch(getUsers(newPagination.pageIndex, newPagination.pageSize));
  };



  const columns = useMemo(
    () => [
      {
        //simple accessorFn that works the same way as an `accessorKey`
        accessorFn: (row) => row.identifier,
        id: 'username',
        header: 'username',
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
            {cell.getValue()}
          </Box>
        ),
      },
      {
        //accessorFn used to access nested data, though you could just use dot notation in an accessorKey
        accessorFn: (row) => row.name,
        id: 'name',
        header: 'name',
      },
      {
        //accessorFn used to access nested data, though you could just use dot notation in an accessorKey
        accessorFn: (row) => row.phone,
        id: 'phone',
        header: 'phone',
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

  // Define your columns here


  useEffect(() => {
    // getUsers();
    dispatch(fetchUsers());
  }, [dispatch]); // Trigger a data fetch when pagination changes


  return (

    <>
      <div>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <h1>Users</h1>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>
{/* 
        <div className="card animated fadeInDown">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Create Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {users.loading && !users.loadedUsers ? (
            <tr>
              <td colSpan="5" className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            users.loadedUsers && users.loadedUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={`/users/${u.id}`}>
                    Edit
                  </Link>
                  &nbsp;
                  <button className="btn-delete" onClick={(ev) => onDeleteClick(u)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
            </tbody>
          </table>
        </div> */}
      </div>
      {/* {!!users && (<DataTable
        columns={columns}
        data={users}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
        pagination={pagination}
      />)} */}

<MaterialReactTable
      columns={columns}
      data={users?.loadedUsers || []} // Use the loadedUsers from Redux state
      enableRowSelection
      getRowId={(row) => row.id}
      initialState={{ showColumnFilters: true }}
      manualFiltering
      manualPagination
      manualSorting
      renderTopToolbarCustomActions={({ table }) => (
        <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/patient-add">
            <Button color="primary" variant="contained">
              Add New
            </Button>
          </Link>
        </Box>
      )}
      muiToolbarAlertBannerProps={
        users.errorMessage
          ? {
              color: 'error',
              children: 'Error loading data',
            }
          : undefined
      }
      // onColumnFiltersChange={[]} // Provide appropriate logic for filtering
      // onGlobalFilterChange={[]} // Provide appropriate logic for global filtering
      onPaginationChange={handlePaginationChange} // Provide appropriate logic for pagination
      // onSortingChange={[]} // Provide appropriate logic for sorting
      rowCount={users.pagination?.count || 0} // Use the count from pagination information
      enableRowActions
      renderRowActionMenuItems={({ row }) => [
        <MenuItem key="edit" onClick={() => navigate(`/users/${row.id}`)}>
          Edit
        </MenuItem>,
        <MenuItem key="delete" onClick={() => console.info('Delete')}>
          Delete
        </MenuItem>,
        <MenuItem key="edit" onClick={() => console.info('Edit')}>
          Check Eligibility
        </MenuItem>,
      ]}
      state={{
        loading : users.userLoading,
        showAlertBanner: users.errorMessage,
        showProgressBars: users.userLoading,
      }}
    />
    </>
  )
}
