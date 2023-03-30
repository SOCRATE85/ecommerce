import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Button, Box, Tabs, Tab } from "@mui/material";
import {DescriptionOutlined,SpellcheckOutlined} from "@mui/icons-material";
import { createBlogCategory, clearErrors } from "../../../../store/actions/blogCategoryAction";
import { getAllBlog } from "../../../../store/actions/blogAction";
import MetaData from "../../../layout/MetaData";
import Sidebar from "../../Sidebar";
import Loader from "../../../layout/Loader/Loader";
import { Navigate } from "react-router-dom";

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

class AddBlogCategory extends Component {
    state = {
        name: "",
        posts: null,
        meta_title: "",
        meta_tags: "",
        meta_description: "",
        status: 1,
        value: 0,
        redirect: false
    }

    handleChange = (_event, newValue) => {
      this.setState({value: newValue});
    };

    createCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", this.state.name);
        myForm.set("meta_title", this.state.meta_title);
        myForm.set("meta_tags", this.state.meta_tags);
        myForm.set("meta_description", this.state.meta_description);
        myForm.set("status", this.state.status);
        if(this.state.posts !== null){
            myForm.set("posts", this.state.posts);
        }
        await this.props.createBlogCategory(myForm);
        if(this.props.blogCategory.success) {
            this.setState({ redirect: true });
        }
    }

    componentDidMount() {
        this.props.getAllBlog();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSelectionModelChange = (posts) => {
        this.setState({posts});
    }

   render() {    
    const columns = [
        { field: "__check__", sortable: false},
        { field: "id", headerName: "ID"},
        { field: "title", headerName: "Title"},
        { field: "status", headerName: "Status", type: "number"},
        { field: "created_at", headerName: "Created At", type: "number"},
        { field: "updated_at", headerName: "Updated At", type: "number"}
    ];
    const { loading, blogs } = this.props.blogs;

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

    if(loading) {
        return (<Loader />);
    }
   
    if(this.state.redirect) {
        return <Navigate to={'/admin/blog/categories'} replace={true} />
    }

    return (<>
        <MetaData title={"Create Category"} />
        <div className="dashboard">
            <Sidebar />
            <div className="createCategoryContainer">
                <Typography component={"h1"}>New Category</Typography>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs category">
                            <Tab label="General" {...a11yProps(0)} />
                            <Tab label="Posts" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={this.state.value} index={0}>
                        <form className="createCategoryForm" encType="multipart/form-data" onSubmit={(e) => this.createCategorySubmitHandler(e)}>
                            <div>
                                <SpellcheckOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="Category Name" 
                                    required 
                                    value={this.state.name}
                                    onChange={(e) => this.setState({name: e.target.value})} 
                                />
                            </div>
                            <div>
                                <SpellcheckOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="Meta Title" 
                                    required 
                                    value={this.state.meta_title}
                                    onChange={(e) => this.setState({meta_title: e.target.value})} 
                                />
                            </div>
                            <div>
                                <SpellcheckOutlined />
                                <input 
                                    type={"text"} 
                                    placeholder="Meta Tag" 
                                    required 
                                    value={this.state.meta_tags}
                                    onChange={(e) => this.setState({meta_tags: e.target.value})} 
                                />
                            </div>
                            <div>
                                <DescriptionOutlined />
                                <textarea 
                                    placeholder="Meta Description" 
                                    value={this.state.meta_description} 
                                    onChange={(e) => this.setState({meta_description: e.target.value})} 
                                    cols={30} 
                                    rows={5}
                                ></textarea>
                            </div>
                            <div>
                                <DescriptionOutlined />
                                <select value={this.state.status} onChange={(e) => this.setState({status: e.target.value})}>
                                    <option value="">Select Status</option>
                                    <option value="1">Enable</option>
                                    <option value="0">Disable</option>
                                </select>
                            </div>
                            <Button id="createCategoryBtn" type="submit">Create</Button>
                        </form>
                    </TabPanel>
                    <TabPanel value={this.state.value} index={1}>
                        <DataGrid 
                            columns={columns} 
                            rows={rows} 
                            pageSize={10} 
                            disableSelectionOnClick 
                            className='productListTable'
                            autoHeight
                            rowsPerPageOptions={[5, 10, 15, 20, 25]}
                            checkboxSelection
                            onSelectionModelChange={this.onSelectionModelChange}
                        />
                    </TabPanel>
                </Box>                
            </div>
        </div>        
    </>);
   }
}

const mapStateToProps = state => {
    return {
        blogs: state.blogs,
        blogCategory: state.createBlogCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllBlog: () => dispatch(getAllBlog()),
        createBlogCategory: (data) => dispatch(createBlogCategory(data)),
        clearErrors: () => dispatch(clearErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlogCategory);
