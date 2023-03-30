import React from 'react';
import { Catalog } from './Settings/Catalog';

import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";
import "./Settings.css";

const Settings = () => {
    return <>
        <MetaData title={"Admin Reviews Listing"} />
        <div className="dashboard">
            <Sidebar />
            <div className="settingsContainer">
                <h1 className="productReviewsFormHeading">Settings</h1>
                <Catalog title="Catalog" />
            </div>
        </div>
    </>;
}

export default Settings;
