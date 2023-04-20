import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../../../Controls/Input';
import ActionControl from '../../../../common/ActionControl';
import { FormContainer } from '../../../../common/components/FormContainer';
import "./UpdateBanner.css";
import { updateBanner, clearErrors, getBanner, getAllBanner, updateBannerReset } from "../../../../store";
import { getAllSlider } from '../../../../store/actions/sliderAction';

const UpdateBanner = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [status, setStatus] = useState(false);
    const {images: uploadedImage} = useSelector(state=>state.uploadImage);
    const {sliders} = useSelector(state => state.sliders);
    const [ images, setImages ] = useState([]);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);
    const { isUpdated } = useSelector(state => state.updateBanner);
    const { banner, error, loading } = useSelector(state => state.banner);
    const bannerId = params.id;
    const [formState, setFormState] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Banner Name",
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
        slider_id: {
            elementType: "select",
            elementConfig: {
                placeholder: "Banner Slider",
                error: "",
                options: [
                    {
                        value: 0,
                        defaultValue: "Select Slider"
                    }
                ]
            },
            value: null,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            isMulti: true,
            touched: false
        },
        bannerOrder: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Order",
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
        clickurl: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Click Url",
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
    
    const sliderOption = useMemo(() => {
        let _slider = [
            {
                value: "",
                label: "Select Slider"
            }
        ];
        for(let key in sliders) {
            _slider.push({
                value: sliders[key]._id,
                label: sliders[key].title
            });
        }
        return _slider;
    },[sliders]);
    
    useEffect(() => {
        if(loading) {
            return;
        }
        if(banner && banner._id !== bannerId) {
            dispatch(getBanner(bannerId));
        }else {
            !status && actioncontrol.setFormDataValues(banner, setStatus);
        }
        dispatch(getAllSlider());
    },[dispatch, banner, bannerId, actioncontrol, status, loading]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    }, [error, alert, dispatch]);

    useEffect(() => {
        if(isUpdated) {
            alert.success("Banner updated successfully");
            dispatch(getAllBanner());
            dispatch(getBanner(bannerId));
            navigate('/admin/banners');
            dispatch(updateBannerReset());
        }
    },[dispatch, isUpdated, alert, navigate, bannerId]);

    const updateSubmitHandler = (state) => {
        const myForm = new FormData();
        for(let key in state) {
            if(key === 'slider_id') {
                myForm.set("slider_id", formState.slider_id.value.value);
            } else {
                myForm.set(key, state[key].value);
            }
        }
        dispatch(updateBanner(bannerId, myForm));
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
    
    return (<FormContainer pagetitle={"Update Banner"}>
        <form
            className="createCategoryForm md:w-full mx-auto" 
            encType="multipart/form-data"
            onSubmit={(e) => actioncontrol.updateSubmitHandler(e, updateSubmitHandler)}
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
                            options={element.id === "slider_id" && sliderOption}
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
                            changed={(e)=> actioncontrol.createImageChange(e, element.id)}
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
            <Button id="createCategoryBtn" type="submit">Update Slider</Button>
        </form>
    </FormContainer>)
}

export default UpdateBanner;
