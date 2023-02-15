export const checkValidation = (value, rules) => {
    let isValid = true;
    let message = "";
    
    if (!rules) return { isValid: true, message: "" };

    if (rules.required) {
        isValid = value !== "" && isValid;
        if (!isValid) {
            message = "This is required!";
        }
    }

    if(rules.isImage) {
        isValid = value.length !== 0 && isValid;
        if (!isValid) {
            message = "This is required!";
        }
    }

    if (rules.minLength && value !== "") {
        isValid = value.length >= rules.minLength && isValid;
        if (!isValid) {
            message = "Minimum require length " + rules.minLength;
        }
    }

    if (rules.maxLength && value !== "") {
        isValid = value.length <= rules.maxLength && isValid;
        if (!isValid) {
            message = "Maximum require length " + rules.maxLength;
        }
    }

    if (rules.isEmail && value !== "") {
        const pattern =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value);
        if (!isValid) {
            message = "Email is not valid";
        }
    }

    if (rules.isNumeric) {
        isValid = !isNaN(value) && isValid;
        if (!isValid) {
            message = "Only number allow";
        }
    }

    return { isValid, message: isValid ? "" : message };
};

export const validateProductData = (formObject) => {
    const updateFormObject = {
        ...formObject,
    };
    const _updateFormObject = [];
    for(let key in updateFormObject) {
        const updateEnquiryForm = {...updateFormObject[key]};
        
        const _attributes = updateEnquiryForm.attributes;
        for (let inputIdentifiers in _attributes) {
            let formIsValid2 = true;
            const updatedFormElement = {
            ..._attributes[inputIdentifiers],
            };
            
            const valid = checkValidation(
            updatedFormElement.value === null ? "" : updatedFormElement.value,
            updatedFormElement.validation
            );
            formIsValid2 = valid.isValid && formIsValid2;
            updatedFormElement.valid = formIsValid2;
            updatedFormElement.elementConfig.error = valid.message;
            updateEnquiryForm['attributes'][inputIdentifiers] = updatedFormElement;
        }
        _updateFormObject.push(updateEnquiryForm);
    }
    
    return _updateFormObject;
};

export const validate = (formObject) => {
    const updateEnquiryForm = {
        ...formObject,
    };

    for (let inputIdentifiers in updateEnquiryForm) {
        let formIsValid2 = true;
        const updatedFormElement = {
            ...updateEnquiryForm[inputIdentifiers],
        };

        const valid = checkValidation(
        updatedFormElement.value === null ? "" : updatedFormElement.value,
        updatedFormElement.validation
        );

        formIsValid2 = valid.isValid && formIsValid2;
        updatedFormElement.valid = formIsValid2;
        updatedFormElement.elementConfig.error = valid.message;
        updateEnquiryForm[inputIdentifiers] = updatedFormElement;
    }

    return updateEnquiryForm;
};

export const validatedForm = (formState) => {
    let formIsValid2 = true;
    for (let inputIdentifiers in formState) {
        formIsValid2 = formState[inputIdentifiers].valid && formIsValid2;
    }

    return formIsValid2;
};

export const validatedProductForm = (formState) => {
    let formIsValid2 = true;
    const updateFormObject = {
        ...formState,
    };
    for(let key in updateFormObject) {
        const updateEnquiryForm = {...updateFormObject[key]};        
        const _attributes = updateEnquiryForm.attributes;
        for (let inputIdentifiers in _attributes) {
            formIsValid2 = _attributes[inputIdentifiers].valid && formIsValid2;
        }
    }

    return formIsValid2;
};
