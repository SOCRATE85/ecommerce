import React, { useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { clearErrors, register, uploadFiles } from "../../store";
import { useAlert } from "react-alert";
import "./LoginSignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      const redirect = location.search
        ? `/${location.search.split("=")[1]}`
        : "/account";
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated, navigate, location.search]);
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", user.name);
    myForm.set("email", user.email);
    myForm.set("password", user.password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
    if (isAuthenticated) {
      navigate("/account");
    }
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };
  if (error || loading) {
    return <Loader />;
  }
  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <form
          className="signUpForm"
          encType="multipart/form-data"
          onSubmit={registerSubmit}
        >
          <div className="signUpName">
            <FaceOutlinedIcon />
            <input
              type={"text"}
              placeholder="Name"
              required
              name="name"
              value={user.name}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpmail">
            <EmailOutlinedIcon />
            <input
              type={"email"}
              placeholder={"Email"}
              required
              name="email"
              value={user.email}
              onChange={registerDataChange}
            />
          </div>
          <div className="signUpPassword">
            <LockOpenOutlinedIcon />
            <input
              type={"password"}
              name="password"
              placeholder={"Password"}
              required
              value={user.password}
              onChange={registerDataChange}
            />
          </div>
          <div id="registerImage">
            <img src={avatarPreview} alt={"Avatar Preview"} />
            <input
              type={"file"}
              name="avatar"
              accept="image/*"
              onChange={registerDataChange}
            />
          </div>
          <input
            type={"submit"}
            value="Register"
            className="btn"
            disabled={loading ? true : false}
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
