import React, { Component } from "react";
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {
    AccountTreeOutlined, 
    DescriptionOutlined, 
    SpellcheckOutlined 
} from "@mui/icons-material";
import { getAdminProducts } from '../../store/actions/productAction';
import { createCategory, getAllCategories, clearErrors } from '../../store/actions/categoryAction';
import { FormContainer } from "../../common/components/FormContainer";
import "./NewCategory.css";
import Loader from "../layout/Loader/Loader";
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

class NewCategory extends Component {
    state = {
        name: "",
        parent: null,
        description: "",
        imagePreview: [],
        images: [],
        value: 0,
        products: null,
        redirect: false
    }

    handleChange = (_event, newValue) => {
      this.setState({value: newValue});
    };

    createCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", this.state.name);
        if(this.state.parent !== null){
            myForm.set("parent", this.state.parent);
        }
        myForm.set("description", this.state.description);
        if(this.state.products !== null){
            myForm.set("products", this.state.products);
        }
        this.state.images.map((image) => {
            myForm.append("images", image);
            return true;
        });
        await this.props.createCategoryFn(myForm);
        if(this.props.createCategory.success) {
            this.setState({ redirect: true });
        }
    }

    createCategoryImageChange = (e) => {
        const files = Array.from(e.target.files);
        this.setState({ imagePreview: [], images: [] });
        const images = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    images.push([...this.state.imagePreview, reader.result]);
                    this.setState({ imagePreview: images, images: images });
                }
            }
            reader.readAsDataURL(file);
        });
        
    }

    componentDidMount() {
        this.props.getAdminProducts();
        this.props.getAllCategories();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    onSelectionModelChange = (products) => {
        this.setState({ products});
    }

   render() {    
    const columns = [
        { field: "__check__", sortable: false, minWidth: 40 },
        { field: "id", headerName: "ID", minWidth: 240, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.5 }
    ];
    const { loading, products } = this.props.products;
    const { loading: loadingCategory, categories } = this.props.categories;
    
    const rows = [];
    products && products.forEach(product => {
        rows.push({
            id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock
        });
    });

    if(this.state.redirect) {
        return <Navigate to={'/admin/categories'} replace={true} />
    }

    return (<FormContainer pagetitle={"Create Category"}>
        {loading || loadingCategory ? <Loader /> :<Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={this.state.value} onChange={this.handleChange} aria-label="basic tabs category">
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
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
                        <AccountTreeOutlined />
                        <select 
                            onChange={(e) => this.setState({parent: e.target.value})} 
                            defaultValue={this.state.parent}
                        >
                            <option value={""}>Choose Parent Category</option>
                            {
                                categories && categories.map(cat => {
                                    return <option key={cat._id} value={cat._id}>{cat.name}</option>
                                })
                            }
                        </select>
                    </div>
                    <div>
                        <DescriptionOutlined />
                        <textarea 
                            placeholder="Category Description" 
                            value={this.state.description} 
                            onChange={(e) => this.setState({description: e.target.value})} 
                            cols={30} 
                            rows={1}
                        ></textarea>
                    </div>
                    <div id="createCategoryFormFile">
                        <input 
                            type={"file"} 
                            name="avatar" 
                            accept="image/*" 
                            multiple 
                            onChange={(e) => this.createCategoryImageChange(e)} 
                        />
                    </div>
                    <div id="createCategoryFormImage">
                        {
                            this.state.imagePreview.length > 0 && this.state.imagePreview.map((image, index) => {
                                return <img key={index} src={image} alt="Avatar Preview" />
                            })
                        }
                    </div>
                    <Button 
                        id="createCategoryBtn" 
                        type="submit"
                    >
                        Create
                    </Button>
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
        </Box>}        
    </FormContainer>);
   }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        categories: state.categories,
        createCategory: state.createCategory
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAdminProducts: () => dispatch(getAdminProducts()),
        createCategoryFn: (data) => dispatch(createCategory(data)),
        getAllCategories: () => dispatch(getAllCategories()),
        clearErrors: () => dispatch(clearErrors())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NewCategory);