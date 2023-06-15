import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { clearErrors, resetPassword } from '../../store';
import { useAlert} from '../../common/hooks/use-alert';
import MetaData from '../layout/MetaData';
import "./ResetPassword.css";

const ResetPassword = () => {    
    const alert = useAlert();
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.forgetpassword);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const token = params.token;

    useEffect(() => {
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }
        if(success){
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, error, alert, success, navigate]);

    const resetPasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    }

    if(error || loading){
        return <Loader />
    }

    return <>
        <MetaData title = {`Change Password`} />
        <div className='resetPasswordContainer'>
            <div className='resetPasswordBox'>
                <h2 className='resetPasswordHeading'>Change Password</h2>
                <form className='resetPasswordForm' encType="multipart/form-data" onSubmit={resetPasswordSubmit}>
                    <div className='loginPassword'>
                        <LockOpenOutlinedIcon />
                        <input
                            type={'password'} 
                            placeholder={"New Password"} 
                            required value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOutlined />
                        <input 
                            type={'password'} 
                            placeholder={"Confirm Password"} 
                            required value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                        />
                    </div>
                    <input 
                        type={"submit"}
                        value="Update"
                        className='resetPasswordBtn'
                        disabled={loading ? true : false}
                    />
                </form>
            </div>
        </div>
    </>
}

export default ResetPassword;
