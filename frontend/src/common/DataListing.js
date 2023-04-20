import React from "react";
import { DataGrid } from '@mui/x-data-grid';

const DataListing = (props) => {
    return <DataGrid
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
