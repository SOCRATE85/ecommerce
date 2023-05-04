import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DataListing from "../../../../common/components/DataListing";
import {
    getAllCategories,
    clearErrors,
    deleteCategory,
    deleteCategoryReset
} from '../../../../store';
import Loader from '../../../layout/Loader/Loader';
import AddNewItemAction from '../../../../common/components/AddNewItemAction';
import { FormContainer } from '../../../../common/components/FormContainer';

const CategoryList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { categories, error, loading } = useSelector( state => state.categories);
    const { error: deleteError, isDeleted } = useSelector( state => state.deleteCategory );

    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/category/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteProductHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }
    ];
    const rows = [];
    categories && categories.forEach(category => {
        rows.push({
            id: category._id,
            name: category.name
        });
    });

    const deleteProductHandler = (id) => {
        dispatch(deleteCategory(id));        
    }

    useEffect(() => {
        if(isDeleted) {
            alert.success("Selected category deleted successfully.");
            navigate("/admin/categories");
            dispatch(getAllCategories());
            dispatch(deleteCategoryReset());
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        dispatch(getAllCategories());
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

    return <FormContainer pagetitle={"Category Listing"}>
        {loading? <Loader /> : <>
            <AddNewItemAction actionUrl="/admin/category/new" title={"Add Category"} />
            <DataListing columns={columns} rows={rows} />
        </>}
    </FormContainer>
}

export default CategoryList;
