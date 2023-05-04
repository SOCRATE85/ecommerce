import React from "react";
import "./CheckBoxGroup.css";

const RadioBoxGroup = ({ changed, value, options, name }) => {
    return (<div className="CheckBoxGroup">
        {
            options.map((option, index) => {
                return (<label key={index} style={{ display: "flex" }}>
                    {
                        value.toString() === option.value.toString() ? (<input
                            type={"radio"}
                            name={name}
                            onChange={changed}
                            checked
                            value={option.value}
                        />) : (<input
                            type={"radio"}
                            name={name}
                            onChange={changed}
                            value={option.value}
                        />)
                    }{option.defaultValue}
                </label>);
            })
        }
    </div>);
}

export default RadioBoxGroup;
