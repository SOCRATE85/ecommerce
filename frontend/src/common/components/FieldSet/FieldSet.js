import React from "react";

const FieldSet = ({children, legend}) => {
    return (<fieldset style={{display:'block', width: '100%', marginBottom: 20, border: '1px solid rgba(0, 0,0, 0.267)'}}>
        <legend style={{fontSize: 16, marginLeft: 10}}>{legend}</legend>
        <div className="selectBox">{children}</div>
    </fieldset>);
}

export default FieldSet;
