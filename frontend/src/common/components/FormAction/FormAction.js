import React, { forwardRef } from "react";
import './FormAction.css';

const FormAction = forwardRef(({submitHandler, children}, ref) => {
    return (
        <form ref={ref} className="formContentContainer" encType="multipart/form-data" onSubmit={(e) => submitHandler(e)}>
            {children}
        </form>
    );
});

export default FormAction;
