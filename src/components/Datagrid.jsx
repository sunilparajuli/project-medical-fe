import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';

function DataTable({columns, data, loading, pagination, handlePageChange, handlePageSizeChange}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={data}
        columns={columns}
        loading={loading}
        pagination
        pageSizeOptions={[5, 10, 20]}
        rowCount={100} // You should set the total number of rows here
        paginationMode="server"
        page={pagination.page}
        pageSize={pagination.pageSize}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
}

export default DataTable;
