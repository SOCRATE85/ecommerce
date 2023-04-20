import React from 'react';
import { Catalog } from './Settings/Catalog';
import { FormContainer } from '../../common/components/FormContainer';
import "./Settings.css";

const Settings = () => {
    return <><FormContainer pagetitle={'Admin Configuration Settings'}>
            <div className="settingsContainer">
                <Catalog title="Catalog" />
            </div>        
        </FormContainer>
    </>;
}

export default Settings;
