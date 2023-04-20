import React, { useEffect } from 'react';
import DataListing from "../../../../common/DataListing";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllOrders, clearErrors, deleteOrder, deleteOrderReset } from '../../../../store';
import { Link, useNavigate } from 'react-router-dom';
import { FormContainer } from '../../../../common/components/FormContainer';
import Loader from '../../../layout/Loader/Loader';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import "./OrderList.css";

const OrderList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { orders, error, loading } = useSelector( state => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector( state => state.updateOrder );

    const columns = [        
        { field: "id", headerName: "Order Id", minWidth: 230, flex: 1 },
        { field: "status", headerName: "Status", minWidth: 150, flex: 0.5, cellClassName: (params) => {
            return params.getValue(params.id, "status") === "Delivered" ? "grrenColor" : "redColor";
        }},
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 100, flex: 0.5 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 100, flex: 0.5 },
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

    return <FormContainer pagetitle={"Admin Order Listing"}>
        {loading ? <Loader /> : <DataListing columns={columns} rows={rows} />}
    </FormContainer>
}

export default OrderList;
