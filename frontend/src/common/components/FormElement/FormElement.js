import React from "react";
import Input from '../Controls/Input';

const FormElement = ({formElementArray, actioncontrol, options, createImageChange}) => {
    const optionsValues = (key, options) => {
        if(!options) {
            return {};
        }
        const valuelist = options.find(option => option.key === key);
        return valuelist.option;
    }

    return formElementArray.map(element => {
        switch (element.config.elementType) {
            case 'select':
            case "multiselect":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    options={optionsValues(element.id, options)}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(e)=> actioncontrol.selectOptionChangeHandler(e, element.id)}
                />
            case 'conditions':
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(data) => actioncontrol.chkEditorHandler(data, element.id)}
                />
            case "editor":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(data) => actioncontrol.chkEditorHandler(data, element.id)}
                />
            case "checkbox":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(e)=> actioncontrol.checkboxOptionChangeHandler(e, element.id)}
                />
            case 'file': 
                    return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    multiple={element.config.multiple}
                    removeImage={actioncontrol.removeImage}
                    changed={(e)=> actioncontrol.createImageChange(e, element.id, createImageChange)}
                />
            case "input":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                />
            case "textarea":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                />
            case "boolean":
                return <Input 
                    id={element.id}
                    key={element.id}
                    hideLabel={element.config.hideLabel}
                    elementType={element.config.elementType}
                    label={element.config.elementConfig.placeholder}
                    elementConfig={element.config.elementConfig}
                    value={element.config.value}
                    isValid={!element.config.valid}
                    shouldValidate={element.config.validation.required}
                    touched={element.config.touched}
                    changed={(e)=> actioncontrol.inputOptionChangeHandler(e, element.id)}
                />
            default:
                return null
        }
    });
}

export default FormElement;
