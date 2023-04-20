import React, { useState, useEffect } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { clearErrors, forgotPassword } from '../../store';
import { useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import "./ForgotPassword.css";

const ForgotPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const [email, setEmail] = useState();
    const { loading, error, message } = useSelector(state => state.forgetpassword);

    useEffect(() => {
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }
        if(message){
            alert.success(message);
        }
    }, [dispatch, error, alert, message]);

    const forgotPasswordSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    }

    if(error || loading){
        return <Loader />
    }

    return <>
        <MetaData title = {`Forgot Password`} />
        <div className='forgotPasswordContainer'>
            <div className='forgotPasswordBox'>
                <h2 className='forgotPasswordHeading'>Forgot Password</h2>
                <form className='forgotPasswordForm' onSubmit={forgotPasswordSubmit}>
                    <div className='forgotPasswordMail'>
                        <EmailOutlinedIcon />
                        <input
                            type={'email'} 
                            placeholder={"Email"} 
                            required 
                            name="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </div>
                    <input type={"submit"} value="Send" className='forgotPasswordBtn' disabled={loading ? true : false} />
                </form>
            </div>
        </div>
    </>
}

export default ForgotPassword;
