import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { clearErrors, getAllBlog, deleteBlog } from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import DataListing from "../../../../common/components/DataListing";
import AddNewItemAction from '../../../../common/components/AddNewItemAction';

const ListBlogs = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const {blogs, loading, error} = useSelector(state => state.blogs);
    let columns = [
        { field: "id", headerName: "Id", flex: 1},
        { field: "status", headerName: "Status", renderCell: (params) => {
            return params.row.status === true ? "Enabled" : "Disabled";
        }, flex: 1},
        { field: "title", headerName: "Title", type: "number", flex: 1},
        {
            field: "actions", 
            headerName: "Actions",
            type: "number",
            flex: 1,
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/blog/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteBlogHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }    
    ];

    const rows = [];
    blogs && blogs.forEach(blog => {
        rows.push({
            id: blog._id,
            title: blog.title,
            status:blog.status
        });
    });

    useEffect(() => {
        dispatch(getAllBlog());
    },[dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors);
        }
    },[alert, dispatch, error]);

    const deleteBlogHandler = (id) => {
       dispatch(deleteBlog(id));
    }

    if(loading) {return <Loader />}

    return (<FormContainer pagetitle={"Blog Listing"}>
        {loading || rows.length === 0 ? <Loader /> : <>
            <AddNewItemAction actionUrl="/admin/blog/new" title={"Add Blog"} />
            <DataListing 
                columns={columns} 
                rows={rows} 
            />
        </>}
    </FormContainer>);
}

export default ListBlogs;
