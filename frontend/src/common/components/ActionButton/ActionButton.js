import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import './ActionButton.css';

const ActionButton = ({title, onClick}) => {
    const navigate = useNavigate();
    return (<div className="w-full gap-3 flex justify-center">
        <Button id="ActionButton" type="button" onClick={onClick}>{title}</Button>
        <Button id="BackActionButton" type="button" onClick={() => navigate(-1)}>Back</Button>
    </div>);
}

export default ActionButton;
