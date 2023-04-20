import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../../../Controls/Input';
import { uploadFiles, addUser, addUserReset, getAllUsers, clearErrors } from '../../../../store';
import { FormContainer } from '../../../../common/components/FormContainer';
import ActionControl from '../../../../common/ActionControl';
import { useThunk } from '../../../../common/hooks/use-thunk';
import { Loader } from "../../../layout";

const AddUserInAdmin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [doAddUser, isLoadingUser, isErrorInUser] = useThunk(addUser)
    const { images: uploadedImage } = useSelector(state => state.uploadImage);
    const [ images, setImages ] = useState([]);
    const { success } = useSelector(state => state.addUser);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);
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
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                placeholder: "Email",
                error: ""
            },
            value: "",
            validation: {
                required: true,
                isEmail: true,
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        image: {
            elementType: "file",
            elementConfig: {
                type: "file",
                error: "",
                placeholder: "Avatar"
            },
            value: [],
            validation: {
                required: false,
                isImage: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        role: {
            elementType: "select",
            elementConfig: {
                placeholder: "Role",
                error: "",
                options: [
                    {
                        value: "",
                        defaultValue: "Select Role"
                    },
                    {
                        value: "user",
                        defaultValue: "User"
                    },
                    {
                        value: "admin",
                        defaultValue: "Admin"
                    },
                ]
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            isMulti: true,
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
        return new ActionControl({
            formState,
            setFormState,
            imageUpload,
            setImageUpload,
            imageIdentifier,
            setImageIdentifier,
            images,
            setImages,
        });
    },[
        formState,
        setFormState,
        imageUpload,
        setImageUpload,
        imageIdentifier,
        setImageIdentifier,
        images,
        setImages,
    ]);

    useEffect(() => {
        if(isErrorInUser) {
            alert.error(isErrorInUser.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, isErrorInUser]);

    useEffect(() => {
        if(success) {
            alert.success("New User added successfully");
            dispatch(getAllUsers());
            navigate('/admin/users');
            dispatch(addUserReset());
        }
    },[dispatch, success, alert, navigate]);

    useEffect(() => {
        if(imageUpload && uploadedImage.length > 0) {
            actioncontrol.loadOption();
        }
    }, [uploadedImage, imageUpload, actioncontrol]);

    const createSubmitHandler = (state) => { console.log('state: ', state);
        const myForm = new FormData();
        for(let key in state) {
            myForm.set(key, state[key].value);
        }
        myForm.set("password", "password");
        doAddUser(myForm);
    }

    const createImageChange = (e, identifier) => {
        const files = Array.from(e.target.files);
        setImageIdentifier(identifier);
        setImageUpload(true);
        dispatch(uploadFiles(files));
    }

    let formElementArray = useMemo(() => {
        const _formElementArray = [];
        const tempformElementArray = actioncontrol.getFormState();
        console.log('tempformElementArray: ', tempformElementArray);
        for(let key in tempformElementArray) {
            _formElementArray.push({
                id: key,
                config: tempformElementArray[key]
            })
        }
        return _formElementArray;
    }, [actioncontrol]);

    if(isLoadingUser) {
        return <Loader />
    }

    return <FormContainer pagetitle={'Add New User'}>
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
                            changed={(e)=> actioncontrol.createImageChange(e, element.id, createImageChange)}
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
            <Button id="createCategoryBtn" type="submit">Add User</Button>
        </form>
    </FormContainer>
}

export default AddUserInAdmin;
