import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { login, clearErrors, register } from '../../store/actions/userAction';
import { useAlert} from 'react-alert';
import './LoginSignUp.css';

const LoginSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector(state => state.user);
    const switcherTab = useRef(null);
    const registerTab = useRef(null);
    const loginTab = useRef(null);
    const [user, setUser] = useState({
        name: "",
        email:"",
        password: ""
    });
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            const redirect = location.search ? `/${location.search.split("=")[1]}` : "/account";
            navigate(redirect); 
        }
    }, [dispatch, error, alert, isAuthenticated, navigate, location.search]);

    const switchTabs = (e, tab) => {
        e.preventDefault();
        if(tab === 'login'){
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if(tab === 'register'){
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
        if(isAuthenticated){
            navigate("/account");
        }
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", user.name);
        myForm.set("email", user.email);
        myForm.set("password", user.password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
        if(isAuthenticated){
            navigate("/account");
        }
    }
    const registerDataChange = (e) => {
        if(e.target.name === 'avatar'){
            const reader = new FileReader();
            reader.onload = () => {
                if(reader.readyState === 2){
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }
            reader.readAsDataURL(e.target.files[0]);
        }else{
            setUser({...user, [e.target.name]: e.target.value });
        }
    }

    if(error || loading){
        return <Loader />
    }

    return <>
        <div className='LoginSignUpContainer'>
            <div className='LoginSignUpBox'>
                <div>
                    <div className='login_signup_toggle'>
                        <p onClick={(e) => switchTabs(e, 'login')}>Login</p>
                        <p onClick={(e) => switchTabs(e, 'register')}>Register</p>
                    </div>
                    <button ref={switcherTab}></button>                    
                </div>
                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                    <div className='loginEmail'>
                        <EmailOutlinedIcon />
                        <input 
                            type={'email'} 
                            placeholder={"Email"} 
                            required value={loginEmail} 
                            onChange={(e) => setLoginEmail(e.target.value)} 
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenOutlinedIcon />
                        <input 
                            type={'password'} 
                            placeholder={"Password"} 
                            required value={loginPassword} 
                            onChange={(e) => setLoginPassword(e.target.value)} 
                        />
                    </div>
                    <Link to="/password/forget">Forget Password</Link>
                    <button type='submit' className='btn'>Login</button>
                </form>
                <form className='signUpForm' ref={registerTab} encType="multipart/form-data" onSubmit={registerSubmit}>
                    <div className='signUpName'>
                        <FaceOutlinedIcon />
                        <input 
                            type={"text"} 
                            placeholder="Name" 
                            required 
                            name='name' 
                            value={user.name} 
                            onChange={registerDataChange} 
                        />
                    </div>
                    <div className='signUpmail'>
                        <EmailOutlinedIcon />
                        <input 
                            type={'email'} 
                            placeholder={"Email"} 
                            required 
                            name="email"
                            value={user.email} 
                            onChange={registerDataChange} 
                        />
                    </div>
                    <div className='signUpPassword'>
                        <LockOpenOutlinedIcon />
                        <input 
                            type={'password'}
                            name="password"
                            placeholder={"Password"} 
                            required 
                            value={user.password} 
                            onChange={registerDataChange} 
                        />
                    </div>
                    <div id="registerImage">
                        <img src={avatarPreview} alt={'Avatar Preview'} />
                        <input type={"file"} name="avatar" accept='image/*' onChange={registerDataChange} />
                    </div>
                    <input type={"submit"} value="Register" className='btn' disabled={loading ? true : false} />
                </form>
            </div>
        </div>
    </>
}

export default LoginSignUp;
