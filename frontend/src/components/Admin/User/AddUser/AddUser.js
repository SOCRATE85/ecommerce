import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { uploadFiles, addUser, addUserReset, getAllUsers, clearErrors } from '../../../../store';
import { FormContainer } from '../../../../common/components/FormContainer';
import ActionControl from '../../../../common/ActionControl';
import { useThunk } from '../../../../common/hooks/use-thunk';
import { Loader } from "../../../layout";
import FormElement from '../../../../common/components/FormElement';
import FormAction from "../../../../common/components/FormAction/FormAction";
import SubmitActionButton from '../../../../common/components/SubmitActionButton';

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
        <FormAction submitHandler={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}
        >
            <FormElement 
                formElementArray={formElementArray}
                actioncontrol={actioncontrol}
                createImageChange={createImageChange}
            />
            <SubmitActionButton title={'Add User'} />
        </FormAction>
    </FormContainer>
}

export default AddUserInAdmin;
