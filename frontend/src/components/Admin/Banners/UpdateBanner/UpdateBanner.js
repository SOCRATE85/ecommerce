import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import ActionControl from "../../../../common/ActionControl";
import { FormContainer } from "../../../../common/components/FormContainer";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";
import FormElement from "../../../../common/components/FormElement";
import {
  updateBanner,
  clearErrors,
  getBanner,
  getAllBanner,
  updateBannerReset,
  uploadFiles,
} from "../../../../store";
import { getAllSlider } from "../../../../store/actions/sliderAction";

const UpdateBanner = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [status, setStatus] = useState(false);
  const { images: uploadedImage } = useSelector((state) => state.uploadImage);
  const { sliders } = useSelector((state) => state.sliders);
  const [images, setImages] = useState([]);
  const [imageIdentifier, setImageIdentifier] = useState([]);
  const [imageUpload, setImageUpload] = useState(false);
  const { isUpdated } = useSelector((state) => state.updateBanner);
  const { banner, error, loading } = useSelector((state) => state.banner);
  const bannerId = params.id;
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

  const sliderOption = useMemo(() => {
    let _slider = [
      {
        value: "",
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
    if (loading) {
      return;
    }
    if (banner && banner._id !== bannerId) {
      dispatch(getBanner(bannerId));
    } else {
      !status && actioncontrol.setFormDataValues(banner, setStatus);
    }
    dispatch(getAllSlider());
  }, [dispatch, banner, bannerId, actioncontrol, status, loading]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Banner updated successfully");
      dispatch(getAllBanner());
      dispatch(getBanner(bannerId));
      navigate("/admin/banners");
      dispatch(updateBannerReset());
    }
  }, [dispatch, isUpdated, alert, navigate, bannerId]);

  const updateSubmitHandler = (state) => {
    const myForm = new FormData();
    for (let key in state) {
      if (key === "slider_id") {
        myForm.set("slider_id", state.slider_id.value.value);
      } else {
        myForm.set(key, state[key].value);
      }
    }
    dispatch(updateBanner({ bannerId, banner: myForm }));
  };

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
    <FormContainer pagetitle={"Update Banner"}>
      <FormAction
        submitHandler={(e) =>
          actioncontrol.updateSubmitHandler(e, updateSubmitHandler)
        }
      >
        <FormElement
          formElementArray={formElementArray}
          actioncontrol={actioncontrol}
          options={sliderOption}
          optionKey={"slider_id"}
          createImageChange={createImageChange}
        />
        <SubmitActionButton title={"Update Slider"}></SubmitActionButton>
      </FormAction>
    </FormContainer>
  );
};

export default UpdateBanner;
