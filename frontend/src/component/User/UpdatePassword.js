import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';
import VpnKeyOutlined from '@mui/icons-material/VpnKeyOutlined';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { clearErrors, updatePassword } from '../../store/actions/userAction';
import { useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../store/contants/userContant';
import "./UpdatePassword.css";

const UpdatePassword = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isUpdated } = useSelector(state => state.profile);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Password Updated Successfully");
            navigate("/account");
            dispatch({ type: UPDATE_PASSWORD_RESET });
        }
    }, [dispatch, error, alert, isUpdated, navigate]);

    const updatePasswordSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    }

    if(error || loading){
        return <Loader />
    }

    return <>
        <MetaData title = {`Change Password`} />
        <div className='updatePasswordContainer'>
            <div className='updatePasswordBox'>
                <h2 className='updatePasswordHeading'>Change Password</h2>
                <form className='updatePasswordForm' encType="multipart/form-data" onSubmit={updatePasswordSubmit}>
                    <div className='loginPassword'>
                        <VpnKeyOutlined />
                        <input 
                            type={'password'} 
                            placeholder={"Old Password"} 
                            required value={oldPassword} 
                            onChange={(e) => setOldPassword(e.target.value)} 
                        />
                    </div>
                    <div className='loginPassword'>
                        <LockOpenOutlinedIcon />
                        <input 
                            type={'password'} 
                            placeholder={"New Password"} 
                            required value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)} 
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
                        className='updatePasswordBtn'
                        disabled={loading ? true : false}
                    />
                </form>
            </div>
        </div>
    </>
}

export default UpdatePassword;
