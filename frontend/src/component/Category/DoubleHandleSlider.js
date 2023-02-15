import React from "react";
import { Typography, Slider } from "@mui/material";

export const DoubleHandleSlider = ({value, title, onChange, min, max, sliderType}) => {
    return (<li className="filter-item">
        <Typography className="title">{title}</Typography>
        <div className="filter-container">
            <Slider
                value={value}
                onChange={onChange}
                valueLabelDisplay="auto"
                aria-labelledby={sliderType}
                min={min}
                max={max}
                size="medium"
            />
        </div>
    </li>)
}