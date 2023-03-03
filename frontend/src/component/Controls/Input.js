import React from "react";
import CheckBoxGroup from './CheckBoxGroup';
import RadioBoxGroup from './RadioBoxGroup';
import Editor from './Editor';
import Boolean from "./Boolean";
import Select from 'react-select';
import Images from "./Images";
import "./Input.css";

const Input = (props) => {
    let inputElement = null;
    let inputClasses = ["inputElement"];

    if(props.shouldValidate && props.isValid && props.touched) {
        inputClasses.push("invalid");
    }

    switch(props.elementType) {
        case "input":
            inputElement = (<input 
                onChange={props.changed}
                onBlur={props.changed}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
            />);
        break;
        case "file":
            inputElement = (<>
                <input 
                    onChange={props.changed}
                    multiple={true}
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                />
                {props.value && <div id="createProductFormImage">
                    {
                        props.value.map((image, index) => {
                            return <Images 
                                key={index} 
                                image={image} 
                                removeImage={() => props.removeImage(index, props.id)}
                            />
                        })
                    }
                </div>}
            </>);
        break;
        case 'boolean':
            inputElement = <Boolean 
            onChange={props.changed} 
            value={props.value} 
            {...props.elementConfig}
            />     
        break;
        case "textarea":
            inputClasses.push("textarea");
            inputElement = (<textarea
                onChange={props.changed}
                onBlur={props.changed}
                className={inputClasses.join(" ")}
                defaultValue={props.value}
                {...props.elementConfig}
            ></textarea>);
        break;
        case "select":
        case "multiselect":
            let options = [];
            props.elementConfig.options.map(option => {
                options.push({label: option.defaultValue, value: option.value});
                return true;
            });
            
            inputElement = <Select 
                                options={props.options ? props.options : options} 
                                value={props.value !== null ? props.value : []}
                                isMulti={props.elementType === 'multiselect' ? true : false}
                                onChange={props.changed}
                                onClick={props.click}
                            />
        break;
        case "checkbox":
            inputElement = (<CheckBoxGroup 
                changed={props.changed}
                multiple={props.multiple}
                name={props.id}
                value={props.value}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                options={props.elementConfig.options}
            />);
        break;
        case "radio":
            inputElement = (<RadioBoxGroup 
                changed={props.changed}
                multiple={props.multiple}
                name={props.id}
                value={props.value}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                options={props.elementConfig.options}
            />);
        break;
        case "editor":
            inputElement = (<Editor initData={props.value} id={props.id} changed={props.changed} />)
        break;
        case 'date':
            inputElement = (<input 
                onChange={props.changed}
                onBlur={props.changed}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
            />);
        break;
        default:
            inputElement = (<input 
                onChange={props.changed}
                onBlur={props.changed}
                className={inputClasses.join(" ")}
                {...props.elementConfig}
                value={props.value}
            />);
        break;
    }

    return (<div className="input">
        {!props.hideLabel && (
            <label>{props.label}{" "}{props.shouldValidate && <span style={{color:"red"}}>*</span>}</label>
        )}
        {inputElement}
        {props.shouldValidate && props.elementConfig.error !== "" && (
            <div style={{color:"red"}}>{props.elementConfig.error}</div>
        )}
    </div>);
}

Input.defaultProps={
    hideLabel: true
}

export default Input;
