import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../../common/hooks/use-alert";
import {
  updateCategory,
  getAllCategories,
  getCategoryDetails,
  clearErrors,
  updateCategoryReset,
  getAdminProducts,
  uploadFiles,
} from "../../../../store";
import ActionControl from "../../../../common/ActionControl";
import FormElement from "../../../../common/components/FormElement";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { getValue } from "../../../../common/attribute";
import DataListing from "../../../../common/components/DataListing";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";
import TabPanelContainer from "../../../../common/components/TabPanelContainer";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const {
    category,
    loading,
    error: categoryError,
  } = useSelector((state) => state.categoryDetails);
  const { images: uploadedImage } = useSelector((state) => state.uploadImage);
  const {
    isUpdated,
    loading: updateLoading,
    error: updateCategoryError,
  } = useSelector((state) => state.updateCategory);
  const { products, error: productError } = useSelector(
    (state) => state.products
  );
  const { categories, error: categoriesError } = useSelector(
    (state) => state.categories
  );
  const [status, setStatus] = useState(false);
  const [images, setImages] = useState([]);
  const [imageIdentifier, setImageIdentifier] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const categoryId = params.id;
  const [formState, setFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
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
    description: {
      elementType: "editor",
      elementConfig: {
        type: "editor",
        error: "",
        placeholder: "Description",
      },
      value: "",
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    parent: {
      elementType: "select",
      elementConfig: {
        placeholder: "Parent Category",
        error: "",
        options: [],
      },
      value: null,
      validation: {
        required: false,
      },
      hideLabel: false,
      valid: false,
      isMulti: true,
      touched: false,
    },
    images: {
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
    status: {
      elementType: "boolean",
      elementConfig: {
        placeholder: "Status",
        error: "",
      },
      value: null,
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
  });

  const categoriesOption = useMemo(() => {
    let _categories = [];
    for (let key in categories) {
      _categories.push({
        value: categories[key]._id,
        label: categories[key].name,
      });
    }
    return _categories;
  }, [categories]);

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
    if (isUpdated) {
      alert.success("Category is updated successfully");
      navigate("/admin/categories");
      dispatch(updateCategoryReset());
    }
  }, [alert, isUpdated, navigate, dispatch]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (category && category._id !== categoryId) {
      dispatch(getCategoryDetails(categoryId));
    } else {
      !status && actioncontrol.setFormDataValues(category, setStatus);
      setSelectedProducts(() => {
        let product = [];
        category.products.forEach((_product) => {
          product.push(_product._id);
        });
        return product.join(",");
      });
    }
    dispatch(getAllCategories());
  }, [dispatch, category, categoryId, actioncontrol, status, loading]);

  useEffect(() => {
    if (imageUpload && uploadedImage && uploadedImage.length > 0) {
      actioncontrol.loadOption();
    }
  }, [uploadedImage, imageUpload, actioncontrol]);

  useEffect(() => {
    if (categoryError) {
      alert.error(categoryError.error);
      dispatch(clearErrors());
    }
    if (productError) {
      alert.error(productError.error);
      dispatch(clearErrors());
    }
    if (categoriesError) {
      alert.error(categoriesError.error);
      dispatch(clearErrors());
    }
    if (updateCategoryError) {
      alert.error(updateCategoryError.error);
      dispatch(clearErrors());
    }
  }, [
    dispatch,
    alert,
    categoryError,
    productError,
    categoriesError,
    updateCategoryError,
  ]);

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(getAllCategories());
  }, [dispatch]);

  const columns = [
    { field: "__check__", sortable: false, minWidth: 40 },
    { field: "id", headerName: "ID", minWidth: 240, flex: 0.5 },
    { field: "name", headerName: "Name", minWidth: 150, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 100,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 100,
      flex: 0.5,
    },
  ];

  const rows = useMemo(() => {
    const _rows = [];
    products &&
      products.forEach((product) => {
        _rows.push({
          __check__: true,
          id: product._id,
          name: getValue("name", product.data),
          price: getValue("price", product.data),
          stock: getValue("stock", product.data),
        });
      });
    return _rows;
  }, [products]);

  const onSelectionModelChange = (_products) => {
    setSelectedProducts(_products);
  };

  const updateSubmitHandler = async (state) => {
    const myForm = new FormData();
    myForm.set("name", state.name.value);
    if (state.parent.value !== null) {
      myForm.set("parent", state.parent.value);
    } else {
      myForm.set("parent", null);
    }
    myForm.set("description", state.description.value);
    if (selectedProducts !== null) {
      myForm.set("products", selectedProducts);
    }
    state.images.value.map((image) => {
      myForm.append("images", image);
      return true;
    });
    myForm.set("status", state.status.value);
    dispatch(updateCategory({ categoryData: myForm, categoryId }));
    dispatch(getCategoryDetails(categoryId));
  };

  const createImageChange = (e, identifier) => {
    const files = Array.from(e.target.files);
    setImageIdentifier(identifier);
    setImageUpload(true);
    dispatch(uploadFiles(files));
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

  if (loading || updateLoading) {
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
        options={[
          {
            key: "parent",
            option: categoriesOption
          }
        ]}
        createImageChange={createImageChange}
      />
      <SubmitActionButton title={"Update Category"} />
    </FormAction>
  );

  const secondTabContents = (
    <DataListing
      columns={columns}
      rows={rows}
      checkboxSelection={true}
      onSelectionModelChange={onSelectionModelChange}
      selectedProducts={selectedProducts ? selectedProducts : []}
    />
  );

  return (
    <FormContainer pagetitle={"Update Category"}>
      {loading ? (
        <Loader />
      ) : (
        <TabPanelContainer
          firstTabContents={firstTabContents}
          secondTabContents={secondTabContents}
        />
      )}
    </FormContainer>
  );
};

export default UpdateCategory;
