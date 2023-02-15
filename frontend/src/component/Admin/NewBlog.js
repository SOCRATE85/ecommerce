import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../Controls/Input';
import { checkValidation, validate, validatedForm } from "../../common/validation";
import Loader from "../layout/Loader/Loader";
import { getAllBlogCategories } from "../../store/actions/blogCategoryAction";
import { createBlog } from "../../store/actions/blogAction";
import { CREATE_BLOG_RESET } from "../../store/contants/blogContent";
import { FormContainer } from "../../common/components/FormContainer";

const NewBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {loading: loadingBlog, success} = useSelector( state => state.createBlog );
    const { blogcategories, loading } = useSelector(state => state.blogCategories);
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
        fullContent: {
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
        shortContent: {
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
            elementType: "select",
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
        metaTitle: {
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
        metaTags: {
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
        metaDescription: {
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
            updatedFormElement.value = images;
            const validation = checkValidation(images , updatedFormElement.validation);
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
            _updatedFormElement[imageIdentifier] = updatedFormElement;
            setFormState(_updatedFormElement);
            setImageUpload(false);
        }
        if(imageUpload && images.length > 0) {
            loadOption();
        }
    }, [imageIdentifier, images, formState, imageUpload]);

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
        setFormState(_updatedFormElement);
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
        myForm.set("title", formState.title.value);
        myForm.set("full_content", formState.fullContent.value);
        myForm.set("short_content", formState.shortContent.value);
        myForm.set("categories", formState.categories.value.value);
        const blogimages = formState.blogimages.value;
        blogimages.map((image) => {
            myForm.append("blogimages", image);
            return true;
        });
        myForm.set("meta_title", formState.metaTitle.value);
        myForm.set("meta_tags", formState.metaTags.value);
        myForm.set("meta_description", formState.metaDescription.value);
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
    console.log(formElementArray);
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
            <Button id="createCategoryBtn" type="submit">Create</Button>
        </form>}
    </FormContainer>);
}

export default NewBlog;
