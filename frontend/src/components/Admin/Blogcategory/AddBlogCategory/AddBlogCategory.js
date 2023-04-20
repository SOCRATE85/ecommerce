import React, { useState, useEffect, useMemo } from "react";
import DataListing from "../../../../common/DataListing";
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {DescriptionOutlined,SpellcheckOutlined} from "@mui/icons-material";
import { createBlogCategory, clearErrors, getAllBlog, createBlogCategoryReset } from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import { useThunk } from "../../../../common/hooks/use-thunk";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>{children}</Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `category-tab-${index}`,
    'aria-controls': `category-tabpanel-${index}`,
  };
}

const AddBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [name, setName] = useState("")
    const [posts, setPosts] = useState([]);
    const [metaTitle, setyMetaTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");
    const [metaDescription, setMetaDescription] = useState("")
    const [status, setStatus] = useState(1);
    const [value, setValue] = useState(0);
    const [doGetAllBlog, isLoading, isBlogsError] = useThunk(getAllBlog);
    const {blogs} = useSelector(state => state.blogs);
    const {success} = useSelector(state => state.createBlogCategory);

    const columns = [
        { field: "__check__", sortable: false, minWidth: 40},
        { field: "id", headerName: "ID", minWidth: 200},
        { field: "title", headerName: "Title", minWidth: 200},
        { field: "status", headerName: "Status", type: "number", minWidth: 50},
        { field: "created_at", headerName: "Created At", type: "number", minWidth: 200},
        { field: "updated_at", headerName: "Updated At", type: "number", minWidth: 200}
    ];

    useEffect(() => {
        doGetAllBlog();
    }, [doGetAllBlog]);

    useEffect(() => {
        if(success) {
            alert.success("Blog category added successfully");
            navigate("/admin/blog/categories");
            dispatch(createBlogCategoryReset());
        }
    },[alert, success, navigate, dispatch])

    useEffect(() => {
        if(isBlogsError) {
            alert.error(isBlogsError.error);
            dispatch(clearErrors());
        }
    }, [isBlogsError, alert, dispatch]);

    const rows = useMemo(() => {
        const _rows = [];
        blogs && blogs.forEach(blog => {
            _rows.push({
                id: blog._id,
                title: blog.title,
                status: blog.status,
                created_at: blog.created_at,
                updated_at: blog.updated_at
            });
        });
        return _rows;
    },[blogs]);

    const handleChange = (_event, newValue) => {
      setValue(newValue);
    };

    const onSelectionModelChange = (items) => {
        setPosts(items);
    }

    const createCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("meta_title", metaTitle);
        myForm.set("meta_tags", metaTags);
        myForm.set("meta_description", metaDescription);
        myForm.set("status", status);
        if(posts !== null){
            myForm.set("posts", posts);
        }
        dispatch(createBlogCategory(myForm));
    }

    if(isLoading || isBlogsError) {
        return (<Loader />);
    }

    return (<><FormContainer pagetitle={'New Category'}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs category">
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="Posts" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <form 
                    className="createCategoryForm" encType="multipart/form-data" onSubmit={createCategorySubmitHandler}>
                        <div>
                            <SpellcheckOutlined />
                            <input 
                                type={"text"} 
                                placeholder="Category Name" 
                                required 
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div>
                            <SpellcheckOutlined />
                            <input
                                type={"text"}
                                placeholder="Meta Title"
                                required
                                value={metaTitle}
                                onChange={(e) => setyMetaTitle(e.target.value)} 
                            />
                        </div>
                        <div>
                            <SpellcheckOutlined />
                            <input 
                                type={"text"} 
                                placeholder="Meta Tag" 
                                required 
                                value={metaTags}
                                onChange={(e) => setMetaTags(e.target.value)} 
                            />
                        </div>
                        <div>
                            <DescriptionOutlined />
                            <textarea 
                                placeholder="Meta Description" 
                                value={metaDescription} 
                                onChange={(e) => setMetaDescription(e.target.value)}
                                cols={30} 
                                rows={5}
                            ></textarea>
                        </div>
                        <div>
                            <DescriptionOutlined />
                            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Select Status</option>
                                <option value="1">Enable</option>
                                <option value="0">Disable</option>
                            </select>
                        </div>
                        <Button id="createCategoryBtn" type="submit">Create</Button>
                    </form>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataListing 
                        columns={columns} 
                        rows={rows}
                        checkboxSelection
                        onSelectionModelChange={onSelectionModelChange}
                        selectedProducts = {posts}
                    />
                </TabPanel>
            </Box>
        </FormContainer>        
    </>);
}

export default AddBlogCategory;
