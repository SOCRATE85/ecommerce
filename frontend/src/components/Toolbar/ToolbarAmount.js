import React from "react";

export const ToolbarAmount = ({from, to, total}) => {
    return (
        <p className="toolbar-amount" id="toolbar-amount">
            Items 
            <span className="toolbar-number">{from}</span>-<span className="toolbar-number">{to > total ? total : to}</span> of <span className="toolbar-number">{total}</span>
        </p>
    );
}
