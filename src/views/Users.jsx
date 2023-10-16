import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { Link } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider.jsx";
import * as React from 'react';
import DataTable from '../components/Datagrid';
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });

  // Define your columns here
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'name', headerName: 'Name', width: 130 },
    {
      field: 'created_at',
      headerName: 'Joined Date',
      type: 'text',
      width: 90,
    }
  ];

  useEffect(() => {
    getUsers();
  }, [pagination]); // Trigger a data fetch when pagination changes

  const getUsers = () => {
    setLoading(true);
    // Make your API request using pagination.page and pagination.pageSize
    axiosClient.get('/users', {
      params: {
        page: pagination.page,
        perPage: pagination.pageSize,
      },
    })
      .then(({ data }) => {
        setLoading(false);
        setUsers(data.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (newPageSize) => {
    setPagination((prev) => ({ ...prev, pageSize: newPageSize }));
  };
  return (
    <>
      <div>
        <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center" }}>
          <h1>Users</h1>
          <Link className="btn-add" to="/users/new">Add new</Link>
        </div>

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
            {loading &&
              <tbody>
                <tr>
                  <td colSpan="5" class="text-center">
                    Loading...
                  </td>
                </tr>
              </tbody>
            }
            {!loading &&
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>{u.created_at}</td>
                    <td>
                      <Link className="btn-edit" to={'/users/' + u.id}>Edit</Link>
                      &nbsp;
                      <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            }
          </table>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={users}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        loading={loading}
        pagination={pagination}
      />

    </>
  )
}
