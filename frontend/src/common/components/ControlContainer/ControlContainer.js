import React from "react";
import './ControlContainer.css';

const ControlContainer = (props) => {
    return <div className="input">
        {!props.hideLabel && (
            <label>{props.label}{" "}{props.shouldValidate && <span style={{color:"red"}}>*</span>}</label>
        )}
        {props.children}
        {props.shouldValidate && props.error !== "" && (
            <div style={{color:"red"}}>{props.error}</div>
        )}
    </div>
}

export default ControlContainer;
