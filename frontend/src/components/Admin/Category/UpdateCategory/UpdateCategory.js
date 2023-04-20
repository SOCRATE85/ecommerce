import React, { useState, useEffect, useMemo } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {
    AccountTreeOutlined, 
    DescriptionOutlined,
    SpellcheckOutlined
} from "@mui/icons-material";
import {
    updateCategory,
    getAllCategories,
    getCategoryDetails,
    clearErrors,
    updateCategoryReset,
    getAdminProducts
} from '../../../../store';
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from 'react-alert';
import { getValue } from "../../../../common/attribute";
import DataListing from "../../../../common/DataListing";
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
    const [ parent, setParent] = useState("");
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
            dispatch(updateCategoryReset());
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
            setParent(category.parent ? category.parent : "");
            setOldImages(category.images);           
        }       
    },[dispatch, category, categoryId]);

    useEffect(() => {
        if(categoryError) {
            alert.error(categoryError.error);
            dispatch(clearErrors());
        }
        if(productError) {
            alert.error(productError.error);
            dispatch(clearErrors());
        }
        if(categoriesError) {
            alert.error(categoriesError.error);
            dispatch(clearErrors());
        }
        if(updateCategoryError) {
            alert.error(updateCategoryError.error);
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

    const rows = useMemo(() => {
        const _rows = [];
        products && products.forEach(product => {
            _rows.push({
                __check__: true,
                id: product._id,
                name: getValue("name", product.data),
                price: getValue("price", product.data),
                stock: getValue("stock", product.data)
            });
        });
        return _rows;
    }, [products])

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
        } else {
            myForm.set("parent", null);
        }
        myForm.set("description", description);
        if(products !== null){
            myForm.set("products", selectedProducts);
        }
        images.map((image) => {
            myForm.append("images", image);
            return true;
        });

        dispatch(updateCategory({categoryData: myForm, categoryId}));
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
        return <Loader />;
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
                            <select onChange={(e) => setParent(e.target.value)} value={parent}>
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
                    <DataListing 
                        columns={columns} 
                        rows={rows} 
                        onSelectionModelChange={onSelectionModelChange} 
                        selectedProducts={selectedProducts} 
                    />
                </TabPanel>
            </Box>  
            <Button id="updateCategoryBtn" type="submit">Update</Button>
        </form>}        
    </FormContainer>);
}
 
export default UpdateCategory;