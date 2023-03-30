import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import Input from '../../../Controls/Input';
import { checkValidation, validate, validatedForm } from "../../../../common/validation";
import Loader from "../../../layout/Loader/Loader";
import { getAllBlogCategories } from "../../../../store/actions/blogCategoryAction";
import { clearErrors, updateBlog, getBlog } from "../../../../store/actions/blogAction";
import { uploadFiles } from "../../../../store/actions/uploadAction";
import { UPDATE_BLOG_RESET } from "../../../../store/contants/blogContent";
import { FormContainer } from "../../../../common/components/FormContainer";
import { slugify } from "../../../../common/slugify";

const UpdateBlog = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const alert = useAlert();
    const [ monuted, setMounted ] = useState(true);
    const { blog, loading: loadingBlogDetail, error } = useSelector(state => state.blogDetail);
    const { isUpdated } = useSelector( state => state.updateBlog );
    const { blogcategories } = useSelector(state => state.blogCategories);
    const { images: uploadedImage/*, loading: loadImages*/ } = useSelector(state=>state.uploadImage);
    const [ images, setImages ] = useState([]);
    const [ imageIdentifier, setImageIdentifier ] = useState([]);
    const [ imageUpload, setImageUpload ] = useState(false);
    const blogId = params.id;
    const options = useMemo(() => {
        return [
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
        ];
    },[]);
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
                options
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
        if(!blog) return;
        const setPopulate = () => {
            if(blog) {
                if(blog._id === blogId) {
                    const cloneFormKey = {...formState};
                    for(let key in cloneFormKey) {
                        switch (cloneFormKey[key].elementType) {
                            case 'select':
                            case 'multiselect':
                                if(key === 'categories') {
                                    const categories = blog[key];
                                    const _temp = [];
                                    blogcategories.forEach(category => {
                                        categories.forEach(_categiory => {
                                            if(category._id === _categiory) {
                                                _temp.push({
                                                    value: category._id,
                                                    label: category.name
                                                })
                                            }
                                        });
                                    });
                                    cloneFormKey[key].value = _temp;
                                } 
                                if(key === 'status') {
                                    const _temp = [];
                                    for(let _key in options) {
                                        if(options[_key].value === blog[key]) {
                                            _temp.push({
                                                value: options[_key].value,
                                                label: options[_key].defaultValue
                                            });
                                        }
                                    }
                                    cloneFormKey[key].value = _temp[0];
                                }                                
                                cloneFormKey[key].valid = true;
                            break;
                            case 'file':
                                cloneFormKey[key].value = blog[key] ? blog[key] : [];
                                cloneFormKey[key].valid = true;
                                setImages(blog[key] ? blog[key] : []);
                                setImageIdentifier(key);
                            break;
                            default:
                                cloneFormKey[key].value = blog[key];
                                cloneFormKey[key].valid = true;
                            break;
                        }
                    }
                    setFormState(cloneFormKey);
                    setMounted(false);
                }
            }
        }
        if(monuted) {
            setPopulate();
        }
        return () => setMounted(false);
    },[blog, blogId, formState, monuted, blogcategories, options]);

    useEffect(() => {
        dispatch(getBlog(blogId));
        dispatch(getAllBlogCategories());
    },[dispatch, blogId]);
    
    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [error, dispatch, alert]);

    useEffect(() => {
        if(isUpdated) {
            alert.success("Blog is updated successfully");
            navigate("/admin/blogs");
            dispatch(getBlog(blogId));
            dispatch({ type: UPDATE_BLOG_RESET });
        }
    }, [alert, isUpdated, navigate, dispatch, blogId]);
    
    useEffect(() => {
        const loadOption = () => {
            const _updatedFormElement = {...formState};
            const updatedFormElement = {..._updatedFormElement[imageIdentifier]};
            updatedFormElement.touched = true;
            updatedFormElement.value = [...updatedFormElement.value, ...uploadedImage];
            setImages(uploadedImage);
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

    const createBlogImageChange = async (e, identifier) => {
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
        if(updatedFormElement.value.length === 0) {
            updatedFormElement.valid = false;
        }
        updatedFormState[imageIdentifier] = updatedFormElement;
        setFormState(updatedFormState);
        setImages(_images.length !== 0 ? _images : []);
    }

    const updateBlogSubmitHandler = (e) => {
        e.preventDefault();
        const validatedData = validate(formState);
        setFormState(validatedData);
        const validated = validatedForm(formState);
        if(!validated) {
            return;
        }
        const myForm = new FormData();
        myForm.set("title", formState.title.value);
        myForm.set("full_content", formState.full_content.value);
        myForm.set("short_content", formState.short_content.value);
        myForm.set("categories", formState.categories.value.reduce((result, item) => {return result.concat(item.value)}, []).filter(item => item !==''));
        const blogimages = formState.blogimages.value;
        blogimages.map((image) => {
            myForm.append("blogimages", image);
            return true;
        });
        myForm.set("meta_title", formState.meta_title.value);
        myForm.set("meta_tags", formState.meta_tags.value);
        myForm.set("meta_description", formState.meta_description.value);
        myForm.set("status", formState.status.value.value);
        dispatch(updateBlog(myForm, blogId));
    }

    const formElementArray = useMemo(() => {
        let _formElementArray = [];
        for(let key in formState) {
            _formElementArray.push({
                id: key,
                config: formState[key]
            })
        }
        return _formElementArray;
    },[formState]);

    if(loadingBlogDetail) {return <></>}
    
    return (<FormContainer pagetitle={"Update Blog"}>
        {loadingBlogDetail ? <Loader /> : <form
            className="createCategoryForm" 
            encType="multipart/form-data"
            onSubmit={(e) => updateBlogSubmitHandler(e)}
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
            <Button id="createCategoryBtn" type="submit">Update Post</Button>
        </form>}
    </FormContainer>);
}

export default UpdateBlog;
