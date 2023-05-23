import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import './SubmitActionButton.css';

const SubmitActionButton = ({title, backurl}) => {
    const navigate = useNavigate();
    return (<div className="w-full gap-3 flex justify-center">
        <Button id="SubmitActionButton" type="submit">{title}</Button>
        <Button id="BackActionButton" type="button" onClick={() => backurl ? navigate(backurl) : navigate(-1)}>Back</Button>
    </div>);
}

export default SubmitActionButton;
