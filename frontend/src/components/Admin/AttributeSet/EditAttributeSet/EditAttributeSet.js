import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../../layout/Loader/Loader";
import { Button } from "@mui/material";
import { useAlert } from "../../../../common/hooks/use-alert";
import Title from "../Title/Title";
import { FormContainer } from "../../../../common/components/FormContainer";
import useDeepCompareEffect from "use-deep-compare-effect";
import {
  Delete,
  Done,
  Close,
  ZoomOutMap,
  SpellcheckOutlined,
} from "@mui/icons-material";
import {
  getAllAttributes,
  clearErrors,
  updateAttributeSetReset,
} from "../../../../store";
import "./EditAttributeSet.css";
import {
  updateAttributeSet,
  getAttributeSetDetails,
} from "../../../../store/actions/attributesetAction";

const EditAttributeSet = () => {
  const alert = useAlert();
  const { id: attributeSetId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [AttributeGroup, setAttributeGroup] = useState([
    {
      index: 0,
      title: "General",
      attributes: [],
    },
  ]);
  const [attributeSetName, setAttributeSetName] = useState("");
  const [selectedGroup, setSelectedGroup] = useState(0);
  const [groupName, setGroupName] = useState("");
  const [open, setOpen] = useState(false);
  const [CompletedTodos, setCompletedTodos] = useState([]);
  const { attributes } = useSelector((state) => state.attributes);
  const { isUpdated } = useSelector((state) => state.updateAttributeset);
  const { loading: loadingDetail, attributeset } = useSelector(
    (state) => state.attributesetDetails
  );

  useEffect(() => {
    dispatch(getAllAttributes());
    if (attributeset._id !== attributeSetId) {
      dispatch(getAttributeSetDetails(attributeSetId));
    } else {
      setAttributeSetName(attributeset.attribute_set_name);
      setAttributeGroup(attributeset.attributeGroup);
    }
  }, [dispatch, attributeSetId, attributeset]);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Attribute Set is updated successfully");
      navigate("/admin/attributesets");
      dispatch(updateAttributeSetReset());
    }
  }, [alert, isUpdated, navigate, dispatch]);

  useDeepCompareEffect(() => {
    const matched = (attribute) => {
      const attributeId = attribute._id;
      let count = 0;
      for (let _key in AttributeGroup) {
        const find = AttributeGroup[_key].attributes.find(
          (item) => item._id === attributeId
        );
        if (find) {
          count++;
        }
      }

      return count;
    };
    const loadData = () => {
      let attributesList = [];
      for (let key in attributes) {
        const flags = matched(attributes[key]);
        attributesList.push({
          _id: attributes[key]._id,
          frontend_label: attributes[key].frontend_label,
          is_done:
            flags === 0 && attributes[key].is_user_defined === true
              ? false
              : true,
          is_user_defined: attributes[key].is_user_defined,
          moved: false,
        });
      }
      setCompletedTodos(attributesList);
      if (attributeset.attributeGroup === undefined) {
        const newAttributeGroup = [...AttributeGroup];
        if (newAttributeGroup.length > 0) {
          for (let key in newAttributeGroup) {
            if (newAttributeGroup[key].title === "General") {
              newAttributeGroup[key].attributes = attributesList.filter(
                (item) => item.is_done === true && item.moved === false
              );
            }
          }
        }
        setAttributeGroup(newAttributeGroup);
      }
    };
    loadData();
  }, [attributes, AttributeGroup]);

  const addAttributeGroupHandler = () => {
    const newAttributeGroup = [...AttributeGroup];
    const checked = newAttributeGroup.filter(
      (group) => group.title === groupName
    );
    if (checked.length !== 0 || groupName === "") {
      return;
    }
    newAttributeGroup.push({
      index: newAttributeGroup.length,
      title: groupName,
      attributes: [],
    });
    setOpen(false);
    setAttributeGroup(newAttributeGroup);
    setGroupName("");
  };

  const selectedAttributeGroupHandler = (index) => {
    setSelectedGroup(index);
  };

  const addAttributeToAttributeSetHandler = (attribute) => {
    const newAttributeGroup = [...AttributeGroup];
    let updatedAttributeGroup = [];
    for (let key in newAttributeGroup) {
      if (newAttributeGroup[key].index === selectedGroup) {
        const selectedAttributeGroup = newAttributeGroup[key];
        const checked = selectedAttributeGroup.attributes.filter(
          (item) => item._id === attribute._id
        );
        if (checked.length > 0) {
          return;
        }
        selectedAttributeGroup.attributes.push({ ...attribute, is_done: true });
        updatedAttributeGroup.push(selectedAttributeGroup);
      } else {
        updatedAttributeGroup.push(newAttributeGroup[key]);
      }
    }
    setAttributeGroup(updatedAttributeGroup);
    let attributesList = [];
    for (let key in attributes) {
      attributesList.push({
        _id: attributes[key]._id,
        frontend_label: attributes[key].frontend_label,
        is_done: true,
        is_user_defined: attributes[key].is_user_defined,
        moved: false,
      });
    }
    setCompletedTodos(attributesList);
  };

  const moveOneGroupToAnother = (attribute, sourceIndex) => {
    const targetIndex = selectedGroup;
    if (targetIndex === sourceIndex) {
      return;
    }
    const attributeGroup = [...AttributeGroup];
    const updateAttributeGroup = [];

    //target
    let newTargetAttributeGroup = attributeGroup.find(
      (item) => item.index === targetIndex
    );
    const targetAttributes = [...newTargetAttributeGroup.attributes];
    const checked = targetAttributes.filter(
      (item) => item._id === attribute._id
    );
    if (checked.length > 0) {
      newTargetAttributeGroup.attributes = targetAttributes;
    } else {
      newTargetAttributeGroup.attributes = [
        ...targetAttributes,
        { ...attribute, moved: true },
      ];
    }
    updateAttributeGroup.push(newTargetAttributeGroup);

    // source
    let newSourceAttributeGroup = attributeGroup.find(
      (item) => item.index === sourceIndex
    );
    const sourceAttributes = [...newSourceAttributeGroup.attributes];
    const updatedAttributes = [];
    for (let key in sourceAttributes) {
      if (sourceAttributes[key]._id.toString() !== attribute._id.toString()) {
        updatedAttributes.push(sourceAttributes[key]);
      }
    }

    newSourceAttributeGroup.attributes = updatedAttributes;
    updateAttributeGroup.push(newSourceAttributeGroup);

    setAttributeGroup(updateAttributeGroup);
  };

  const deleteAttributeGroupHandler = () => {
    if (selectedGroup === 0) {
      alert.error("You cann't remove the default General attribute Group");
      dispatch(clearErrors());
      return;
    }

    if (selectedGroup === undefined) {
      alert.error("Please select group name which you want to remove.");
      dispatch(clearErrors());
      return;
    }
    const selectedAttributeAttributeGroup = AttributeGroup.find(
      (item) => item.index === selectedGroup
    );
    const attributeOfSelectedAttributeGroup =
      selectedAttributeAttributeGroup.attributes;
    const noneSelectedAttributeGroup = AttributeGroup.filter(
      (item) => item.index !== selectedGroup
    );

    const newCompletedTodos = [...CompletedTodos];
    const updateCompletedTodos = [];
    for (let key in newCompletedTodos) {
      for (let _key in attributeOfSelectedAttributeGroup) {
        if (
          newCompletedTodos[key]._id ===
          attributeOfSelectedAttributeGroup[_key]._id
        ) {
          updateCompletedTodos.push({
            ...newCompletedTodos[key],
            is_done: false,
          });
        } else {
          updateCompletedTodos.push(newCompletedTodos[key]);
        }
      }
    }
    setCompletedTodos(updateCompletedTodos);
    setAttributeGroup(noneSelectedAttributeGroup);
  };

  const deleteAttributeFromGroupHandler = (attribute, index) => {
    const newAttributeGroup = [...AttributeGroup];
    const selectedGroupWithItem = newAttributeGroup.find(
      (item) => item.index === index
    );
    selectedGroupWithItem.attributes = selectedGroupWithItem.attributes.filter(
      (item) => item._id !== attribute._id
    ); //[...selectedGroupWithItem.attributes];

    let updateAttributeGroup = [];
    for (let key in newAttributeGroup) {
      if (newAttributeGroup[key].index === index) {
        updateAttributeGroup.push(selectedGroupWithItem);
      } else {
        updateAttributeGroup.push(newAttributeGroup[key]);
      }
    }
    const newAttributes = [...CompletedTodos];
    const updatedAttributes = [];
    for (let key in newAttributes) {
      if (newAttributes[key]._id === attribute._id) {
        updatedAttributes.push({ ...attribute, is_done: false });
      } else {
        updatedAttributes.push(newAttributes[key]);
      }
    }
    setCompletedTodos(updatedAttributes);
    setAttributeGroup(updateAttributeGroup);
  };

  const updateAttributeSetHandler = () => {
    if (attributeSetName === "") {
      return;
    }
    const myForm = new FormData();
    myForm.set("attributeSetName", attributeSetName);
    myForm.set("attributeSetData", JSON.stringify(AttributeGroup));
    dispatch(
      updateAttributeSet({
        attributesetData: myForm,
        attribuetsetId: attributeSetId,
      })
    );
  };

  if (loadingDetail || AttributeGroup === undefined) {
    return <Loader />;
  }

  const openGroupForm = () => {
    return (
      <div className="groupForm">
        <div className="inputgroup">
          <input
            type={"text"}
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="actions">
          <div className="close">
            <Close onClick={() => setOpen(false)} />
          </div>
          <div className="done">
            <Done onClick={() => addAttributeGroupHandler()} />
          </div>
        </div>
      </div>
    );
  };
  return (
    <>
      <FormContainer pagetitle={"Edit Attribute Set"}>
        <div className="attributeSetContainer">
          <div className="addAttributeset">
            <div className="attributesetLeftList">
              <Button onClick={() => setOpen(true)}>Add Attribute Group</Button>
              {open && openGroupForm()}
              <Button onClick={deleteAttributeGroupHandler}>
                Delete Attribute Group
              </Button>
              <div className="attributesetnamecontainer">
                <div>
                  <SpellcheckOutlined />
                  <input
                    type={"text"}
                    placeholder="AttributeSet Name"
                    required
                    value={attributeSetName}
                    onChange={(e) => setAttributeSetName(e.target.value)}
                  />
                </div>
              </div>
              <div className="attributeGroup">
                <ul>
                  {AttributeGroup.length > 0 &&
                    AttributeGroup.map((group, index) => {
                      return (
                        <li key={`${group.index} + ${index}`} className="group">
                          <Title
                            selectedAttributeGroup={() =>
                              selectedAttributeGroupHandler(
                                group.index,
                                group.title
                              )
                            }
                            title={group.title}
                            selected={
                              selectedGroup === group.index ? true : false
                            }
                          />
                          <ul>
                            {group.attributes.length > 0 &&
                              group.attributes.map((attribute, index) => {
                                return (
                                  attribute.is_done === true && (
                                    <li key={attribute._id + index}>
                                      <div className="title">
                                        {attribute.frontend_label}
                                      </div>
                                      <div className="icon">
                                        <ZoomOutMap
                                          onClick={() =>
                                            moveOneGroupToAnother(
                                              attribute,
                                              group.index
                                            )
                                          }
                                        />
                                        {attribute.is_user_defined === true && (
                                          <Delete
                                            onClick={() =>
                                              deleteAttributeFromGroupHandler(
                                                attribute,
                                                group.index
                                              )
                                            }
                                          />
                                        )}
                                      </div>
                                    </li>
                                  )
                                );
                              })}
                          </ul>
                        </li>
                      );
                    })}
                </ul>
              </div>
            </div>
            <div className="attributesetRightList">
              <ul>
                {CompletedTodos.length > 0 &&
                  CompletedTodos.map((attribute, index) => {
                    return (
                      attribute.is_done === false && (
                        <li key={index} className="attribute">
                          <div className="title">
                            {attribute.frontend_label}
                          </div>
                          <div className="icon">
                            {attribute.is_done ? (
                              <Delete />
                            ) : (
                              <Done
                                onClick={() =>
                                  addAttributeToAttributeSetHandler(attribute)
                                }
                              />
                            )}
                          </div>
                        </li>
                      )
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="actions">
            <Button
              className="saveButton"
              onClick={() => navigate("/admin/attributesets")}
            >
              Back
            </Button>
            <Button className="saveButton" onClick={updateAttributeSetHandler}>
              Save Attribute Set
            </Button>
          </div>
        </div>
      </FormContainer>
    </>
  );
};

export default EditAttributeSet;
