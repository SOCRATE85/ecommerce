import React from "react";
import './FormAction.css';

const FormAction = ({submitHandler, children}) => {
    return (
        <form className="formContentContainer" encType="multipart/form-data" onSubmit={(e) => submitHandler(e)}>
            {children}
        </form>
    );
}

export default FormAction;
