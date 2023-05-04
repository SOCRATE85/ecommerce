import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { FormContainer } from '../../../../common/components/FormContainer';
import Loader from '../../../layout/Loader/Loader';
import DataListing from "../../../../common/components/DataListing";
import { deleteUser, getAllUsers, clearErrors, deleteUserReset } from '../../../../store';
import { useThunk } from '../../../../common/hooks/use-thunk';
import AddNewItemAction from '../../../../common/components/AddNewItemAction';

const Users = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const [doGetAllUsers, isLoading, isError] = useThunk(getAllUsers);
    const [doDeleteUser, isDeleteLoading, isDeleteError] = useThunk(deleteUser)
    const { users } = useSelector( state => state.allUsers);
    const { isDeleted, message } = useSelector( state => state.profile );

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
                return params.row.role === "admin" ? "greenColor" : "redColor";
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
                    <Link to = {`/admin/user/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteUserHandler(params.row.id)}><Delete /></Button>
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
        doDeleteUser(id)       
    }
    useEffect(() => {
        doGetAllUsers();
    }, [doGetAllUsers]);

    useEffect(() => {
        if(isDeleted) {
            alert.success(message);
            navigate("/admin/users");
            doGetAllUsers();
            dispatch(deleteUserReset());
        }
    },[alert, isDeleted, dispatch, navigate, message, doGetAllUsers]);

    useEffect(() => {
        dispatch(getAllUsers());
    },[dispatch]);

    useEffect(() => {
        if(isError) {
            alert.error(isError.error);
            dispatch(clearErrors());
        }
    },[alert, isError, dispatch]);

    useEffect(() => {
        if(isDeleteError) {
            alert.error(isDeleteError.error);
            dispatch(clearErrors());
        }
    },[alert, isDeleteError, dispatch]);

    if(isLoading || isDeleteLoading) {
        return <Loader />
    }
    
    return <FormContainer pagetitle={"Admin Users Listing"}>
        <AddNewItemAction actionUrl="/admin/user/new" title={"Add User"} />
        <DataListing columns={columns} rows={rows} />
    </FormContainer>
}

export default Users;
