import React from "react";
import Select from 'react-select';
import CheckBoxGroup from './CheckBoxGroup';
import RadioBoxGroup from './RadioBoxGroup';
import Editor from './Editor';
import Boolean from "./Boolean";
import Images from "./Images";
import ControlContainer from '../ControlContainer';
import ShowCondition from "./Conditions/ShowCondition";
import Managecoupons from './Managecoupons';
import moment from "moment";

const Input = (props) => {
    let inputElement = null;
    let inputClasses = ["inputElement"];

    if(props.shouldValidate && props.isValid && props.touched) {
        inputClasses.push("invalid");
    }

    switch(props.elementType) {
        case "input":
            let value = props.value;
            if(props.elementConfig.type === 'date') {
                value = moment(props.value).format("YYYY-MM-DD");
            }
            inputElement = (<input 
                        onChange={props.changed}
                        onBlur={props.changed}
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                        value={value}
                    />);
        break;
        case "file":
            if(props.multiple) {
                inputElement = (<>
                    <input 
                        onChange={props.changed}
                        multiple={props.multiple}
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                    />
                    {
                        <div id="createProductFormImage">
                            {
                                props.value && props.value.map((image, index) => {
                                    return <Images 
                                        key={index} 
                                        image={image}
                                        removeImage={() => props.removeImage(index, props.id)}
                                    />
                                }) 
                            }
                        </div>
                    }
                </>);
            } else {
                inputElement = (<>
                    <input 
                        onChange={props.changed}
                        multiple={props.multiple}
                        className={inputClasses.join(" ")}
                        {...props.elementConfig}
                    />
                    {
                        <div id="createProductFormImage">
                            {
                                props.value && props.value.map((image, index) => {
                                    return <Images 
                                        key={index} 
                                        image={image}
                                        removeImage={() => props.removeImage(index, props.id)}
                                    />
                                }) 
                            }
                        </div>
                    }
                </>);
            }
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
            inputElement = (
                <Select 
                    options={props.options ? props.options : options} 
                    value={props.value !== null ? props.value : []}
                    isMulti={props.elementType === 'multiselect' ? true : false}
                    onChange={props.changed}
                    onClick={props.click}
                   isDisabled={props.elementConfig.disabled}
                />
            );
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
        case "conditions":
            inputElement = <ShowCondition 
                value={props.value} 
                id={props.id} 
                changed={props.changed}
            />;
        break;
        case "managecoupons":
            inputElement = <Managecoupons
                value={props.value}
                id={props.id}
                changed={props.changed}
            />;
        break;
        default:
            inputElement = (
                <input 
                    onChange={props.changed}
                    onBlur={props.changed}
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
        break;
    }
    return (<ControlContainer
        hideLabel={props.hideLabel}
        label={props.label}
        shouldValidate={props.shouldValidate}
        error={props.elementConfig.error}
    >
        {inputElement}
    </ControlContainer>);
}

Input.defaultProps={
    hideLabel: true
}

export default Input;
