import React, { useState, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {
    AccountTreeOutlined, 
    DescriptionOutlined,
    SpellcheckOutlined 
} from "@mui/icons-material";
import { getAdminProducts } from '../../store/actions/productAction';
import { updateCategory, getAllCategories, getCategoryDetails, clearErrors } from '../../store/actions/categoryAction';
import { FormContainer } from "../../common/components/FormContainer";
import Loader from "../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import { UPDATE_CATEGORY_RESET } from "../../store/contants/categoryConstant";
import "./UpdateCategory.css";

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

const UpdateCategory = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { category, loading, error: categoryError } = useSelector( state => state.categoryDetails );
    const { isUpdated, loading: updateLoading, error: updateCategoryError } = useSelector( state => state.updateCategory );
    const { products, error: productError } = useSelector( state => state.products );
    const { categories, error: categoriesError } = useSelector( state => state.categories );
    const [ name, setName ] = useState("");
    const [ parent, setParent] = useState(null);
    const [ description, setDescription ] = useState("");
    const [ oldImages, setOldImages ] = useState([]);
    const [ imagePreview, setImagePreview ] = useState([]);
    const [ images, setImages ] = useState([]);
    const [value, setValue] = useState(0);
    const [ selectedProducts, setSelectedProducts ] = useState([]);
    const categoryId = params.id;
    
    useEffect(() => {
        if(isUpdated) {
            alert.success("Category is updated successfully");
            navigate("/admin/categories");
            dispatch({ type: UPDATE_CATEGORY_RESET });
        }
    }, [alert, isUpdated, navigate, dispatch]);

    useEffect(() => {
        if(category && category._id !== categoryId) {
            dispatch(getCategoryDetails(categoryId));
        } else {
            let _productid = [];
            category && category.products && category.products.forEach((product) => {
                _productid.push(product.product);
            });
            setName(category.name);
            setDescription(category.description);
            setSelectedProducts(_productid);
            setParent(category.parent);
            setOldImages(category.images);           
        }       
    },[dispatch, category, categoryId]);

    useEffect(() => {
        if(categoryError) {
            alert.error(categoryError);
            dispatch(clearErrors());
        }
        if(productError) {
            alert.error(productError);
            dispatch(clearErrors());
        }
        if(categoriesError) {
            alert.error(categoriesError);
            dispatch(clearErrors());
        }
        if(updateCategoryError) {
            alert.error(updateCategoryError);
            dispatch(clearErrors());
        }
    },[dispatch, alert, categoryError, productError, categoriesError, updateCategoryError]);

    useEffect(() => {        
        dispatch(getAdminProducts());
        dispatch(getAllCategories());
    },[dispatch]);

    const columns = [
        { field: "__check__", sortable: false, minWidth: 40 },
        { field: "id", headerName: "ID", minWidth: 240, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.5 }
    ];

    const rows = [];
    products && products.forEach(product => {
        rows.push({
            __check__: true,
            id: product._id,
            name: product.name,
            price: product.price,
            stock: product.stock
        });
    });

    const handleChange = (_event, newValue) => {
      setValue(newValue);
    };

    const onSelectionModelChange = (_products) => {
        setSelectedProducts(_products);
    }
    
    const updateCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        if(parent !== null){
            myForm.set("parent", parent);
        }
        myForm.set("description", description);
        if(products !== null){
            myForm.set("products", selectedProducts);
        }
        images.map((image) => {
            myForm.append("images", image);
            return true;
        });

        dispatch(updateCategory(myForm, categoryId));
        dispatch(getCategoryDetails(categoryId));
    }

    const updateCategoryImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagePreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImagePreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            }
            reader.readAsDataURL(file);
        });
    }

    if(loading || updateLoading) {
        return (<Loader></Loader>);
    }

    return (<FormContainer pagetitle={"Update Category"}>
        {loading? <Loader /> : <form encType="multipart/form-data" onSubmit={(e) => updateCategorySubmitHandler(e)}>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs category">
                        <Tab label="General" {...a11yProps(0)} />
                        <Tab label="Products" {...a11yProps(1)} />
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
                            <AccountTreeOutlined />
                            <select 
                                onChange={(e) => setParent(e.target.value)} 
                                defaultValue={parent}
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
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                cols={30} 
                                rows={6}
                            ></textarea>
                        </div>
                        <div id="updateCategoryFormFile">
                            <input 
                                type={"file"} 
                                name="avatar" 
                                accept="image/*" 
                                multiple 
                                onChange={(e) => updateCategoryImageChange(e)} 
                            />
                        </div>
                        {oldImages && <div id="updateCategoryFormImage">
                            {
                                oldImages.map((image, index) => {
                                    return <img key={index} src={image.url} alt="Old Product Preview" />
                                })
                            }
                        </div>}

                        {imagePreview.length !== 0 && <div id="updateCategoryFormImage">
                            {
                                imagePreview.map((image, index) => {
                                    return <img key={index} src={image} alt="Product Preview" />
                                })
                            }
                        </div>}
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                <DataGrid 
                        columns={columns} 
                        rows={rows} 
                        pageSize={10} 
                        disableSelectionOnClick 
                        className='productListTable'
                        autoHeight
                        rowsPerPageOptions={[5, 10, 15, 20, 25]}
                        checkboxSelection
                        onSelectionModelChange={onSelectionModelChange}
                        selectionModel={selectedProducts}
                    />
                </TabPanel>
            </Box>  
            <Button id="updateCategoryBtn" type="submit">Update</Button>
        </form>}        
    </FormContainer>);
}
 
export default UpdateCategory;