import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAllCategories, clearErrors, deleteCategory } from '../../../../store/actions/categoryAction';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../../layout/Loader/Loader';
import { Edit, Delete } from '@mui/icons-material';
import { FormContainer } from '../../../../common/components/FormContainer';
import "./CategoryList.css";
import { Button } from '@mui/material';
import { DELETE_CATEGORY_RESET } from '../../../../store/contants/categoryConstant';

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
                    <Link to = {`/admin/category/${params.getValue(params.id, "id")}`}><Edit /></Link>
                    <Button onClick={() => deleteProductHandler(params.getValue(params.id, "id"))}><Delete /></Button>
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
            dispatch({ type: DELETE_CATEGORY_RESET });
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        dispatch(getAllCategories());
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

    return <FormContainer pagetitle={"Category Listing"}>
        {loading? <Loader /> : <DataGrid 
            columns={columns}
            rows={rows} 
            pageSize={10} 
            disableSelectionOnClick 
            className='productListTable'
            autoHeight
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
        />}
    </FormContainer>
}

export default CategoryList;
