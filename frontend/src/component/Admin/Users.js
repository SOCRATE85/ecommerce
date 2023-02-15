import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { Edit, Delete } from '@mui/icons-material';
import { FormContainer } from '../../common/components/FormContainer';
import { Button } from '@mui/material';
import { deleteUser, getAllUsers, clearErrors } from '../../store/actions/userAction';
import { DELETE_USER_RESET } from '../../store/contants/userContant';

import "./Users.css";

const Users = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { users, error, loading } = useSelector( state => state.allUsers);
    const { error: deleteError, isDeleted, message } = useSelector( state => state.profile );

    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "email", headerName: "Email", minWidth: 200, flex: 1 },
        { field: "name", headerName: "Name", type: "number", minWidth: 150, flex: 0.3 },
        { 
            field: "role", 
            headerName: "User Role", 
            type: "number", 
            minWidth: 270, 
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin" ? "greenColor" : "redColor";
            }
        },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/user/${params.getValue(params.id, "id")}`}><Edit /></Link>
                    <Button onClick={() => deleteUserHandler(params.getValue(params.id, "id"))}><Delete /></Button>
                </>);
            }
        }
    ];
    const rows = [];
    users && users.forEach(user => {
        rows.push({
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    });

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id));        
    }

    useEffect(() => {
        if(isDeleted) {
            alert.success(message);
            navigate("/admin/users");
            dispatch(getAllUsers());
            dispatch({ type: DELETE_USER_RESET });
        }
    },[alert, isDeleted, dispatch, navigate, message]);

    useEffect(() => {
        dispatch(getAllUsers());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[alert, error, dispatch]);

    useEffect(() => {
        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    },[alert, deleteError, dispatch]);

    if(loading) {
        return <Loader />
    }
    
    return <FormContainer pagetitle={"Admin Users Listing"}>
        <DataGrid 
            columns={columns} 
            rows={rows} 
            pageSize={10} 
            disableSelectionOnClick 
            className='userListTable'
            autoHeight
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
        />
    </FormContainer>
}

export default Users;
