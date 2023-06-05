import React, { useState, useEffect, useMemo } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ActionControl from '../../common/ActionControl';
import Loader from "../layout/Loader/Loader";
import FormAction from '../../common/components/FormAction';
import FormElement from '../../common/components/FormElement';
import SubmitButton from '../../common/components/SubmitActionButton';
import { clearErrors, loadUser, updateProfile, updateProfileReset, uploadFiles } from '../../store';
import { useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import "./EditProfile.css";

const EditProfile = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: userData, loading: loadingUser } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);
    const [status, setStatus] = useState(false);
    const { images: uploadedImage } = useSelector(state=>state.uploadImage);
    const [ images, setImages ] = useState([]);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);
    const [formState, setFormState] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Name",
                error: "",
                icons: <FaceOutlinedIcon />
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
                error: "",
                icons: <EmailOutlinedIcon />
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
        avatar: {
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
            multiple: false,
            hideLabel: false,
            valid: false,
            touched: false
        },
    });

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
        if(!userData) { 
            dispatch(loadUser());
        }
        else {
            !status && actioncontrol.setFormDataValues(userData, setStatus);
        }
    },[dispatch, userData, actioncontrol, status, loading]);
    
    useEffect(() => {
        if(imageUpload && uploadedImage && uploadedImage.length > 0) {
            actioncontrol.loadOption();
        }
    }, [uploadedImage, imageUpload, actioncontrol]);
    
    const createImageChange = (e, identifier) => {
        const files = Array.from(e.target.files);
        setImageIdentifier(identifier);
        setImageUpload(true);
        dispatch(uploadFiles(files));
    }
    
    useEffect(() => {
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch(updateProfileReset());
        }
    }, [dispatch, error, alert, isUpdated, navigate, userData]);

    const updateSubmitHandler = (state) => {
        const myForm = new FormData();
        myForm.set("name", state.name.value);
        myForm.set("email", state.email.value);
        myForm.set("avatar", state.avatar.value);
        dispatch(updateProfile(myForm));
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

    if(loadingUser || loading){
        return <Loader />
    }
    console.log("formElementArray: ", formElementArray);
    console.log("uploadedImage: ", uploadedImage);
    return <>
        <MetaData title = {`Update ${userData && userData.name }'s Profile`} />
        <div className='updatePofileContainer'>
            <div className='updatePofileBox'>
                <h2 className='updatePofileHeading'>Update Profile</h2>
                <FormAction submitHandler={(e) => actioncontrol.updateSubmitHandler(e, updateSubmitHandler)}>
                    <FormElement
                        formElementArray={formElementArray}
                        actioncontrol={actioncontrol}
                        createImageChange={createImageChange}
                    />
                    <SubmitButton title="Update" />
                </FormAction>
            </div>
        </div>
    </>
}

export default EditProfile;
