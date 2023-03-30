import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { clearErrors, getAllBlog } from "../../../../store/actions/blogAction";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import "./ListBlogs.css";

const ListBlogs = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {blogs, loading, error} = useSelector(state => state.blogs);
    let columns = [
        { field: "id", headerName: "Id", flex: 1},
        { field: "status", headerName: "Status", renderCell: (params) => {
            return params.row.status === 1 ? "Enabled" : "Disabled";
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
            alert.error(error);
            dispatch(clearErrors);
        }
    },[alert, dispatch, error]);

    const deleteBlogHandler = (id) => {
        console.log(id);
    }

    if(loading) {return <Loader />}

    return (<FormContainer pagetitle={"Blog Listing"}>
        {loading || rows.length === 0 ? <Loader /> : <>
            <div className="text-left flex justify-end"><Button onClick={() => navigate("/admin/blog/new")}>Add Blog</Button></div>
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
    </FormContainer>);
}

export default ListBlogs;
