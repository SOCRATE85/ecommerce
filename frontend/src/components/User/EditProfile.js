import React, { useState, useEffect } from 'react';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';
import { clearErrors, loadUser, updateProfile, updateProfileReset } from '../../store';
import { useAlert} from 'react-alert';
import MetaData from '../layout/MetaData';
import "./EditProfile.css";

const EditProfile = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: userData } = useSelector(state => state.user);
    const { loading, error, isUpdated } = useSelector(state => state.profile);
    const [name, setName] = useState(userData.name);
    const [email, setEmail] = useState(userData.email)
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    useEffect(() => {
        if(userData){
            setName(userData.name);
            setEmail(userData.email);
            setAvatarPreview(userData.avatar.url);
        }
        if(error){
            alert.error(error.error);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            navigate("/account");
            dispatch(updateProfileReset());
        }
    }, [dispatch, error, alert, isUpdated, navigate, userData]);

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
    }

    const updatePofileDataChange = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }

    if(error || loading){
        return <Loader />
    }

    return <>
        <MetaData title = {`Update ${userData.name }'s Profile`} />
        <div className='updatePofileContainer'>
            <div className='updatePofileBox'>
                <h2 className='updatePofileHeading'>Update Profile</h2>
                <form className='updatePofileForm' encType="multipart/form-data" onSubmit={updateProfileSubmit}>
                    <div className='updatePofileName'>
                        <FaceOutlinedIcon />
                        <input 
                            type={"text"} 
                            placeholder="Name" 
                            required 
                            name='name' 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                        />
                    </div>
                    <div className='updatePofileMail'>
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
                    <div id="updatePofileImage">
                        <img src={avatarPreview} alt={'Avatar Preview'} />
                        <input type={"file"} name="avatar" accept='image/*' onChange={updatePofileDataChange} />
                    </div>
                    <input type={"submit"} value="Update" className='updatePofileBtn' disabled={loading ? true : false} />
                </form>
            </div>
        </div>
    </>
}

export default EditProfile;
