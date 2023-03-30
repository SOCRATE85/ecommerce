import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../../../Controls/Input';
import { checkValidation, validate, validatedForm } from "../../../../common/validation";
import Loader from "../../../layout/Loader/Loader";
import { getAllBlogCategories } from "../../../../store/actions/blogCategoryAction";
import { createBlog } from "../../../../store/actions/blogAction";
import { uploadFiles } from "../../../../store/actions/uploadAction";
import { CREATE_BLOG_RESET } from "../../../../store/contants/blogContent";
import { FormContainer } from "../../../../common/components/FormContainer";
import { slugify } from "../../../../common/slugify";

const AddNewBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {loading: loadingBlog, success} = useSelector( state => state.createBlog );
    const { blogcategories, loading } = useSelector(state => state.blogCategories);
    const {images: uploadedImage /*, loading: loadImages*/} = useSelector(state=>state.uploadImage);
    const [ images, setImages ] = useState([]);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);
    const [formState, setFormState] = useState({
        title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Title",
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
        url_path: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Url Path",
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
        full_content: {
            elementType: "editor",
            elementConfig: {
                type: "editor",
                error: "",
                placeholder: "Full Contents"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        short_content: {
            elementType: "editor",
            elementConfig: {
                type: "editor",
                error: "",
                placeholder: "Short Contents"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        categories: {
            elementType: "multiselect",
            elementConfig: {
                placeholder: "Blog Category",
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
                required: true
            },
            hideLabel: false,
            valid: false,
            isMulti: true,
            touched: false
        },
        blogimages: {
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
        meta_title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                error: "",
                placeholder: "Meta Title"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        meta_tags: {
            elementType: "input",
            elementConfig: {
                type: "text",
                error: "",
                placeholder: "Meta Tags"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        meta_description: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                error: "",
                placeholder: "Meta Description"
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        status: {
            elementType: "select",
            elementConfig: {
                placeholder: "Status",
                error: "",
                options: [
                    {
                        value: 0,
                        defaultValue: "Select Status"
                    },
                    {
                        value: 1,
                        defaultValue: "Enabled"
                    },
                    {
                        value: 2,
                        defaultValue: "Disabled"
                    }
                ]
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
    
    useEffect(() => {
        if(success) {
            alert.success("Blog created successfully");
            navigate("/admin/blogs");
            dispatch({ type: CREATE_BLOG_RESET });
        }
    }, [alert, success, navigate, dispatch]);

    useEffect(() => {
        dispatch(getAllBlogCategories());
    },[dispatch]);
    
    const categoryOption = useMemo(() => {
        let _category = [
            {
                value: 0,
                label: "Select category"
            }
        ];
        for(let key in blogcategories) {
            _category.push({
                value: blogcategories[key]._id,
                label: blogcategories[key].name
            });
        }
        return _category;
    },[blogcategories]);
    
    useEffect(() => {
        const loadOption = () => {
            const _updatedFormElement = {...formState};
            const updatedFormElement = {..._updatedFormElement[imageIdentifier]};
            updatedFormElement.touched = true;
            updatedFormElement.value = [...updatedFormElement.value, ...uploadedImage];
            const validation = checkValidation(uploadedImage , updatedFormElement.validation);
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
            _updatedFormElement[imageIdentifier] = updatedFormElement;
            setFormState(_updatedFormElement);
            setImageUpload(false);
        }
        if(imageUpload && uploadedImage.length > 0) {
            loadOption();
        }
    }, [imageIdentifier, uploadedImage, formState, imageUpload]);

    const selectOptionChangeHandler = (value, identifier) => {
        const _updatedFormElement = {...formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = value;
        const validation = checkValidation(value, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        setFormState(_updatedFormElement);
    }

    const createBlogImageChange = (e, identifier) => {
        const files = Array.from(e.target.files);
        setImageIdentifier(identifier);
        setImageUpload(true);
        dispatch(uploadFiles(files));
    }
    
    const checkboxOptionChangeHandler = (event, identifier) => {
        const _updatedFormElement = {...formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        const validation = checkValidation(event.target.value, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        setFormState(_updatedFormElement);
    }

    const inputOptionChangeHandler = (event, identifier) => {
        const _updatedFormElement = {...formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        const validation = checkValidation(event.target.value, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;

        if(identifier === 'title') {
            const __updatedFormElement = {..._updatedFormElement};
            const updatedFormElement = {...__updatedFormElement["url_path"]};
            updatedFormElement.touched = true;
            const url = slugify(event.target.value);
            updatedFormElement.value = url;
            const validation = checkValidation(event.target.value, updatedFormElement.validation);
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
            __updatedFormElement["url_path"] = updatedFormElement;
            setFormState(__updatedFormElement);
        } else {
            setFormState(_updatedFormElement);
        }
    }

    const chkEditorHandler = (data, identifier) => {
        if(!data || data === '') return;
        const _updatedFormElement = {...formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = data;
        const validation = checkValidation(data, updatedFormElement.validation);
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        setFormState(_updatedFormElement);
    }
      
    const removeImage = (imageIndex, imageIdentifier) => {
        const updatedFormState = {...formState};
        const _images = images.filter((_, index) => index !== imageIndex) 
        const updatedFormElement = {...updatedFormState[imageIdentifier]};        
        updatedFormElement.value = _images.length !== 0 ? _images : [];
        updatedFormState[imageIdentifier] = updatedFormElement;
        setFormState(updatedFormState);
        setImages(_images.length !== 0 ? _images : []);
    }

    const createBlogSubmitHandler = (e) => {
        e.preventDefault();
        
        const validatedData = validate(formState);
        setFormState(validatedData);
        const validated = validatedForm(formState);
        if(!validated) {
            return;
        }
        const myForm = new FormData();
        const _categories = formState.categories.value.reduce((result, item) => {return result.concat(item.value)}, []).filter(item => item !=='');
        myForm.set("categories", _categories);
        myForm.set("title", formState.title.value);
        myForm.set("full_content", formState.full_content.value);
        myForm.set("short_content", formState.short_content.value);
        
        const blogimages = formState.blogimages.value;
        blogimages.map((image) => {
            myForm.append("blogimages", image);
            return true;
        });
        myForm.set("meta_title", formState.meta_title.value);
        myForm.set("meta_tags", formState.meta_tags.value);
        myForm.set("meta_description", formState.meta_description.value);
        myForm.set("status", formState.status.value.value);
        dispatch(createBlog(myForm));
    }

    if(loading) {return <></>}

    let formElementArray = [];
    for(let key in formState) {
        formElementArray.push({
            id: key,
            config: formState[key]
        })
    }
   
    return (<FormContainer pagetitle={"Add New Blog"}>
        {loading || loadingBlog ? <Loader /> : <form
            className="createCategoryForm" 
            encType="multipart/form-data"
            onSubmit={(e) => createBlogSubmitHandler(e)}
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
                            options={element.id === "categories" && categoryOption}
                            value={element.config.value}
                            isValid={!element.config.valid}
                            shouldValidate={element.config.validation.required}
                            touched={element.config.touched}
                            changed={(e)=> selectOptionChangeHandler(e, element.id)}
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
                            changed={(data) => chkEditorHandler(data, element.id)}
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
                            changed={(e)=> checkboxOptionChangeHandler(e, element.id)}
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
                            removeImage={removeImage}
                            changed={(e)=> createBlogImageChange(e, element.id)}
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
                            changed={(e)=> inputOptionChangeHandler(e, element.id)}
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
                            changed={(e)=> inputOptionChangeHandler(e, element.id)}
                        />
                    default:
                        return null
                }
            })}
            <Button id="createCategoryBtn" type="submit">Create Post</Button>
        </form>}
    </FormContainer>);
}

export default AddNewBlog;
