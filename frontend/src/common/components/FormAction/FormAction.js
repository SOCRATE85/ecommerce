import React, { forwardRef } from "react";
import './FormAction.css';

const FormAction = forwardRef(({submitHandler, children}, ref) => {
    return (
        <form 
            ref={ref}
            method="post"
            className="formContentContainer"
            encType="multipart/form-data"
            onSubmit={submitHandler}
        >
            {children}
        </form>
    );
});

export default FormAction;
