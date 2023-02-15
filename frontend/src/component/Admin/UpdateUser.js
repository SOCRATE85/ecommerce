import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getUserDetails, updateUser } from "../../store/actions/userAction";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '@mui/material';
import { 
    VerifiedUserOutlined, 
    PersonOutlined,
    EmailOutlined, 
} from "@mui/icons-material";
import { FormContainer } from "../../common/components/FormContainer";
import { UPDATE_USER_RESET } from "../../store/contants/userContant";
import Loader from "../layout/Loader/Loader";
import "./UpdateUser.css";

const roles = [
    "user",
    "admin"
];

const UpdateUser = () => {
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();    
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector( state => state.profile );
    const { loading: userDetailsLoading, error: userDetailsError, user } = useSelector( state => state.userDetails );
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ role, setRole ] = useState("");
    const [ imagePreview, setImagePreview ] = useState();

    useEffect(() => {
        if(user && user._id !== params.id) {
            dispatch(getUserDetails(params.id));
        }else{
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
            setImagePreview(user.avatar.url);
        }
        
    }, [dispatch, params.id, user]);

    useEffect(() => {
        if(updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }

        if(userDetailsError) {
            alert.error(userDetailsError);
            dispatch(clearErrors());
        }

        if(isUpdated) {
            alert.success("User updated successfully");
            navigate("/admin/users");
            dispatch(getUserDetails(params.id));
            dispatch({ type: UPDATE_USER_RESET })
        }
    },[alert, dispatch, updateError, userDetailsError, isUpdated, navigate, params.id]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
        dispatch(updateUser(myForm, params.id));
    }

    return (<FormContainer pagetitle={"Update User"}>
        {updateLoading || userDetailsLoading || user.length === 0 ? <Loader /> : <form className="createProductForm" encType="multipart/form-data" onSubmit={updateUserSubmitHandler}>
            <div>
                <PersonOutlined />
                <input 
                    type={"text"} 
                    placeholder="Name" 
                    required 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />
            </div>
            <div>
                <EmailOutlined />
                <input 
                    type={"text"}
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>                    
            <div>
                <VerifiedUserOutlined />
                <select onChange={(e) => setRole(e.target.value)} value={role}>
                    <option value={""}>Choose Role</option>
                    {
                        roles.map(role => {
                            return <option key={role} value={role}>{role}</option>
                        })
                    }
                </select>
            </div>
            <div id="createProductFormImage">
                {
                    imagePreview && <img src={imagePreview} alt="Avatar Preview" />
                }
            </div>
            <Button 
                id="createProductBtn" 
                type="submit" 
                disabled={ updateLoading || userDetailsLoading ? true : false}
            >
                Update
            </Button>
        </form>}
    </FormContainer>)
}

export default UpdateUser;