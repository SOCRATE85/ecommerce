import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import ActionControl from "../../../../common/ActionControl";
import FormElement from "../../../../common/components/FormElement";
import Loader from "../../../layout/Loader/Loader";
import { getAllBlogCategories } from "../../../../store/actions/blogCategoryAction";
import {
  clearErrors,
  updateBlog,
  getBlog,
  updateBlogReset,
  uploadFiles,
} from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import SubmitButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";

const UpdateBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();
  const [status, setStatus] = useState(false);
  const { blog, loading, error } = useSelector((state) => state.blogDetail);
  const { isUpdated, error: updateError } = useSelector(
    (state) => state.updateBlog
  );
  const { blogcategories } = useSelector((state) => state.blogCategories);
  const { images: uploadedImage } = useSelector((state) => state.uploadImage);
  const [images, setImages] = useState([]);
  const [imageIdentifier, setImageIdentifier] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const blogId = params.id;

  const [formState, setFormState] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Title",
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
    url_key: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Url Path",
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
    full_content: {
      elementType: "editor",
      elementConfig: {
        type: "editor",
        error: "",
        placeholder: "Full Contents",
      },
      value: "",
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    short_content: {
      elementType: "editor",
      elementConfig: {
        type: "editor",
        error: "",
        placeholder: "Short Contents",
      },
      value: "",
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    categories: {
      elementType: "multiselect",
      elementConfig: {
        placeholder: "Blog Category",
        error: "",
        options: [
          {
            value: 0,
            defaultValue: "Select category",
          },
        ],
      },
      value: null,
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      isMulti: true,
      touched: false,
    },
    blogimages: {
      elementType: "file",
      elementConfig: {
        type: "file",
        error: "",
        placeholder: "Images",
      },
      value: [],
      validation: {
        required: true,
        isImage: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    meta_title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        error: "",
        placeholder: "Meta Title",
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
      elementType: "input",
      elementConfig: {
        type: "text",
        error: "",
        placeholder: "Meta Tags",
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
        error: "",
        placeholder: "Meta Description",
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
      images,
      setImages,
      imageIdentifier,
      setImageIdentifier,
      uploadedImage,
      imageUpload,
      setImageUpload,
    });
  }, [
    formState,
    setFormState,
    images,
    setImages,
    imageIdentifier,
    setImageIdentifier,
    uploadedImage,
    imageUpload,
    setImageUpload,
  ]);

  const categoryOption = useMemo(() => {
    let _category = [
      {
        value: 0,
        label: "Select category",
      },
    ];
    for (let key in blogcategories) {
      _category.push({
        value: blogcategories[key]._id,
        label: blogcategories[key].name,
      });
    }
    return _category;
  }, [blogcategories]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (blog && blog._id !== blogId) {
      dispatch(getBlog(blogId));
    } else {
      !status && actioncontrol.setFormDataValues(blog, setStatus);
    }
    dispatch(getAllBlogCategories());
  }, [dispatch, blog, blogId, actioncontrol, status, loading]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError.error);
      dispatch(clearErrors());
    }
  }, [error, dispatch, alert, updateError]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Blog is updated successfully");
      navigate("/admin/blogs");
      dispatch(getBlog(blogId));
      dispatch(updateBlogReset());
    }
  }, [alert, isUpdated, navigate, dispatch, blogId]);

  useEffect(() => {
    if (imageUpload && uploadedImage && uploadedImage.length > 0) {
      actioncontrol.loadOption();
    }
  }, [uploadedImage, imageUpload, actioncontrol]);

  const createImageChange = (e, identifier) => {
    const files = Array.from(e.target.files);
    setImageIdentifier(identifier);
    setImageUpload(true);
    dispatch(uploadFiles(files));
  };

  const updateSubmitHandler = (state) => {
    const myForm = new FormData();
    myForm.set("title", state.title.value);
    myForm.set("full_content", state.full_content.value);
    myForm.set("short_content", state.short_content.value);
    const categories = state.categories.value
      .reduce((result, item) => {
        return result.concat(item.value);
      }, [])
      .filter((item) => item !== "");
    myForm.set("categories", categories);
    const blogimages = state.blogimages.value;
    blogimages.map((image) => {
      myForm.append("blogimages", image);
      return true;
    });
    myForm.set("meta_title", state.meta_title.value);
    myForm.set("meta_tags", state.meta_tags.value);
    myForm.set("meta_description", state.meta_description.value);
    myForm.set("status", state.status.value);
    dispatch(updateBlog({ blogData: myForm, blogId }));
  };

  const formElementArray = useMemo(() => {
    let _formElementArray = [];
    for (let key in formState) {
      _formElementArray.push({
        id: key,
        config: formState[key],
      });
    }
    return _formElementArray;
  }, [formState]);

  if (loading) {
    return <></>;
  }

  return (
    <FormContainer pagetitle={"Update Blog"}>
      {loading ? (
        <Loader />
      ) : (
        <FormAction
          submitHandler={(e) =>
            actioncontrol.updateSubmitHandler(e, updateSubmitHandler)
          }
        >
          <FormElement
            formElementArray={formElementArray}
            actioncontrol={actioncontrol}
            options={categoryOption}
            optionKey={"categories"}
            createImageChange={createImageChange}
          />
          <SubmitButton title={"Update Post"}></SubmitButton>
        </FormAction>
      )}
    </FormContainer>
  );
};

export default UpdateBlog;
