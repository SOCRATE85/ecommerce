import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../../../store/actions/productAction";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { FormContainer } from "../../../../common/components/FormContainer";
import { NEW_PRODUCT_RESET } from "../../../../store/contants/productConstant";
import { getAttributesets } from '../../../../store/actions/attributesetAction';
import { getAllCategories } from '../../../../store/actions/categoryAction';
import Select from 'react-select';
import Loader from "../../../layout/Loader/Loader";
import Input from '../../../Controls/Input';
import { getValue } from "../../../../common/attribute";
import { checkValidation, validateProductData, validatedProductForm} from "../../../../common/validation";
import "./NewProduct.css";

const NewProduct = () => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.newProduct);
    const {loading: loadingAttributeSet, attributesets} = useSelector(state => state.attributesets);
    const { categories, loading: loadingCategories } = useSelector(state => state.categories);
    const navigate = useNavigate();
    const alert = useAlert();
    const [ attributeSetId, setAttributeSetId ] = useState();
    const [ defaultFormAttributes, setDefaultFormAttributes ] = useState();
    const [ formState, setFormState ] = useState([]);
    const [ formElementArray, setFormElementArray ] = useState("");
    const [ category, setCategory ] = useState();
    const [ images, setImages ] = useState([]);
    const [ imageIndex, setImageIndex ] = useState([]);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);

    useEffect(() => {
        dispatch(getAttributesets());
        dispatch(getAllCategories());
    }, [dispatch]);

    useEffect(() => {
        if(attributesets[0] === undefined) {
            return;
        }
        
        if(!attributeSetId) {
            setAttributeSetId({label: attributesets[0].attribute_set_name, value: attributesets[0]._id});
            const attribute_group = attributesets[0].attribute_group;
            setDefaultFormAttributes(attributesets[0].attribute_group);
            const newFormState = [];        
            for(let key in attribute_group) {
                const attributes = attribute_group[key].attributes;
                let attributeForm = {};
                let attribute_options = [];
                let newAttributeOptions = [];
                for(let _key in attributes) {
                    switch (attributes[_key].frontend_input) {
                        case 'multiselect':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                            for(let __key in attribute_options) {
                                newAttributeOptions.push({
                                    value: attribute_options[__key]._id,
                                    defaultValue: attribute_options[__key].value
                                });
                            }
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    options: newAttributeOptions,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: JSON.stringify([]),
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                multiple: true,
                                hideLabel: false
                            };
                        break;
                        case 'checkbox':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                        break;
                        case 'select':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                            for(let __key in attribute_options) {
                                newAttributeOptions.push({
                                    value: attribute_options[__key]._id,
                                    defaultValue: attribute_options[__key].value
                                });
                            }
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    options: newAttributeOptions,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: JSON.stringify([]),
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                hideLabel: false
                            };
                        break;
                        default:
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: "",
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                hideLabel: false
                            };
                        break;
                    }
                }
                newFormState.push({
                    attributeGroup: attribute_group[key].attributeGroup,
                    attributeGroupId: attribute_group[key].attributeGroupId,
                    attributes: attributeForm,
                });
            }
            setFormState(newFormState);
        } else {
            const attribute_group = attributesets.find(item => item._id === attributeSetId.value).attribute_group;
            setDefaultFormAttributes(attribute_group);
            const newFormState = [];        
            for(let key in attribute_group) {
                const attributes = attribute_group[key].attributes;
                let attributeForm = {};
                let attribute_options = [];
                let newAttributeOptions = [];
                for(let _key in attributes) {
                    switch (attributes[_key].frontend_input) {
                        case 'multiselect':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                            for(let __key in attribute_options) {
                                newAttributeOptions.push({
                                    value: attribute_options[__key]._id,
                                    defaultValue: attribute_options[__key].value
                                });
                            }
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    options: newAttributeOptions,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: JSON.stringify([]),
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                multiple: true,
                                hideLabel: false
                            };
                        break;
                        case 'checkbox':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                            for(let __key in attribute_options) {
                                newAttributeOptions.push({
                                    value: attribute_options[__key]._id,
                                    defaultValue: attribute_options[__key].value
                                });
                            }
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    options: newAttributeOptions,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: [],
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                hideLabel: false
                            };
                        break;
                        case 'select':
                            attribute_options = attributes[_key].attribute_options;
                            newAttributeOptions = [];
                            for(let __key in attribute_options) {
                                newAttributeOptions.push({
                                    value: attribute_options[__key]._id,
                                    defaultValue: attribute_options[__key].value
                                });
                            }
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    options: newAttributeOptions,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: JSON.stringify([]),
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                hideLabel: false
                            };
                        break;
                        default:
                            attributeForm[attributes[_key].attribute_code] = {
                                elementType: attributes[_key].frontend_input,
                                elementConfig: {
                                    type: attributes[_key].frontend_input,
                                    placeholder: attributes[_key].frontend_label,
                                    error: ""
                                },
                                attributeId: attributes[_key]._id,
                                value: "",
                                validation: {
                                    required: attributes[_key].is_required ? true : false,
                                },
                                valid: true,
                                touched: true,
                                hideLabel: false
                            };
                        break;
                    }
                }
                newFormState.push({
                    attributeGroup: attribute_group[key].attributeGroup,
                    attributeGroupId: attribute_group[key].attributeGroupId,
                    attributes: attributeForm,
                });
            }
            setFormState(newFormState);
        }
    }, [attributesets, attributeSetId]);

    useEffect(() => {
        if(success) {
            alert.success("Product created successfully");
            navigate("/admin/products");
            dispatch({ type: NEW_PRODUCT_RESET });
        }
    }, [alert, success, navigate, dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[alert, dispatch, error]);

    const createProductSubmitHandler = (e) => {
        e.preventDefault();
        const validatedData = validateProductData(formState);
        setFormState(validatedData);
        const validated = validatedProductForm(formState);
        const attributeGroup = [];     
        for(let key in formState) {
            const attributes = formState[key].attributes;
            const _attributes = {};          
            for(let _key in attributes) {
                _attributes[_key] = {
                    attributType: attributes[_key].elementType,
                    attributeId: attributes[_key].attributeId,
                    attributeCode: _key,
                    attributeGroupId: formState[key].attributeGroupId,
                    attributeGroup: formState[key].attributeGroup,
                    value: attributes[_key].value,
                    groupIndex: key
                };
            }
            attributeGroup.push({
                attributeGroupId: formState[key].attributeGroupId,
                attributeGroup: formState[key].attributeGroup,
                attributes: _attributes
            });
        }
        if(!validated) {
            return;
        }
        const myForm = new FormData();        
        myForm.set("attributeset", attributeSetId.value);
        myForm.set("categories", JSON.stringify(category));
        images.map((image) => {
            myForm.append("images", image);
            return true;
        });
        const name = getValue("name", attributeGroup);
        myForm.set("name", name);
        myForm.set("data", JSON.stringify(attributeGroup));
        dispatch(createProduct(myForm));
    }

    const getIndex = (attribute, _productData) => {
        const productData = _productData;
        for(let key in productData) {
            const attributes = productData[key].attributes;
            for(let _key in attributes) {
                if(_key === attribute) {
                    return key;
                }
            }
        }
    }

    const removeImage = (imageIndex, imageIdentifier) => {
        const groupIndex = getIndex(imageIdentifier, formState);
        const _updatedFormState = [...formState];
        const _updatedFormAttributes = {..._updatedFormState[groupIndex]};
        const _updatedFormElement = {..._updatedFormAttributes['attributes']};
        const updatedFormElement = {..._updatedFormElement[imageIdentifier]};
        const _images = images.filter((_, index) => index !== imageIndex)  
        updatedFormElement.value = _images;
        _updatedFormElement[imageIdentifier] = updatedFormElement;
        _updatedFormAttributes['attributes'] = _updatedFormElement;
        _updatedFormState[groupIndex] = _updatedFormAttributes;
        setFormState(_updatedFormState);
        setImages(_images);
    }

    const createProductImageChange = async (e, index, identifier) => {
        const files = Array.from(e.target.files);
        setImageIndex(index);
        setImageIdentifier(identifier);
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2) {
                    setImages((old) => [...old, reader.result]);
                    setImageUpload(true);
                }
            }
            reader.readAsDataURL(file);
        }); 
    }

    useEffect(() => {
        const loadOption = () => {
            const _updatedFormState = [...formState];
            const _updatedFormAttributes = {..._updatedFormState[imageIndex]};
            const _updatedFormElement = {..._updatedFormAttributes['attributes']};
            const updatedFormElement = {..._updatedFormElement[imageIdentifier]};
            updatedFormElement.touched = true;
            const validation = checkValidation(images, updatedFormElement.validation);
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;   
            updatedFormElement.value = images;
            _updatedFormElement[imageIdentifier] = updatedFormElement;
            _updatedFormAttributes['attributes'] = _updatedFormElement;
            _updatedFormState[imageIndex] = _updatedFormAttributes;
            setFormState(_updatedFormState);
            setImageUpload(false);
        }
        if(imageUpload && images.length > 0) {
            loadOption();
        }
    }, [imageIndex, imageIdentifier, images, formState, imageUpload]);

    const checkboxOptionChangeHandler = (event, index, identifier) => {
        const _updatedFormState = [...formState];
        const _updatedFormAttributes = {..._updatedFormState[index]};
        const _updatedFormElement = {..._updatedFormAttributes['attributes']};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        const validation = checkValidation(event.target.value, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        let chkValue = updatedFormElement.value;
        if(event.target.checked) {
            const isExist = chkValue.find(item => item === event.target.value.trim());
            if(!isExist) {
                chkValue.push(event.target.value.trim());
            }
        } else {
            chkValue = chkValue.filter(item => item !== event.target.value.trim());            
        }
        updatedFormElement.value = chkValue;
        _updatedFormElement[identifier] = updatedFormElement;
        _updatedFormAttributes['attributes'] = _updatedFormElement;
        _updatedFormState[index] = _updatedFormAttributes;
        setFormState(_updatedFormState);
    }

    const inputOptionChangeHandler = (event, index, identifier) => {
        const _updatedFormState = [...formState];
        const _updatedFormAttributes = {..._updatedFormState[index]};
        const _updatedFormElement = {..._updatedFormAttributes['attributes']};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        const validation = checkValidation(event.target.value, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        if(event.target.type === 'checkbox' || event.target.type === 'radio') {
            updatedFormElement.value = event.target.checked;
        } else {
            updatedFormElement.value = event.target.value;
        }
        _updatedFormElement[identifier] = updatedFormElement;
        _updatedFormAttributes['attributes'] = _updatedFormElement;
        _updatedFormState[index] = _updatedFormAttributes;
        setFormState(_updatedFormState);
    }

    const selectOptionChangeHandler = (event, index, identifier) => {
        const _updatedFormState = [...formState];
        const _updatedFormAttributes = {..._updatedFormState[index]};
        const _updatedFormElement = {..._updatedFormAttributes['attributes']};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        const validation = checkValidation(event, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        updatedFormElement.value = event;
        _updatedFormElement[identifier] = updatedFormElement;
        _updatedFormAttributes['attributes'] = _updatedFormElement;
        _updatedFormState[index] = _updatedFormAttributes;
        setFormState(_updatedFormState);
    }
    
    useEffect(() => {
        let _formElementArray = [];
        for(let key in formState) {
            let _newFormState = [];
            const _formState = formState[key].attributes;
            for(let _key in _formState) {
                _newFormState.push({
                    id: _key,
                    config: _formState[_key]
                });
            }

            _formElementArray.push({
                attributeGroup: formState[key].attributeGroup,
                attributeGroupId: formState[key].attributeGroupId,
                attributes: _newFormState
            });
        }
        setFormElementArray(_formElementArray);
    }, [formState]);

    const reorderCategories = useMemo(() => {
        let options = [];
        for(let key in categories) {
            options.push({label: categories[key].name, value: categories[key]._id});
        }
        return options;
    },[categories]);
    
    const reordeAttributesets = useMemo(() => {
        let options = [];
        for(let key in attributesets) {
            options.push({label: attributesets[key].attribute_set_name, value: attributesets[key]._id});
        }
        return options;
    }, [attributesets]);

    return (<FormContainer pagetitle={"Create Product"}>
        {loading || loadingAttributeSet || loadingCategories || defaultFormAttributes === undefined ? <Loader /> : <form className="createProductForm" encType="multipart/form-data" onSubmit={createProductSubmitHandler}>
            <fieldset style={{display:'block', width: 400, marginBottom: 20, border: '1px solid rgba(0, 0,0, 0.267)'}}>
                <legend style={{fontSize: 16, marginLeft: 10}}>Attribute Set</legend>
                <div className="selectBox">
                    <Select 
                        options={reordeAttributesets}
                        value={attributeSetId}
                        onChange={(e) => setAttributeSetId(e)}
                    />
                </div>
            </fieldset>
            <fieldset style={{display:'block', width: 400, marginBottom: 20, border: '1px solid rgba(0, 0,0, 0.267)'}}>
                <legend style={{fontSize: 16, marginLeft: 10}}>Category</legend>
                <div className="selectBox">
                    <Select 
                        options={reorderCategories}
                        value={category}
                        onChange={(e) => setCategory(e)}
                        isMulti
                    />
                </div>
            </fieldset>
            {formElementArray.map(({attributeGroupId, attributeGroup, attributes}, index) => {
                return <fieldset key={attributeGroupId} style={{display:'block', width: 400, marginBottom: 20, border: '1px solid rgba(0, 0,0, 0.267)'}}>
                    <legend style={{fontSize: 16, marginLeft: 10}}>{attributeGroup}</legend>
                    <div>
                        {attributes.map(attribute => {
                            switch (attribute.config.elementType) {
                                case 'select':
                                case "multiselect":
                                    return <Input 
                                        id={attribute.id}
                                        key={attribute.id}
                                        hideLabel={attribute.config.hideLabel}
                                        elementType={attribute.config.elementType}
                                        label={attribute.config.elementConfig.placeholder}
                                        elementConfig={attribute.config.elementConfig}
                                        value={attribute.config.value}
                                        isValid={!attribute.config.valid}
                                        shouldValidate={attribute.config.validation.required}
                                        touched={attribute.config.touched}
                                        changed={(e)=> selectOptionChangeHandler(e, index, attribute.id)}
                                    />
                                case "checkbox":
                                    return <Input 
                                        id={attribute.id}
                                        key={attribute.id}
                                        hideLabel={attribute.config.hideLabel}
                                        elementType={attribute.config.elementType}
                                        label={attribute.config.elementConfig.placeholder}
                                        elementConfig={attribute.config.elementConfig}
                                        value={attribute.config.value}
                                        isValid={!attribute.config.valid}
                                        shouldValidate={attribute.config.validation.required}
                                        touched={attribute.config.touched}
                                        changed={(e)=> checkboxOptionChangeHandler(e, index, attribute.id)}
                                    />
                                case 'file': 
                                        return <Input 
                                        id={attribute.id}
                                        key={attribute.id}
                                        hideLabel={attribute.config.hideLabel}
                                        elementType={attribute.config.elementType}
                                        label={attribute.config.elementConfig.placeholder}
                                        elementConfig={attribute.config.elementConfig}
                                        value={attribute.config.value}
                                        isValid={!attribute.config.valid}
                                        shouldValidate={attribute.config.validation.required}
                                        touched={attribute.config.touched}
                                        removeImage={removeImage}
                                        changed={(e)=> createProductImageChange(e, index, attribute.id)}
                                    />  
                                default:
                                    return <Input 
                                        id={attribute.id}
                                        key={attribute.id}
                                        hideLabel={attribute.config.hideLabel}
                                        elementType={attribute.config.elementType}
                                        label={attribute.config.elementConfig.placeholder}
                                        elementConfig={attribute.config.elementConfig}
                                        value={attribute.config.value}
                                        isValid={!attribute.config.valid}
                                        shouldValidate={attribute.config.validation.required}
                                        touched={attribute.config.touched}
                                        changed={(e)=> inputOptionChangeHandler(e, index, attribute.id)}
                                    />
                            }
                        })}
                    </div>
                </fieldset>
            })}                 
            <div>
                <Button id="backToProductListBtn" type="button" onClick={() => navigate('/admin/products')}>Back</Button>
                <Button id="createProductBtn" type="submit" disabled={ loading ? true : false}>Create</Button>
            </div>
        </form>}
    </FormContainer>)
}

export default NewProduct;
