import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Box, Tabs, Tab } from "@mui/material";
import {
    AccountTreeOutlined, 
    DescriptionOutlined, 
    SpellcheckOutlined 
} from "@mui/icons-material";
import { useAlert } from "react-alert";
import { createCategory, getAllCategories, clearErrors, getAdminProducts, newCategoryReset } from '../../../../store';
import { FormContainer } from "../../../../common/components/FormContainer";
import DataListing from "../../../../common/DataListing";
import "./NewCategory.css";
import Loader from "../../../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getValue } from "../../../../common/attribute";

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

const NewCategory = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, products } = useSelector(state => state.products);
    const { loading: loadingCategory, categories } = useSelector(state => state.categories);
    const { loading: createCategoryLoading, success, error: createCategoryError } = useSelector(state => state.createCategory);
    const [name, setName] = useState("");
    const [parent, setParent] = useState(null);
    const [description, setDescription] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [images, setImages] = useState([]);
    const [value, setValue] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState(null);

    useEffect(() => {
        dispatch(getAdminProducts());
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if(success) {
            alert.success("Category added successfully");
            navigate("/admin/categories");
            dispatch(newCategoryReset);
        }
    }, [alert, dispatch, success, navigate]);

    useEffect(() => {
        if(createCategoryError) {
            alert.error(createCategoryError.error);
            dispatch(clearErrors());
        }
    },[alert, dispatch, createCategoryError]);

    const handleChange = (_event, newValue) => {
      setValue(newValue);
    };

    const createCategoryImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImagePreview([]);
        setImages([])
        const images = [];
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    images.push([...this.state.imagePreview, reader.result]);
                    setImagePreview(images);
                    setImages(images)
                }
            }
            reader.readAsDataURL(file);
        });
    }

    const onSelectionModelChange = (products) => {
       setSelectedProducts(products);
    }

    const createCategorySubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("parent", parent ? parent : null);
        myForm.set("description", this.state.description);
        myForm.set("products", selectedProducts ? selectedProducts: []);

        images.map((image) => {
            myForm.append("images", image);
            return true;
        });

        dispatch(createCategory(myForm));
    }

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
            id: product._id,
            name: getValue("name", product.data),
            price: getValue("price", product.data),
            stock: getValue("stock", product.data)
        });
    });
    return (<FormContainer pagetitle={"Create Category"}>
        {loading || loadingCategory || createCategoryLoading ? <Loader /> :<Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs category">
                    <Tab label="General" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <form 
                    className="createCategoryForm" 
                    encType="multipart/form-data" 
                    onSubmit={(e) => createCategorySubmitHandler(e)}
                >
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
                    <div id="createCategoryFormFile">
                        <input 
                            type={"file"} 
                            name="avatar" 
                            accept="image/*" 
                            multiple 
                            onChange={(e) => createCategoryImageChange(e)} 
                        />
                    </div>
                    <div id="createCategoryFormImage">
                        {
                            imagePreview.length > 0 && imagePreview.map((image, index) => {
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
            <TabPanel value={value} index={1}>
                <DataListing 
                    columns={columns}
                    rows={rows} 
                    onSelectionModelChange={onSelectionModelChange} 
                    selectedProducts={selectedProducts ? selectedProducts : []} 
                />
            </TabPanel>
        </Box>}        
    </FormContainer>);
}

export default NewCategory;

