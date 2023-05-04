import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { getAllOrders, clearErrors, deleteOrder, deleteOrderReset } from '../../../../store';
import DataListing from "../../../../common/components/DataListing";
import { FormContainer } from '../../../../common/components/FormContainer';
import Loader from '../../../layout/Loader/Loader';

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { orders, error, loading } = useSelector( state => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector( state => state.updateOrder );

    const columns = [        
        { field: "id", headerName: "Order Id", minWidth: 230, flex: 1 },
        { field: "name", headerName: "Customer Name", type: "number", minWidth: 100, flex: 0.5, renderCell: (params) => {
            return <Link to={`/admin/user/${params.row.userid}`}>{params.row.name}</Link>
        }},
        { field: "email", headerName: "Customer Email", type: "number", minWidth: 100, flex: 0.5, renderCell: (params) => {
            return <Link to={`/admin/user/${params.row.userid}`}>{params.row.email}</Link>
        } },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5, cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "grrenColor" : "redColor";
        }},
        { field: "itemsQty", headerName: "Qty", type: "number", minWidth: 50 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 50 },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/order/${params.getValue(params.id, "id")}`}><Edit /></Link>
                    <Button onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}><Delete /></Button>
                </>);
            }
        }
    ];
    
    const rows = [];
    orders && orders.forEach(item => {
        rows.push({
            id: item._id,
            userid: item.user._id,
            name: item.user.name,
            email: item.user.email,
            status: item.orderStatus,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice
        });
    });

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));        
    }

    useEffect(() => {
        if(isDeleted) {
            alert.success("Order deleted successfully.");
            navigate("/admin/orders");
            dispatch(getAllOrders());
            dispatch(deleteOrderReset());
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        dispatch(getAllOrders());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    },[alert, error, dispatch]);

    useEffect(() => {
        if(deleteError) {
            alert.error(deleteError.error);
            dispatch(clearErrors());
        }
    },[alert, deleteError, dispatch]);
    console.log('orders: ', orders);
    return <FormContainer pagetitle={"Admin Order Listing"}>
        {loading ? <Loader /> : <DataListing columns={columns} rows={rows} />}
    </FormContainer>
}

export default OrderList;
