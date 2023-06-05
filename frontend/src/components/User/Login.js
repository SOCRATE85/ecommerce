import React, { useState, useEffect } from "react";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { login, clearErrors } from "../../store";
import { useAlert } from "react-alert";
import "./LoginSignUp.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

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

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(
      login({
        email: loginEmail,
        password: loginPassword,
      })
    );
    if (isAuthenticated) {
      navigate("/account");
    }
  };
  if (error || loading) {
    return <Loader />;
  }
  return (
    <div className="LoginSignUpContainer">
      <div className="LoginSignUpBox">
        <form className="loginForm" onSubmit={loginSubmit}>
          <div className="loginEmail">
            <EmailOutlinedIcon />
            <input
              type={"email"}
              placeholder={"Email"}
              required
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <div className="loginPassword">
            <LockOpenOutlinedIcon />
            <input
              type={"password"}
              placeholder={"Password"}
              required
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <Link to={'/register'}>Please Signup if you have no account.</Link>
          <Link to="/password/forget">Forget Password</Link>
          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
