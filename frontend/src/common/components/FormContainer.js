import React from "react";
import Sidebar from "../../component/Admin/Sidebar";
import MetaData from "../../component/layout/MetaData";

export const FormContainer = ({children, pagetitle}) => {
    return (<>
        <MetaData title={pagetitle} />
        <div className="dashboard grid w-full max-w-full grid-col-5">
            <Sidebar />
            <div className="w-full box-border flex flex-col">
                <h1 className="p-5">{pagetitle}</h1>
                <div className="w-full">{children}</div>
            </div>
        </div>
    </>) 
}
