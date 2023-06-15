import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ActionControl from '../../common/ActionControl';
import Loader from "../layout/Loader/Loader";
import FormAction from '../../common/components/FormAction';
import FormElement from '../../common/components/FormElement';
import SubmitButton from '../../common/components/SubmitActionButton';
import { clearErrors, register, uploadFiles } from "../../store";
import { useAlert } from "../../common/hooks/use-alert";
import "./LoginSignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.user);
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
    password: {
      elementType: "input",
      elementConfig: {
          type: "password",
          placeholder: "Password",
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
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const redirect = location.search
        ? `/${location.search.split("=")[1]}`
        : "/account";
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, location.search]);

  const createSubmitHandler = (state) => {
    const myForm = new FormData();
    myForm.set("name", state.name.value);
    myForm.set("email", state.email.value);
    myForm.set("password", state.password.value);
    myForm.set("avatar", state.avatar.value);
    myForm.set("status", true);
    dispatch(register(myForm));
    if (isAuthenticated) {
      navigate("/account");
    }
  };

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

  if (error || loading) {
    return <Loader />;
  }
  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <FormAction submitHandler={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}>
          <FormElement 
            formElementArray={formElementArray}
            actioncontrol={actioncontrol}
            createImageChange={createImageChange}
          />
          <Link to={'/login'}>Please login if you have already account.</Link>
          <SubmitButton title={'Register'}></SubmitButton>
          </FormAction>
      </div>
    </div>
  );
};

export default SignUp;
