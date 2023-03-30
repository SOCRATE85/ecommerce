import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAlert } from "react-alert";
import { FormContainer } from "../../../../common/components/FormContainer";
import { getAllBlogCategories, clearErrors, deleteBlogCategory } from "../../../../store/actions/blogCategoryAction";
import { DELETE_BLOG_CATEGORY_RESET } from "../../../../store/contants/blogCategoryContent";
import Loader from "../../../layout/Loader/Loader";
import "./ListBlogCategory.css";

const ListBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { blogcategories, loading, error } = useSelector(state => state.blogCategories);
    const { isDeleted, loading: loadingDelete, error: errorDelete} = useSelector(state => state.deleteBlogCategory);
    
    useEffect(() => {
        if(isDeleted) {
            alert.success("Category deleted successfully.");
            navigate("/admin/blog/category");
            dispatch(getAllBlogCategories());
            dispatch({ type: DELETE_BLOG_CATEGORY_RESET });
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(errorDelete) {
            alert.error(errorDelete);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error, errorDelete]);

    useEffect(() => {
        dispatch(getAllBlogCategories());
    },[dispatch]);

    const columns = [        
        { field: "id", headerName: "Category Id", flex: 1 },
        { field: "name", headerName: "Category Name", flex: 1 },
        { field: "status", headerName: "Status", flex: 1, cellClassName: (params) => {
            return params.row.status === 1 ? "grrenColor" : "redColor";
        }},
        { 
            field: "actions", 
            headerName: "Actions",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/blog/category/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteCategoryHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }
    ];
    
    const deleteCategoryHandler = (id) => {
        dispatch(deleteBlogCategory(id));
    }

    const rows = [];
    blogcategories && blogcategories.forEach(category => {
        rows.push({
            id: category._id,
            name: category.name,
            status: category.status
        });
    });

    return (<FormContainer pagetitle={"Manage Blog Category"}>
        {loading || loadingDelete ? <Loader /> : <>
            <div className="add-category"><Button onClick={() => navigate("/admin/blog/category/new")}>Add Category</Button></div>
            <DataGrid 
                columns={columns} 
                rows={rows} 
                pageSize={10} 
                disableSelectionOnClick 
                className='productListTable'
                autoHeight
                rowsPerPageOptions={[5, 10, 15, 20, 25]}
            />
        </>}
    </FormContainer>)
}

export default ListBlogCategory;
