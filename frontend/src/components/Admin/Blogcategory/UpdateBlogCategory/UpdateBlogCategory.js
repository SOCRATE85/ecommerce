import React, { useState, useEffect } from "react"
import DataListing from "../../../../common/DataListing";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {
    DescriptionOutlined,
    SpellcheckOutlined 
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import { FormContainer } from '../../../../common/components/FormContainer'
import Loader from "../../../layout/Loader/Loader";
import { clearErrors, getBlogCategoryDetail, updateBlogCategory, updateBlogCategoryReset, getAllBlog } from "../../../../store";

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

const UpdateBlogCategory = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const {blogcategory, loading, error} = useSelector(state => state.blogCategory);
    const {isUpdated, loading: loadingUpdate} = useSelector(state => state.updateBlogCategory);
    const {blogs} = useSelector(state => state.blogs);
    const [name, setName] = useState("");
    const [metaTitle, setMetaTitle] = useState("");
    const [metaTags, setMetaTags] = useState("");
    const [metaDescription, setMetaDescription] = useState("");
    const [status, setStatus] = useState("");    
    const [value, setValue] = useState(0);
    const [ selectedBlogs, setSelectedBlogs ] = useState([]);
    const categoryId = params.id;
    
    useEffect(() => {
        if(blogcategory && blogcategory._id !== categoryId) {
            dispatch(getBlogCategoryDetail(categoryId));
        } else {
            setName(blogcategory.name);
            setSelectedBlogs(blogcategory.posts);
            setMetaTitle(blogcategory.meta_title);
            setMetaTags(blogcategory.meta_tags);
            setMetaDescription(blogcategory.meta_description);
            setStatus(blogcategory.status); 
        }
    },[blogcategory, dispatch, categoryId]);

    useEffect(() => {
        if(isUpdated) {
            alert.success("Category is updated successfully");
            navigate("/admin/blog/categories");
            dispatch(getBlogCategoryDetail(categoryId));
            dispatch(updateBlogCategoryReset());
        }
    },[dispatch, isUpdated, alert, navigate, categoryId]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    },[dispatch, alert, error]);

    useEffect(() => {
        dispatch(getAllBlog());
    },[dispatch]);

    const updateCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("meta_title", metaTitle);
        myForm.set("meta_tags", metaTags);
        myForm.set("meta_description", metaDescription);
        myForm.set("status", status);
        if(selectedBlogs.length > 0){
            myForm.set("posts", selectedBlogs);
        }
        dispatch(updateBlogCategory({categoryData: myForm, categoryId}));
    }

    const handleChange = (_event, newValue) => {
      setValue(newValue);
    };

    const onSelectionModelChange = (_blogs) => {
        setSelectedBlogs(_blogs);
    }

    if(loading || loadingUpdate) {return <Loader/>}
    
    const columns = [
        { field: "__check__", sortable: false, minWidth: 40},
        { field: "id", headerName: "ID", minWidth: 200},
        { field: "title", headerName: "Title", minWidth: 200},
        { field: "status", headerName: "Status", type: "number", minWidth: 50},
        { field: "created_at", headerName: "Created At", type: "number", minWidth: 200},
        { field: "updated_at", headerName: "Updated At", type: "number", minWidth: 200}
    ];
    const rows = [];
    blogs && blogs.forEach(blog => {
        rows.push({
            id: blog._id,
            title: blog.title,
            status: blog.status,
            created_at: blog.created_at,
            updated_at: blog.updated_at
        });
    });

    return (<FormContainer pageTitle={"Update Category"}>
        {loading || loadingUpdate ? <loader /> : <form className="createCategoryForm" encType="multipart/form-data" onSubmit={(e) => updateCategorySubmitHandler(e)}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs category">
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="Posts" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="updateCategoryForm">
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
                                onChange={(e) => setMetaTitle(e.target.value)} 
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
                    </div>                        
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <DataListing 
                        columns={columns} 
                        rows={rows}
                        checkboxSelection
                        onSelectionModelChange={onSelectionModelChange}
                        selectedProducts = {selectedBlogs}
                    />
                </TabPanel>
            </Box>
            <div className="py-3 px-0 ">
                <Button id="createCategoryBtn" type="submit">Update</Button>
            </div>
        </form>}
    </FormContainer>);
}

export default UpdateBlogCategory;
