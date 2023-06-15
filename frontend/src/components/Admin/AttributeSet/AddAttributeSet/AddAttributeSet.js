import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../layout/Loader/Loader";
import { Button } from "@mui/material";
import { useAlert } from "../../../../common/hooks/use-alert";
import { SpellcheckOutlined } from "@mui/icons-material";
import {
  getAllAttributes,
  clearErrors,
  createAttributeSet,
  createAttributeSetReset,
  getAttributeSets,
} from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import "./AddAttributeSet.css";

const AddAttributeSet = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ref = useRef();
  const [attributeSetReference, setAttributeSetReference] = useState("");
  const [attributeSetName, setAttributeSetName] = useState("");
  const { loading, error, attributesets } = useSelector(
    (state) => state.attributesets
  );
  const {
    loading: createLoading,
    error: createError,
    success,
    attributeset,
  } = useSelector((state) => state.createAttributeset);

  useEffect(() => {
    dispatch(getAllAttributes());
    dispatch(getAttributeSets());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      alert.success("Attribute set added successfully.");
      dispatch(createAttributeSetReset());
      navigate(`/admin/attributeset/${attributeset._id}`);
    }
  }, [success, dispatch, navigate, alert, attributeset]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  useEffect(() => {
    if (createError) {
      alert.error(createError.error);
      dispatch(clearErrors());
    }
  }, [createError, dispatch, alert]);

  const saveAttributeSetHandler = () => {
    const myForm = new FormData();
    myForm.set("attributeSetName", attributeSetName);
    myForm.set(
      "attributeSetReference",
      attributeSetReference ? attributeSetReference : ref.current.value
    );
    dispatch(createAttributeSet(myForm));
  };

  return (
    <FormContainer pagetitle={"Add AttributeSet"}>
      {loading || createLoading ? (
        <Loader />
      ) : (
        <div className="attributesetnamecontainer">
          <div>
            <SpellcheckOutlined />
            <input
              type={"text"}
              placeholder="Attribute Name"
              required
              value={attributeSetName}
              onChange={(e) => setAttributeSetName(e.target.value)}
            />
          </div>
          <div>
            <SpellcheckOutlined />
            <select
              ref={ref}
              onChange={(e) => setAttributeSetReference(e.target.value)}
            >
              {attributesets.map((attributeset) => {
                return (
                  <option key={attributeset._id} value={attributeset._id}>
                    {attributeset.attribute_set_name}
                  </option>
                );
              })}
            </select>
          </div>
          <Button
            className="saveButton"
            onClick={() => navigate("/admin/attributesets")}
          >
            Back
          </Button>
          <Button className="saveButton" onClick={saveAttributeSetHandler}>
            Save Attribute Set
          </Button>
        </div>
      )}
    </FormContainer>
  );
};

export default AddAttributeSet;
