import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import DataListing from "../../../../common/components/DataListing";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";
import TabPanelContainer from "../../../../common/components/TabPanelContainer";
import ActionControl from "../../../../common/ActionControl";
import {
  clearErrors,
  getBlogCategoryDetail,
  updateBlogCategory,
  updateBlogCategoryReset,
  getAllBlog,
} from "../../../../store";
import FormElement from "../../../../common/components/FormElement/FormElement";

const UpdateBlogCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { blogcategory, loading, error } = useSelector(
    (state) => state.blogCategory
  );
  const { isUpdated, loading: loadingUpdate } = useSelector(
    (state) => state.updateBlogCategory
  );
  const { blogs } = useSelector((state) => state.blogs);
  const [status, setStatus] = useState("");
  const [selectedBlogs, setSelectedBlogs] = useState([]);
  const categoryId = params.id;
  const [formState, setFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Category Name",
        error: "",
      },
      value: "",
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    meta_title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Meta Title",
        error: "",
      },
      value: "",
      validation: {
        required: false,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    meta_tags: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Meta Tags",
        error: "",
      },
      value: "",
      validation: {
        required: false,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    meta_description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        placeholder: "Meta Description",
        error: "",
      },
      value: "",
      validation: {
        required: false,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    status: {
      elementType: "boolean",
      elementConfig: {
        placeholder: "Status",
        error: "",
      },
      value: true,
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
  });

  const actioncontrol = useMemo(() => {
    return new ActionControl({
      formState,
      setFormState,
    });
  }, [formState, setFormState]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (blogcategory && blogcategory._id !== categoryId) {
      dispatch(getBlogCategoryDetail(categoryId));
    } else {
      !status && actioncontrol.setFormDataValues(blogcategory, setStatus);
      setSelectedBlogs(() => {
        let blogs = [];
        blogcategory.blogs &&
          blogcategory.blogs.forEach((blog) => {
            blogs.push(blog._id);
          });
        return blogs.join(",");
      });
    }
  }, [dispatch, blogcategory, categoryId, actioncontrol, status, loading]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Category is updated successfully");
      navigate("/admin/blog/categories");
      dispatch(getBlogCategoryDetail(categoryId));
      dispatch(updateBlogCategoryReset());
    }
  }, [dispatch, isUpdated, alert, navigate, categoryId]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    dispatch(getAllBlog());
  }, [dispatch]);

  const updateSubmitHandler = (state) => {
    const myForm = new FormData();
    myForm.set("name", state.name.value);
    myForm.set("meta_title", state.meta_title.value);
    myForm.set("meta_tags", state.meta_tags.value);
    myForm.set("meta_description", state.meta_description.value);
    myForm.set("status", state.status.value);
    if (selectedBlogs.length > 0) {
      myForm.set("posts", selectedBlogs);
    }
    dispatch(updateBlogCategory({ categoryData: myForm, categoryId }));
  };

  const onSelectionModelChange = (_blogs) => {
    setSelectedBlogs(_blogs);
  };

  const columns = [
    { field: "__check__", sortable: false, minWidth: 40 },
    { field: "id", headerName: "ID", minWidth: 200 },
    { field: "title", headerName: "Title", minWidth: 200 },
    { field: "status", headerName: "Status", type: "number", minWidth: 50 },
    {
      field: "created_at",
      headerName: "Created At",
      type: "number",
      minWidth: 200,
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      type: "number",
      minWidth: 200,
    },
  ];
  const rows = useMemo(() => {
    let _rows = [];
    blogs &&
      blogs.forEach((blog) => {
        _rows.push({
          id: blog._id,
          title: blog.title,
          status: blog.status,
          created_at: blog.created_at,
          updated_at: blog.updated_at,
        });
      });
    return _rows;
  }, [blogs]);

  let formElementArray = useMemo(() => {
    const _formElementArray = [];
    const tempformElementArray = actioncontrol.getFormState();
    for (let key in tempformElementArray) {
      _formElementArray.push({
        id: key,
        config: tempformElementArray[key],
      });
    }
    return _formElementArray;
  }, [actioncontrol]);

  if (loading || loadingUpdate) {
    return <Loader />;
  }

  const firstTabContents = (
    <FormAction
      submitHandler={(e) =>
        actioncontrol.updateSubmitHandler(e, updateSubmitHandler)
      }
    >
      <FormElement
        formElementArray={formElementArray}
        actioncontrol={actioncontrol}
      />
      <SubmitActionButton title={"Update Category"} />
    </FormAction>
  );
  const secondTabContents = (
    <DataListing
      columns={columns}
      rows={rows}
      checkboxSelection
      onSelectionModelChange={onSelectionModelChange}
      selectedProducts={selectedBlogs}
    />
  );

  return (
    <FormContainer pageTitle={"Update Blog Category"}>
      {loading || loadingUpdate ? (
        <loader />
      ) : (
        <TabPanelContainer
          firstTabContents={firstTabContents}
          secondTabContents={secondTabContents}
        />
      )}
    </FormContainer>
  );
};

export default UpdateBlogCategory;
