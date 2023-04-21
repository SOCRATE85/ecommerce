import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../../../Controls/Input';
import ActionControl from '../../../../common/ActionControl';
import { FormContainer } from '../../../../common/components/FormContainer';
import { addNewSlider, clearErrors, getAllSlider, addNewSliderReset } from "../../../../store";
import "./AddSlider.css";

const AddSlider = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { success, error } = useSelector(state => state.addSlider);
    const [formState, setFormState] = useState({
        title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Slider Title",
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
        position: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Slider Position",
                error: ""
            },
            value: "",
            validation: {
                required: false,
                isNum: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        show_title: {
            elementType: "boolean",
            elementConfig: {
                placeholder: "Show Title",
                error: "",
                type: "boolean"
            },
            value: false,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        description: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
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
        style_content: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                error: "",
                placeholder: "Custom Style"
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        width: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Width",
                error: ""
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        height: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Height",
                error: ""
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        show_caption: {
            elementType: "boolean",
            elementConfig: {
                placeholder: "Show Caption",
                error: "",
                type: "boolean"
            },
            value: false,
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        slider_speed: {
           elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Slider Speed",
                error: ""
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        min_item: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Minimum Items",
                error: ""
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        max_item: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Maximum Item",
                error: ""
            },
            value: "",
            validation: {
                required: false
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        status: {
            elementType: "boolean",
            elementConfig: {
                placeholder: "Status",
                error: "",
                type: "boolean"
            },
            value: false,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        }
    });
    
    const actioncontrol = useMemo(() => {
        return new ActionControl({formState, setFormState});
    },[formState, setFormState]);
    
    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    useEffect(() => {
        if(success) {
            alert.success("New Slider added successfully");
            dispatch(getAllSlider());
            navigate('/admin/sliders');
            dispatch(addNewSliderReset());
        }
    },[dispatch, success, alert, navigate]);

    const createSubmitHandler = (state) => {
        const myForm = new FormData();
        for(let key in state) {
            myForm.set(key, state[key].value)
        }
        dispatch(addNewSlider(myForm));
    }

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
    
    return (<FormContainer pagetitle={"Add New Slider"}>
        <form
            className="createCategoryForm md:w-full mx-auto" 
            encType="multipart/form-data"
            onSubmit={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}
        >
            {formElementArray.map(element => {
                switch (element.config.elementType) {
                    case 'select':
                    case "multiselect":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> actioncontrol.selectOptionChangeHandler(e, element.id)}
                        />
                    case "editor":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(data) => actioncontrol.chkEditorHandler(data, element.id)}
                        />
                    case "checkbox":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> actioncontrol.checkboxOptionChangeHandler(e, element.id)}
                        />
                    case 'file': 
                            return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            removeImage={actioncontrol.removeImage}
                            changed={(e)=> actioncontrol.createBlogImageChange(e, element.id)}
                        />
                    case "input":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                        />
                    case "textarea":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                        />
                    case "boolean":
                        return <Input 
                            id={element.id}
                            key={element.id}
                            hideLabel={element.config.hideLabel}
                            elementType={element.config.elementType}
                            label={element.config.elementConfig.placeholder}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                        />
                    default:
                        return null
                }
            })}
            <Button id="createCategoryBtn" type="submit">Create Slider</Button>
        </form>
    </FormContainer>)
}

export default AddSlider;