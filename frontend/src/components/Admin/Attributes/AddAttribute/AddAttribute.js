import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import {
    AccountTreeOutlined,
    SpellcheckOutlined,
    Delete
} from "@mui/icons-material"
import { Button } from "@mui/material";
import { createAttribute, clearErrors } from '../../../../store/actions/attributeAction';
import { NEW_ATTRIBUTE_RESET } from '../../../../store/contants/attributeConstant';
import { FormContainer } from "../../../../common/components/FormContainer";
import "./AddAttribute.css";
import Input from "../../../Controls/Input";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../../../layout/Loader/Loader";
import Boolean from "../../../Controls/Boolean";

const AddAttribute = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { loading, error, success } = useSelector( state => state.createAttribute );
    const [frontendLabel, setFrontendLabel] = useState("");
    const [frontendInput, setFrontendInput] = useState("text");
    const [isRequired, setIsRequired] = useState(1);
    const [useInFilter, setUseInFilter] = useState(false);
    const [useInSorting, setUseInSorting] = useState(false);
    const [attributeCode, setAttributeCode] = useState("");
    const [defaultValue, setDefaultValue] = useState("");
    const attributeOption = [];
    const [attributeOptions, setAttributeOptions ] = useState(attributeOption);
    
    useEffect(() => {
        if(success) {
            alert.success("Attribute created successfully");
            navigate("/admin/attributes");
            dispatch({ type: NEW_ATTRIBUTE_RESET });
        }
    }, [alert, success, navigate, dispatch]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[alert, dispatch, error]);

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

    const createAttributeSubmitHandler = (event) => {
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
        dispatch(createAttribute(myForm));
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
        setFrontendInput(value.trim());
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
        let newattributeCode = value.toLowercase().replaceAll(" ","_");
        setAttributeCode(newattributeCode);
    }

    let attributeOptionFormElementArray = [];
    for(let fKey in attributeOptions) {
        const attributeOptionRow = [];
        for(let sKey in attributeOptions[fKey]) {
            attributeOptionRow.push({ id: sKey, config: attributeOptions[fKey][sKey]})
        }
        attributeOptionFormElementArray.push(attributeOptionRow);
    }

    return (<FormContainer pagetitle={"Add Attributes"}>
        {loading ? <Loader /> : <form className="createAttributeForm" encType="multipart/form-data" onSubmit={createAttributeSubmitHandler}>
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
                    value={attributeCode}
                    onChange={(e) => setAttributeCode(e.target.value)} 
                />
            </div>
            <div>
                <AccountTreeOutlined />
                <select onChange={(e) => chooseAttributeTypeHandler(e.target.value)} defaultValue={frontendInput}>
                    <option value={"text"}>Text Field</option>
                    <option value={"price"}>Price</option>
                    <option value={"number"}>Number</option>
                    <option value={"boolean"}>Boolean</option>
                    <option value={"select"}>Select</option>
                    <option value={"multiselect"}>Multi Select</option>
                    <option value={"checkbox"}>CheckBox</option>
                    <option value={"radio"}>Radio Button</option>
                    <option value={"textarea"}>Textarea</option>
                    <option value={"file"}>File</option>
                    <option value={"date"}>Date</option>
                </select>
            </div>
            {(frontendInput !== 'text'
                && frontendInput !== 'textarea'
                && frontendInput !== 'file'
                && frontendInput !== 'date') && <div>
                <label className="title">Use in Filter</label>
                <Boolean id="useInFilter" value={useInFilter} onChange={()=>setUseInFilter(prev => !prev)}/>
            </div>}
            <div>
                <label className="title">Use in Sorting</label>
                <Boolean id="useInSorting" value={useInSorting} onChange={()=>setUseInSorting(prev => !prev)}/>
            </div>
            {(
                frontendInput !== "select" && 
                frontendInput !== "multiselect" &&
                frontendInput !== "checkbox" &&
                frontendInput !== "radio"
                ) ? <>{frontendInput === 'boolean' ? <>
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
                </div>}</>: <></>}
            <div>
                <AccountTreeOutlined />
                <select onChange={(e) => setIsRequired(e.target.value)} defaultValue={isRequired}>
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
                            attributeOptionFormElementArray.map((option, oIndex) => {
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
            <Button id="createProductBtn" type="submit">Create</Button>
        </form>}
    </FormContainer>);
}

export default AddAttribute;
