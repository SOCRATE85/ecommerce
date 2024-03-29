import React from "react";
import { useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import './SubmitActionButton.css';

const SubmitActionButton = ({title, backurl, children, actions }) => {
    const navigate = useNavigate();
    return (<div className="w-full gap-3 flex justify-center">
        {children}
        <Button id="SubmitActionButton" type="submit" onClick={actions}>{title}</Button>
        <Button id="BackActionButton" type="button" onClick={() => backurl ? navigate(backurl) : navigate(-1)}>Back</Button>
    </div>);
}

export default SubmitActionButton;
