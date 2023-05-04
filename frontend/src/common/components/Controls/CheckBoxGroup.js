import React from "react";
import "./CheckBoxGroup.css";

const CheckBoxGroup = ({ changed, value, options, name }) => {
    //console.log(value);
    //console.log(options);
    return (<div className="CheckBoxGroup">
        {
            options.map((option, index) => {
                let isExists = value.find((item) => item.toString() === option.value.toString());
                //console.log(isExists, option.value);
                return (<label key={index} style={{ display: "flex" }}>
                    {
                        isExists === undefined ? (<input 
                            type={"checkbox"}
                            name={name}
                            onChange={changed}
                            value={option.value}
                        />) : (<input
                            type={"checkbox"}
                            name={name}
                            onChange={changed}
                            checked
                            value={option.value}
                        />)
                    }{option.defaultValue}
                </label>);
            })
        }
    </div>);
}

export default CheckBoxGroup;
