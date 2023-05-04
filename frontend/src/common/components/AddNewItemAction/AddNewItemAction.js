import React from "react";
import {Button} from '@mui/material';
import {AddCircleOutline} from "@mui/icons-material";
import {useNavigate} from 'react-router-dom';

const AddNewItemAction = ({actionUrl, title}) => {
    const navigate = useNavigate();
    return (<div className="text-left flex justify-end">
        <Button onClick={() => navigate(actionUrl)}><AddCircleOutline /> {title}</Button>
    </div>)
}

export default AddNewItemAction;
