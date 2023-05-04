import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useAlert } from "react-alert";
import {
    createCategory,
    getAllCategories,
    clearErrors,
    getAdminProducts,
    newCategoryReset,
    uploadFiles
} from '../../../../store';
import { FormContainer } from "../../../../common/components/FormContainer";
import DataListing from "../../../../common/components/DataListing";
import ActionControl from '../../../../common/ActionControl';
import FormElement from '../../../../common/components/FormElement';
import Loader from "../../../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { getValue } from "../../../../common/attribute";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from '../../../../common/components/FormAction';
import TabPanelContainer from "../../../../common/components/TabPanelContainer";

const NewCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, products } = useSelector(state => state.products);
    const {images: uploadedImage} = useSelector(state => state.uploadImage);
    const {loading: loadingCategory, categories} = useSelector(state => state.categories);
    const {loading: createCategoryLoading, success, error: createCategoryError} = useSelector(state => state.createCategory);
    const [images, setImages] = useState([]);
    const [imageIdentifier, setImageIdentifier] = useState([]);
    const [imageUpload, setImageUpload] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const [formState, setFormState] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Name",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        description: {
            elementType: "editor",
            elementConfig: {
                type: "editor",
                error: "",
                placeholder: "Description"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        parent: {
            elementType: "select",
            elementConfig: {
                placeholder: "Parent Category",
                error: "",
                options: [
                    {
                        value: 0,
                        defaultValue: "Select category"
                    }
                ]
            },
            value: null,
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            isMulti: true,
            touched: false
        },
        images: {
            elementType: "file",
            elementConfig: {
                type: "file",
                error: "",
                placeholder: "Images"
            },
            value: [],
            validation: {
                required: true,
                isImage: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        status: {
            elementType: "boolean",
            elementConfig: {
                placeholder: "Status",
                error: ""
            },
            value: null,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        }
    });

    const categoriesOption = useMemo(() => {
        let _categories = [
            {
                value: 0,
                label: "Select Category"
            }
        ];
        for(let key in categories) {
            _categories.push({
                value: categories[key]._id,
                label: categories[key].name
            });
        }
        return _categories;
    },[categories]);

    const actioncontrol = useMemo(() => {
        return new ActionControl({
            formState,
            setFormState,
            images,
            setImages,
            imageIdentifier,
            setImageIdentifier,
            uploadedImage,
            imageUpload,
            setImageUpload
        });
    },[
        formState,
        setFormState,
        images,
        setImages,
        imageIdentifier,
        setImageIdentifier,
        uploadedImage,
        imageUpload,
        setImageUpload
    ]);

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

    const onSelectionModelChange = (products) => {
       setSelectedProducts(products);
    }

    const createSubmitHandler = async (state) => {
        const myForm = new FormData();
        myForm.set("name", state.name.value);
        myForm.set("parent", state.parent.value ? state.parent.value : null);
        myForm.set("description", state.description.value);
        myForm.set("products", selectedProducts ? selectedProducts: []);
        state.images.map((image) => {
            myForm.append("images", image);
            return true;
        });
        myForm.set("status", state.status.value);
        dispatch(createCategory(myForm));
    }

    useEffect(() => {
        if(imageUpload && uploadedImage.length > 0) {
            actioncontrol.loadOption();
        }
    }, [uploadedImage, imageUpload, actioncontrol]);

    const createImageChange = (e, identifier) => {
        const files = Array.from(e.target.files);
        setImageIdentifier(identifier);
        setImageUpload(true);
        dispatch(uploadFiles(files));
    }

    const columns = [
        { field: "__check__", sortable: false, minWidth: 40 },
        { field: "id", headerName: "ID", minWidth: 240, flex: 0.5 },
        { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
        { field: "stock", headerName: "Stock", type: "number", minWidth: 100, flex: 0.3 },
        { field: "price", headerName: "Price", type: "number", minWidth: 100, flex: 0.5 }
    ];
    
    const rows = useMemo(() => {
        let _rows = [];
        products && products.forEach(product => {
            _rows.push({
                __check__: null,
                id: product._id,
                name: getValue("name", product.data),
                price: getValue("price", product.data),
                stock: getValue("stock", product.data)
            });
        });
        return _rows;
    },[products]);
    
    let formElementArray = useMemo(() => {
        const _formElementArray = [];
        const tempformElementArray = actioncontrol.getFormState();
        for(let key in tempformElementArray) {
            _formElementArray.push({
                id: key,
                config: tempformElementArray[key]
            })
        }
        return _formElementArray;
    }, [actioncontrol]);
    
    const firstTabContents = (
        <FormAction submitHandler={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}>
            <FormElement 
                formElementArray={formElementArray} 
                actioncontrol={actioncontrol}
                options={categoriesOption}
                optionKey={'parent'}
                createImageChange={createImageChange}
            />
            <SubmitActionButton title={'Create Category'} /> 
        </FormAction>
    );

    const secondTabContents = (
        <DataListing 
            columns={columns}
            rows={rows}
            checkboxSelection={true}
            onSelectionModelChange={onSelectionModelChange} 
            selectedProducts={selectedProducts ? selectedProducts : []} 
        />
    );

    return (<FormContainer pagetitle={"Create Category"}>        
        {
            loading || loadingCategory || createCategoryLoading ? 
            <Loader /> : 
            <TabPanelContainer 
                firstTabContents={firstTabContents} 
                secondTabContents={secondTabContents}
            />
        }        
    </FormContainer>);
}

export default NewCategory;
