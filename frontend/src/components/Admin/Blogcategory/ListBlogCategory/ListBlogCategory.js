import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAlert } from "react-alert";
import DataListing from "../../../../common/components/DataListing";
import {FormContainer} from "../../../../common/components/FormContainer";
import AddNewItemAction from '../../../../common/components/AddNewItemAction';
import {
    getAllBlogCategories,
    clearErrors,
    deleteBlogCategory,
    deleteBlogCategoryReset
} from "../../../../store";
import Loader from "../../../layout/Loader/Loader";
import { useThunk } from "../../../../common/hooks/use-thunk";

const ListBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [doGetAllBlogCategory, isLoadingBlogCategory, blogCategoryError] = useThunk(getAllBlogCategories);
    const [doDeleteBlogCategory, isLoadingDelete, errorDelete] = useThunk(deleteBlogCategory);
    const { blogcategories } = useSelector(state => state.blogCategories);
    const { isDeleted } = useSelector(state => state.deleteBlogCategory);

    useEffect(() => {
        if(isDeleted) {
            alert.success("Category deleted successfully.");
            navigate("/admin/blog/category");
            doGetAllBlogCategory();
            dispatch(deleteBlogCategoryReset());
        }
    },[alert, isDeleted, dispatch, navigate, doGetAllBlogCategory]);

    useEffect(() => {
        if(blogCategoryError) {
            alert.error(blogCategoryError.error);
            dispatch(clearErrors());
        }
        if(errorDelete) {
            alert.error(errorDelete.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, blogCategoryError, errorDelete]);

    useEffect(() => {
        doGetAllBlogCategory();
    },[doGetAllBlogCategory]);

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
        doDeleteBlogCategory(id)
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
        {isLoadingBlogCategory || isLoadingDelete ? <Loader /> : <>
            <AddNewItemAction actionUrl="/admin/blog/category/new" title={"Add Category"} />
            <DataListing columns={columns} rows={rows} />
        </>}
    </FormContainer>)
}

export default ListBlogCategory;
