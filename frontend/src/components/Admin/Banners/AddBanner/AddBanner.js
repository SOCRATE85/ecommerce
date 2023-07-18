import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import FormElement from "../../../../common/components/FormElement";
import ActionControl from "../../../../common/ActionControl";
import { FormContainer } from "../../../../common/components/FormContainer";
import { getAllSlider } from "../../../../store/actions/sliderAction";
import {
  addNewBanner,
  clearErrors,
  getAllBanner,
  addBannerReset,
  uploadFiles,
} from "../../../../store";
import SubmitButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";

const AddBanner = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { images: uploadedImage } = useSelector((state) => state.uploadImage);
  const { sliders } = useSelector((state) => state.sliders);
  const [images, setImages] = useState([]);
  const [imageIdentifier, setImageIdentifier] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const { success, error } = useSelector((state) => state.addBanner);
  const [formState, setFormState] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Banner Name",
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
    slider_id: {
      elementType: "select",
      elementConfig: {
        placeholder: "Banner Slider",
        error: "",
        options: [
          {
            value: 0,
            defaultValue: "Select Slider",
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
    bannerOrder: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Order",
        error: "",
      },
      value: "",
      validation: {
        required: false,
        isNum: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    description: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
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
    clickurl: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Click Url",
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
    width: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Width",
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
    height: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Height",
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
        type: "boolean",
      },
      value: false,
      validation: {
        required: true,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
  });

  const sliderOption = useMemo(() => {
    let _slider = [
      {
        value: 0,
        label: "Select Slider",
      },
    ];
    for (let key in sliders) {
      _slider.push({
        value: sliders[key]._id,
        label: sliders[key].title,
      });
    }
    return _slider;
  }, [sliders]);

  useEffect(() => {
    dispatch(getAllSlider());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (success) {
      alert.success("New banner added successfully");
      dispatch(getAllBanner());
      navigate("/admin/banners");
      dispatch(addBannerReset());
    }
  }, [dispatch, success, alert, navigate]);

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
    if (imageUpload && uploadedImage.length > 0) {
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
    for (let key in state) {
      if (key === "slider_id") {
        myForm.set("slider_id", formState.slider_id.value.value);
      } else {
        myForm.set(key, state[key].value);
      }
    }
    dispatch(addNewBanner(myForm));
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

  return (
    <FormContainer pagetitle={"Add New Banner"}>
      <FormAction
        onSubmit={(e) =>
          actioncontrol.createSubmitHandler(e, createSubmitHandler)
        }
      >
        <FormElement
          formElementArray={formElementArray}
          actioncontrol={actioncontrol}
          options={[
                {
                  key: "slider_id",
                  option: sliderOption,
                }
          ]}
          createImageChange={createImageChange}
        />
        <SubmitButton title={"Create Banner"} />
      </FormAction>
    </FormContainer>
  );
};

export default AddBanner;
