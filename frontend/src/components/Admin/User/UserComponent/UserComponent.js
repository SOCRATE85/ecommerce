import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../../common/hooks/use-alert";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../layout/Loader/Loader";
import FormAction from "../../../../common/components/FormAction/FormAction";
import ControlContainer from "../../../../common/components/ControlContainer";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import {
  clearErrors,
  getUserDetails,
  updateUser,
  updateUserReset,
} from "../../../../store";

const roles = ["user", "admin"];

const UserComponent = ({ user }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const alert = useAlert();
  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [imagePreview, setImagePreview] = useState();

  useEffect(() => {
    if (user && user._id !== params.id) {
      dispatch(getUserDetails(params.id));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
      setImagePreview(user.avatar.url);
    }
  }, [dispatch, params.id, user]);

  useEffect(() => {
    if (updateError) {
      alert.error(updateError.error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      navigate("/admin/users");
      dispatch(getUserDetails(params.id));
      dispatch(updateUserReset());
    }
  }, [alert, dispatch, updateError, isUpdated, navigate, params.id]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);
    dispatch(updateUser({ userData: myForm, userId: params.id }));
  };

  return (
    <>
      {updateLoading || user.length === 0 ? (
        <Loader />
      ) : (
        <FormAction submitHandler={updateUserSubmitHandler}>
          <ControlContainer label={"Name"} shouldValidate>
            <input
              type={"text"}
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </ControlContainer>
          <ControlContainer label={"Email"} shouldValidate>
            <input
              type={"text"}
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </ControlContainer>
          <ControlContainer label={"Role"} shouldValidate>
            <select onChange={(e) => setRole(e.target.value)} value={role}>
              <option value={""}>Choose Role</option>
              {roles.map((role) => {
                return (
                  <option key={role} value={role}>
                    {role}
                  </option>
                );
              })}
            </select>
          </ControlContainer>
          <ControlContainer id="createProductFormImage">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Avatar Preview"
                style={{ width: 150, height: undefined }}
              />
            )}
          </ControlContainer>
          <SubmitActionButton title={"Update"} />
        </FormAction>
      )}
    </>
  );
};

export default UserComponent;
