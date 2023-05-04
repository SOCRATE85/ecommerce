import React from "react";
import { DataGrid } from '@mui/x-data-grid';
import './DataListing.css';

const DataListing = (props) => {
    return <DataGrid
        sx={{
            boxShadow: 2,
            border: 2,
            borderColor: 'primary.light',
            '& .MuiDataGrid-cell:hover': {
            color: 'primary.main'
            },
        }}
        getRowClassName={(params) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'}
        columns={props.columns} 
        rows={props.rows} 
        pageSize={10} 
        disableSelectionOnClick 
        className='productListTable'
        autoHeight
        rowsPerPageOptions={[5, 10, 15, 20, 25]}
        checkboxSelection = {props.checkboxSelection}
        onSelectionModelChange={props.onSelectionModelChange}
        selectionModel={props.selectedProducts}
    />
}

export default DataListing;
