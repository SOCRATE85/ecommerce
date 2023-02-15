import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
    AccountTreeOutlined,
    SpellcheckOutlined,
    Delete     
} from "@mui/icons-material"
import { Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import Input from "../Controls/Input";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import Sidebar from './Sidebar';
import { clearErrors, getAttribute, updateAttribute } from '../../store/actions/attributeAction';
import { UPDATE_ATTRIBUTE_RESET } from "../../store/contants/attributeConstant";
import Boolean from "../Controls/Boolean";

const EditAttribute = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const attributeId = params.id;
    const { 
        attribute, 
        loading: loadingAttributeDetails, 
        error: attributeError 
    } = useSelector( state => state.attributeDetails );
    const { 
        isUpdated, 
        error: updateError, 
        loading: updateLoading 
    } = useSelector( state => state.updateAttribute );
    const [useInFilter, setUseInFilter] = useState(false);
    const [useInSorting, setUseInSorting] = useState(false);
    const [frontendLabel, setFrontendLabel] = useState("");
    const [frontendInput, setFrontendInput] = useState("text");
    const [isRequired, setIsRequired] = useState(1);
    const [attributeCode, setAttributeCode] = useState("");
    const [defaultValue, setDefaultValue] = useState("");
    const attributeOption = [];
    const [attributeOptions, setAttributeOptions ] = useState(attributeOption);
    
    useEffect(() => {
        if(attribute && attribute._id !== attributeId) {
            dispatch(getAttribute(attributeId));
        }else {
            setFrontendLabel(attribute.frontend_label);
            setFrontendInput(attribute.frontend_input);
            setIsRequired(attribute.is_required);
            setAttributeCode(attribute.attribute_code);
            setUseInFilter(attribute.use_in_filter);
            setUseInSorting(attribute.use_in_sorting);
            setDefaultValue(attribute.default_value);
            if(attribute.attribute_options.length !== 0) {
                const newAttributeOptions = [];
                attribute.attribute_options.forEach((element) => {
                    newAttributeOptions.push({
                                _id: {
                                    elementType: "hidden",
                                    elementConfig: {
                                        type: "hidden",
                                        placeholder: "Option Id",
                                        error: ""
                                    },
                                    value: element._id,
                                    validation: {
                                        required: true,
                                        isNum: true
                                    },
                                    valid: true,
                                    touched: true,
                                    hideLabel: true
                                },
                                sortOrder: {
                                    elementType: "input",
                                    elementConfig: {
                                        type: "number",
                                        placeholder: "Sort Order",
                                        error: ""
                                    },
                                    value: element.sortOrder,
                                    validation: {
                                        required: true,
                                        isNum: true
                                    },
                                    valid: true,
                                    touched: false,
                                    hideLabel: false
                                },
                                value: {
                                    elementType: "input",
                                    elementConfig: {
                                        type: "text",
                                        placeholder: "Value",
                                        error: ""
                                    },
                                    value: element.value,
                                    validation: {
                                        required: true
                                    },
                                    valid: true,
                                    touched: false,
                                    hideLabel: false
                                }
                            });
                });
                setAttributeOptions(newAttributeOptions);
            }
        }
    },[dispatch, attribute, attributeId]);

    useEffect(() => {
        if(attributeError) {
            alert.error(attributeError);
            dispatch(clearErrors());
        }

        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
    },[alert, dispatch, attributeError, updateError]);
    
    useEffect(() => {
        if(isUpdated) {
            alert.success("Attribute is updated successfully");
            navigate("/admin/attributes");
            dispatch({ type: UPDATE_ATTRIBUTE_RESET });
        }
    }, [alert, isUpdated, navigate, dispatch]);

    const addNewAttributeValue = () => {
        const newAttributeOption = [...attributeOptions];
        newAttributeOption.push({
            _id: {
                elementType: "hidden",
                elementConfig: {
                    type: "hidden",
                    placeholder: "Option Id",
                    error: ""
                },
                value: 0,
                validation: {
                    required: true,
                    isNum: true
                },
                valid: true,
                touched: true,
                hideLabel: true
            },
            sortOrder: {
                elementType: "input",
                elementConfig: {
                    type: "number",
                    placeholder: "Sort Order",
                    error: ""
                },
                value: attributeOptions.length <= 0 ? 0 : attributeOptions.length,
                validation: {
                    required: true,
                    isNum: true
                },
                valid: true,
                touched: false,
                hideLabel: false
            },
            value: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Value",
                    error: ""
                },
                value: "",
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                hideLabel: false
            }
        });
        setAttributeOptions(newAttributeOption);
    }

    const updateAttributeSubmitHandler = (event) => {
        event.preventDefault();
        const attributeOption = [];
        attributeOptions.forEach((attribute) => {
            attributeOption.push({
                value: attribute.value.value,
                sortOrder: attribute.sortOrder.value
            });
        });
        const myForm = new FormData();
        myForm.set("use_in_filter", useInFilter);
        myForm.set("use_in_sorting", useInSorting);
        myForm.set("frontend_label", frontendLabel);
        myForm.set("attribute_code", attributeCode);
        myForm.set("frontend_input", frontendInput);
        myForm.set("is_required", isRequired);
        myForm.set("default_value", defaultValue);
        if(attributeOption.length !== 0) {
            myForm.set("attribute_options", JSON.stringify(attributeOption));
        }
        dispatch(updateAttribute(myForm, attributeId));
        dispatch(getAttribute(attributeId));
    }

    const inputOptionChangeHandler = (event, index, identifier) => {
        const updateAttributeOptions = [...attributeOptions];
        const updateAttributeOptionElement = {
            ...updateAttributeOptions[index][identifier]
        };
        updateAttributeOptionElement.touched = true;
        updateAttributeOptionElement.value = event.target.value;
        updateAttributeOptionElement.valid = checkValidation(
            updateAttributeOptionElement.value, 
            updateAttributeOptionElement.validation
        );
        updateAttributeOptions[index][identifier] = updateAttributeOptionElement;
        setAttributeOptions(updateAttributeOptions);
    }

    const checkValidation = (value, rules) => {
        let isValid = true;
        if(!rules) return true;
        isValid = value.trim() !== "" && isValid;
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    const removeOptionValue = (index) => {
        const newAttributeOption = [...attributeOptions];
        const updateAttributeOption = newAttributeOption.filter((_, iIndex) => iIndex !== index)
        setAttributeOptions(updateAttributeOption);
    }
    
    const chooseAttributeTypeHandler = (value) => {
        setFrontendInput(value);
        if(value === 'select' || value === 'multiselect' || value === 'checkbox' || value === 'radio' ) {
            if(attributeOptions.length === 0) {
                const newAttributeOption = [...attributeOptions];
                newAttributeOption.push({
                    _id: {
                        elementType: "hidden",
                        elementConfig: {
                            type: "hidden",
                            placeholder: "Option Id",
                            error: ""
                        },
                        value: 0,
                        validation: {
                            required: true,
                            isNum: true
                        },
                        valid: true,
                        touched: true,
                        hideLabel: true
                    },
                    sortOrder: {
                        elementType: "input",
                        elementConfig: {
                            type: "number",
                            placeholder: "Sort Order",
                            error: ""
                        },
                        value: attributeOptions.length <= 0 ? 0 : attributeOptions.length,
                        validation: {
                            required: true,
                            isNum: true
                        },
                        valid: true,
                        touched: false,
                        hideLabel: false
                    },
                    value: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "Value",
                            error: ""
                        },
                        value: "",
                        validation: {
                            required: true
                        },
                        valid: true,
                        touched: false,
                        hideLabel: false
                    }
                });
                setAttributeOptions(newAttributeOption);
            }
        } else {
            setAttributeOptions([]);
        }
    }

    const frontendLabelHandler = (value) => {
        setFrontendLabel(value);
    }

    let attributeOptionFormElementArray = [];
    for(let fKey in attributeOptions) {
        const attributeOptionRow = [];
        for(let sKey in attributeOptions[fKey]) {
            attributeOptionRow.push({ id: sKey, config: attributeOptions[fKey][sKey]})
        }
        attributeOptionFormElementArray.push(attributeOptionRow);
    }

    if(loadingAttributeDetails || updateLoading) {
        return <Loader />
    }
   
    return (<>
        <MetaData title={"Edit Attributes"} />
        <div className='dashboard'>
            <Sidebar />
            <div className='addAttributeContainer'>
                <form className="createAttributeForm" encType="multipart/form-data" onSubmit={updateAttributeSubmitHandler}>
                    <Typography component={"h1"}>Edit Attribute</Typography>
                    <div>
                        <SpellcheckOutlined />
                        <input 
                            type={"text"} 
                            placeholder="Attribute Name" 
                            required 
                            value={frontendLabel}
                            onChange={(e) => frontendLabelHandler(e.target.value)} 
                        />
                    </div>
                    <div>
                        <SpellcheckOutlined />
                        <input 
                            type={"text"} 
                            placeholder="Attribute Code" 
                            required
                            disabled
                            value={attributeCode}
                            onChange={(e) => setAttributeCode(e.target.value)} 
                        />
                    </div>
                    <div>
                        <AccountTreeOutlined />
                        <select disabled onChange={(e) => chooseAttributeTypeHandler(e.target.value)} value={frontendInput}>
                            <option value={"text"}>Text Field</option>
                            <option value={"price"}>Price</option>
                            <option value={"select"}>Select</option>
                            <option value={"multiselect"}>Multi Select</option>
                            <option value={"checkbox"}>CheckBox</option>
                            <option value={"radio"}>Radio Button</option>
                            <option value={"textarea"}>Textarea</option>
                            <option value={"file"}>File</option>
                            <option value={"date"}>Date</option>
                        </select>
                    </div>
                    <div>
                        <label className="title">Use in Filter</label>
                        <Boolean id="useInFilter" value={useInFilter} onChange={()=>setUseInFilter(prev => !prev)}/>
                    </div>
                    <div>
                        <label className="title">Use in Sorting</label>
                        <Boolean id="useInSorting" value={useInSorting} onChange={()=>setUseInSorting(prev => !prev)}/>
                    </div>
                    {(
                        frontendInput !== "select" &&
                        frontendInput !== "multiselect" &&
                        frontendInput !== "checkbox" &&
                        frontendInput !== "radio") ? (
                        <>
                        {frontendInput === 'boolean' ? <>
                            <div>
                                <label className="title">Default Value</label>
                                <Boolean id="defaultValue" value={defaultValue} onChange={()=>setDefaultValue(prev => !prev)}/>
                            </div> 
                        </> : <div>
                            <SpellcheckOutlined />
                            <input 
                                type={"text"} 
                                placeholder="Default Value"
                                value={defaultValue}
                                onChange={(e) => setDefaultValue(e.target.value)} 
                            />
                        </div>}
                        </>
                    ): <></>}
                    <div>
                        <AccountTreeOutlined />
                        <select onChange={(e) => setIsRequired(e.target.value)} value={isRequired}>
                            <option value={1}>Options</option>
                            <option value={2}>Required</option>
                        </select>
                    </div>
                    { (frontendInput === "select" || frontendInput === "multiselect" || frontendInput === "checkbox" || frontendInput === "radio") && (
                        <>
                            <div>
                                <Button onClick={() => addNewAttributeValue()}>Add New Option</Button>
                            </div>
                            <div className="attributeOptionContainer">
                                {
                                    attributeOptionFormElementArray.length !== 0 && attributeOptionFormElementArray.map((option, oIndex) => {
                                        return (<div className="optionGroup" key={oIndex}>
                                            {
                                                option.map((attribute, iIndex) => {
                                                    return <div className="field" key={iIndex} style={attribute.config.elementType === "hidden" ? { width: 0 } : {}}>
                                                        <Input 
                                                            id={attribute.id}
                                                            hideLabel={attribute.config.hideLabel}
                                                            elementType={attribute.config.elementType}
                                                            label={attribute.config.elementConfig.placeholder}
                                                            elementConfig={attribute.config.elementConfig}
                                                            value={attribute.config.value}
                                                            shouldValidate={attribute.config.validation.required}
                                                            touched={attribute.config.touched}
                                                            changed={(event)=> {
                                                                inputOptionChangeHandler(event, oIndex, attribute.id)
                                                            }}
                                                        />
                                                    </div>
                                                })
                                            }
                                            <div className="field">
                                                <button type="button" className="delete" onClick={() => removeOptionValue(oIndex)}>
                                                    <Delete />
                                                </button>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>
                        </>
                    )}
                    <Button id="createProductBtn" type="submit">Update</Button>
                </form>               
            </div>
        </div>
    </>);
}

export default EditAttribute;
