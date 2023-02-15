import { AccountBalanceOutlined, LibraryAddCheckOutlined, LocalShippingOutlined } from "@mui/icons-material";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import "./CheckoutSteps.css";

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        { 
            label: <Typography>Shipping Details</Typography>,
            icon: <LocalShippingOutlined />
        },
        { 
            label: <Typography>Confirm Order</Typography>,
            icon: <LibraryAddCheckOutlined />
        },
        { 
            label: <Typography>Payment</Typography>,
            icon: <AccountBalanceOutlined />
        }
    ];

    const stepStyles = {
        boxSizing: "border-box"
    };

    return <>
        <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
            {
                steps.map((step, index) => {
                    return <Step key={index} active={activeStep === index ? true : false} completed={ activeStep >= index ? true : false }>
                        <StepLabel style={{ color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)" }} icon={step.icon}>{step.label}</StepLabel>
                    </Step>
                })
            }
        </Stepper>
    </>
}

export default CheckoutSteps;
