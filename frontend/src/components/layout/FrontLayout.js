import React from 'react';
import Header from "./Header/Header";
import Footer from "./Footer";
import { Routes } from "react-router-dom";

export const FrontLayout = ({children}) => {
    return (<>
        <Header />
        <Routes>
            {children}
        </Routes>            
        <Footer />
    </>)
}