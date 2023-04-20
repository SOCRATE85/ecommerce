import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { LaunchOutlined } from "@mui/icons-material";
import MetaData from "../layout/MetaData";
import { myOrders, clearErrors } from "../../store";
import Loader from "../layout/Loader/Loader";
import "./Orders.css";

const Orders = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading: loadingOrders, error, orders  } = useSelector( state => state.myOrders);
    const rows = [];
    const columns = [
        { field: "id", headerName: "Order Id", minWidth: 230, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5, cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "grrenColor" : "redColor";
        }},
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.5 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 100, flex: 0.5 },
        { 
            field: "actions", 
            headerName: "Actions", 
            flex: 0.3, 
            minWidth: 150, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<Link to={`/order/${params.getValue(params.id,"id")}`}><LaunchOutlined /></Link>)
            }
        }
    ];

    useEffect(() => {
        dispatch(myOrders());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    }, [alert, error, dispatch]);

    if(loadingOrders){
        return <Loader />
    }

    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice
        })
    })

    return <>
        <MetaData title={`Orders`} />
        <div className="myOrderPage">
            <DataGrid 
                rows={rows} 
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
                className="myOrdersTable"
                autoHeight
            />
        </div>
    </>
}

export default Orders;
