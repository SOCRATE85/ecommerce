import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import ActionControl from "../../../../common/ActionControl";
import Loader from "../../../layout/Loader/Loader";
import {
  getAllBlogCategories,
  createBlog,
  uploadFiles,
  createBlogReset,
} from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import SubmitButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";
import FormElement from "../../../../common/components/FormElement/FormElement";

const AddNewBlog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading: loadingBlog, success } = useSelector(
    (state) => state.createBlog
  );
  const { blogcategories, loading } = useSelector(
    (state) => state.blogCategories
  );
  const { images: uploadedImage } = useSelector((state) => state.uploadImage);
  const [images, setImages] = useState([]);
  const [imageIdentifier, setImageIdentifier] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
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
        options: [],
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

  useEffect(() => {
    if (success) {
      alert.success("Blog created successfully");
      navigate("/admin/blogs");
      dispatch(createBlogReset());
    }
  }, [alert, success, navigate, dispatch]);

  useEffect(() => {
    dispatch(getAllBlogCategories());
  }, [dispatch]);

  const categoryOption = useMemo(() => {
    let _category = [];
    for (let key in blogcategories) {
      _category.push({
        value: blogcategories[key]._id,
        label: blogcategories[key].name,
      });
    }
    return _category;
  }, [blogcategories]);

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

  const createSubmitHandler = (state) => {
    const myForm = new FormData();
    const _categories = state.categories.value
      .reduce((result, item) => {
        return result.concat(item.value);
      }, [])
      .filter((item) => item !== "");
    myForm.set("categories", _categories);
    myForm.set("title", state.title.value);
    myForm.set("full_content", state.full_content.value);
    myForm.set("short_content", state.short_content.value);

    const blogimages = state.blogimages.value;
    blogimages.map((image) => {
      myForm.append("blogimages", image);
      return true;
    });
    myForm.set("meta_title", state.meta_title.value);
    myForm.set("meta_tags", state.meta_tags.value);
    myForm.set("meta_description", state.meta_description.value);
    myForm.set("status", state.status.value);
    dispatch(createBlog(myForm));
  };

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

  if (loading) {
    return <></>;
  }

  return (
    <FormContainer pagetitle={"Add New Blog"}>
      {loading || loadingBlog ? (
        <Loader />
      ) : (
        <FormAction
          submitHandler={(e) =>
            actioncontrol.createSubmitHandler(e, createSubmitHandler)
          }
        >
          <FormElement
            formElementArray={formElementArray}
            actioncontrol={actioncontrol}
            options={[
              {
                key: "categories",
                option: categoryOption
              }
            ]}
            createImageChange={createImageChange}
          />
          <SubmitButton title={"Create Post"}></SubmitButton>
        </FormAction>
      )}
    </FormContainer>
  );
};

export default AddNewBlog;
