import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { getAdminProducts, clearErrors, deleteProduct } from '../../store/actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { Edit, Delete } from '@mui/icons-material';
import { FormContainer } from '../../common/components/FormContainer';
import { getValue } from '../../common/attribute';
import "./ProductList.css";
import { Button } from '@mui/material';
import { DELETE_PRODUCT_RESET } from '../../store/contants/productConstant';
import Hoc from '../layout/Hoc';

const ProductList = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { products, error, loading } = useSelector( state => state.products);
    const { error: deleteError, isDeleted } = useSelector( state => state.deleteProduct );

    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 200, flex: 1 },
        { field: "attributeset", headerName: "Attribute Set", minWidth: 100, flex: 1 },
        {
            field: "categories",
            headerName: "Categories",
            minWidth: 100,
            flex: 1,
            renderCell: (params) => {
                const num = params.row.categories.length;
                return <>{params.row.categories.map((category, index) => {
                    return (<Hoc key={index}>
                        {category.name}
                        {index === num - 1 ? <></> : <br />}
                    </Hoc>)
                })}</>
            }
        },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.5 },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/product/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteProductHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }
    ];

    const rows = [];
    products && products.forEach(product => {
        const name = getValue('name', product.data);
        const price = getValue('price', product.data);
        const stock = getValue('stock', product.data);
        rows.push({ 
            id: product._id,
            name,
            price,
            stock,
            attributeset: product.attributeset.attribute_set_name,
            categories: product.categories
        });   
    });

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));        
    }

    useEffect(() => {
        if(isDeleted) {
            alert.success("Product deleted successfully.");
            navigate("/admin/products");
            dispatch(getAdminProducts());
            dispatch({ type: DELETE_PRODUCT_RESET });
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        dispatch(getAdminProducts());
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

    return <FormContainer pagetitle={"Admin Product Listing"}>
        {loading ? <Loader /> : <DataGrid 
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

export default ProductList;
