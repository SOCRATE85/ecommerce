import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAlert } from "../../../../common/hooks/use-alert";
import ActionControl from "../../../../common/ActionControl";
import { FormContainer } from "../../../../common/components/FormContainer";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import FormAction from "../../../../common/components/FormAction";
import FormElement from "../../../../common/components/FormElement/FormElement";

import {
  updateSlider,
  clearErrors,
  getAllSlider,
  getSlider,
  updateSliderReset,
} from "../../../../store";

const UpdateSlider = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const [status, setStatus] = useState(false);
  const { isUpdated } = useSelector((state) => state.updateSlider);
  const { slider, error, loading } = useSelector((state) => state.slider);
  const sliderId = params.id;
  const [formState, setFormState] = useState({
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Slider Title",
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
    position: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Slider Position",
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
    show_title: {
      elementType: "boolean",
      elementConfig: {
        placeholder: "Show Title",
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
    style_content: {
      elementType: "textarea",
      elementConfig: {
        type: "text",
        error: "",
        placeholder: "Custom Style",
      },
      value: "",
      validation: {
        required: false,
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
    show_caption: {
      elementType: "boolean",
      elementConfig: {
        placeholder: "Show Caption",
        error: "",
        type: "boolean",
      },
      value: false,
      validation: {
        required: false,
      },
      hideLabel: false,
      valid: false,
      touched: false,
    },
    slider_speed: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Slider Speed",
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
    min_item: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Minimum Items",
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
    max_item: {
      elementType: "input",
      elementConfig: {
        type: "number",
        placeholder: "Maximum Item",
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
    return new ActionControl({ formState, setFormState });
  }, [formState, setFormState]);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (slider && slider._id !== sliderId) {
      dispatch(getSlider(sliderId));
    } else {
      !status && actioncontrol.setFormDataValues(slider, setStatus);
    }
  }, [dispatch, slider, sliderId, actioncontrol, status, loading]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [error, alert, dispatch]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Slider updated successfully");
      dispatch(getAllSlider());
      dispatch(getSlider(sliderId));
      navigate("/admin/sliders");
      dispatch(updateSliderReset());
    }
  }, [dispatch, isUpdated, alert, navigate, sliderId]);

  const updateSubmitHandler = (state) => {
    const myForm = new FormData();
    for (let key in state) {
      if (state[key].value) {
        myForm.set(key, state[key].value);
      }
    }
    dispatch(updateSlider({ sliderId, slider: myForm }));
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
    <FormContainer pagetitle={"Update Slider"}>
      <FormAction
        submitHandler={(e) =>
          actioncontrol.updateSubmitHandler(e, updateSubmitHandler)
        }
      >
        <FormElement
          formElementArray={formElementArray}
          actioncontrol={actioncontrol}
        />
        <SubmitActionButton title={"Update Slider"} />
      </FormAction>
    </FormContainer>
  );
};

export default UpdateSlider;
