import React, { useState, useEffect, useMemo } from "react";
import { useAlert } from 'react-alert';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import DataListing from "../../../../common/components/DataListing";
import { createBlogCategory, clearErrors, getAllBlog, createBlogCategoryReset } from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import { useThunk } from "../../../../common/hooks/use-thunk";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from '../../../../common/components/FormAction';
import TabPanelContainer from "../../../../common/components/TabPanelContainer";
import ActionControl from '../../../../common/ActionControl';
import FormElement from "../../../../common/components/FormElement/FormElement";

const AddBlogCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const [posts, setPosts] = useState([]);
    const [doGetAllBlog, isLoading, isBlogsError] = useThunk(getAllBlog);
    const {blogs} = useSelector(state => state.blogs);
    const {success} = useSelector(state => state.createBlogCategory);
    const [formState, setFormState] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Category Name",
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
        meta_title: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Meta Title",
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
        meta_tags: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                placeholder: "Meta Tags",
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
        meta_description: {
            elementType: "textarea",
            elementConfig: {
                type: "text",
                placeholder: "Meta Description",
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
                error: ""
            },
            value: true,
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
            setFormState
        });
    },[
        formState,
        setFormState
    ]);


    const columns = [
        { field: "__check__", sortable: false, minWidth: 40},
        { field: "id", headerName: "ID", minWidth: 200},
        { field: "title", headerName: "Title", minWidth: 200},
        { field: "status", headerName: "Status", type: "number", minWidth: 50},
        { field: "created_at", headerName: "Created At", type: "number", minWidth: 200},
        { field: "updated_at", headerName: "Updated At", type: "number", minWidth: 200}
    ];

    useEffect(() => {
        doGetAllBlog();
    }, [doGetAllBlog]);

    useEffect(() => {
        if(success) {
            alert.success("Blog category added successfully");
            navigate("/admin/blog/categories");
            dispatch(createBlogCategoryReset());
        }
    },[alert, success, navigate, dispatch])

    useEffect(() => {
        if(isBlogsError) {
            alert.error(isBlogsError.error);
            dispatch(clearErrors());
        }
    }, [isBlogsError, alert, dispatch]);

    const rows = useMemo(() => {
        const _rows = [];
        blogs && blogs.forEach(blog => {
            _rows.push({
                id: blog._id,
                title: blog.title,
                status: blog.status,
                created_at: blog.created_at,
                updated_at: blog.updated_at
            });
        });
        return _rows;
    },[blogs]);

    const onSelectionModelChange = (items) => {
        setPosts(items);
    }

    const createSubmitHandler = (state) => {
        const myForm = new FormData();
        myForm.set("name", state.name.value);
        myForm.set("meta_title", state.meta_title.value);
        myForm.set("meta_tags", state.meta_tags.value);
        myForm.set("meta_description", state.meta_description.value);
        myForm.set("status", state.status.value);
        if(posts !== null){
            myForm.set("posts", posts);
        }
        dispatch(createBlogCategory(myForm));
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

    if(isLoading || isBlogsError) {
        return (<Loader />);
    }

    const firstTabContents = (
        <FormAction submitHandler={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}>
            <FormElement 
                formElementArray={formElementArray} 
                actioncontrol={actioncontrol}
            />
            <SubmitActionButton title={'Create Blog Category'} />
        </FormAction>
    );
    const secondTabContents = (
        <DataListing 
            columns={columns} 
            rows={rows}
            checkboxSelection
            onSelectionModelChange={onSelectionModelChange}
            selectedProducts = {posts}
        />
    );

    return (<><FormContainer pagetitle={'New Blog Category'}>
            <TabPanelContainer 
                firstTabContents={firstTabContents} 
                secondTabContents={secondTabContents}
            />
        </FormContainer>        
    </>);
}

export default AddBlogCategory;
