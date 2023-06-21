import React from "react";
import { Alert, AlertTitle } from '@mui/material';
import "./Alert.css";

const AlertComponent = ({messages}) => {
    function renderItem(content) {
        if (typeof content === 'function') {
            return content();
        } else {
            return content;
        }
    }

    return (
        <div className="alert">
            <div className="alert-container">
                {messages.map(t => {
                return (
                    <div className={`alert-container-item`} key={t.id}>
                        <Alert severity={t.type}>
                            <AlertTitle>{t.type}</AlertTitle>
                            {renderItem(t.content)}
                        </Alert>
                    </div>
                );
                })}
            </div>
        </div>
    );
}

export default AlertComponent;
