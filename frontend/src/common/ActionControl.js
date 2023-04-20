class ActionControl {
    constructor({
        formState,
        setFormState,
        images,
        setImages,
        imageIdentifier,
        setImageIdentifier,
        uploadedImage,
        imageUpload,
        setImageUpload
    }) {
        this.formState = formState;
        this.setFormState = setFormState;
        this.images = images;
        this.setImages = setImages;
        this.imageIdentifier = imageIdentifier;
        this.setImageIdentifier = setImageIdentifier;
        this.uploadedImage = uploadedImage;
        this.imageUpload = imageUpload;
        this.setImageUpload = setImageUpload;
    }
    loadOption = () => {
        const _updatedFormElement = {...this.formState};
            const updatedFormElement = {..._updatedFormElement[this.imageIdentifier]};
            updatedFormElement.touched = true;
            updatedFormElement.value = [...updatedFormElement.value, ...this.uploadedImage];
            const validation = this.checkValidation(
                this.uploadedImage,
                updatedFormElement.validation,
                updatedFormElement.elementConfig.type
            );
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
            _updatedFormElement[this.imageIdentifier] = updatedFormElement;
            this.setFormState(_updatedFormElement);
            this.setImageUpload(false);
    }
    setFormDataValues = (sliderData, setStatus) => {
        const _updatedFormElement = {...this.formState};
        for(let identifier in _updatedFormElement) {
            const updatedFormElement = {..._updatedFormElement[identifier]};
            updatedFormElement.valid = true;
            
            switch (updatedFormElement.elementType) {
                case "select":
                    updatedFormElement.value = sliderData[identifier] ? {
                        value: sliderData[identifier]._id, 
                        label: sliderData[identifier].title
                    } : "";
                break;
                case "multiselect":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier].map(item => ({ value: item._id, label: item.title })) : "";
                break;
                case "editor":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                case "checkbox":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                case "file":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                case "input":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                case "textarea":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                case "boolean":
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
                default:
                    updatedFormElement.value = sliderData[identifier] ? sliderData[identifier] : "";
                break;
            }
            
            _updatedFormElement[identifier] = updatedFormElement;
        }
        this.setFormState(_updatedFormElement);
        setStatus(true);
    }
    getFormState = () => {
        return this.formState;
    }
    checkValidation = (value, rules, type) => {
        let isValid = true;
        let message = "";
        
        if (!rules) return { isValid: true, message};

        if(rules.required) {
            if(type === "boolean") {
                isValid = !(value !== true && isValid);
                
                if (!isValid) {
                    message = "This is required!";
                }
            } else {
                isValid = value !== "" && isValid;            
                if (!isValid) {
                    message = "This is required!";
                }
            }
        }
        
        if(rules.isImage && value.length !== 0) {
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
    }
    slugify = (data) => {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
        const p = new RegExp(a.split('').join('|'), 'g')
        
        return data.toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
            .replace(/&/g, '-and-') // Replace & with 'and'
            // eslint-disable-next-line
            .replace(/[^\w\-]+/g, '') // Remove all non-word characters
            // eslint-disable-next-line
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, '') // Trim - from end of text
    }
    inputOptionChangeHandler = (event, identifier) => {
        const _updatedFormElement = {...this.formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        
        if(event.target.type === 'checkbox' || event.target.type === 'radio') {
            updatedFormElement.value = event.target.checked ? true : false;
            const validation = this.checkValidation(
                event.target.checked,
                updatedFormElement.validation,
                updatedFormElement.elementConfig.type
            );
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
        } else {
            updatedFormElement.value = event.target.value;
            const validation = this.checkValidation(
                event.target.value,
                updatedFormElement.validation,
                updatedFormElement.elementConfig.type
            );
            updatedFormElement.valid = validation.isValid;
            updatedFormElement.elementConfig.error = validation.message;
        }
        
        _updatedFormElement[identifier] = updatedFormElement;

        if(identifier === 'title') {
            const __updatedFormElement = {..._updatedFormElement};
            if(__updatedFormElement["url_path"]) {
               const updatedFormElement = {...__updatedFormElement["url_path"]};
                updatedFormElement.touched = true;
                const url = this.slugify(event.target.value);
                updatedFormElement.value = url;
                const validation = this.checkValidation(
                    event.target.value,
                    updatedFormElement.validation,
                    updatedFormElement.elementConfig.type
                );
                updatedFormElement.valid = validation.isValid;
                updatedFormElement.elementConfig.error = validation.message;
                __updatedFormElement["url_path"] = updatedFormElement;
            }
            this.setFormState(__updatedFormElement); 
        } else {
            this.setFormState(_updatedFormElement);
        }
    }
    removeImage = (imageIndex, imageIdentifier) => {
        const updatedFormState = {...this.formState};
        const _images = this.images.filter((_, index) => index !== imageIndex) 
        const updatedFormElement = {...updatedFormState[imageIdentifier]};        
        updatedFormElement.value = _images.length !== 0 ? _images : [];
        updatedFormState[imageIdentifier] = updatedFormElement;
        this.setFormState(updatedFormState);
        this.setImages(_images.length !== 0 ? _images : []);
    }
    createImageChange = (event, identifier, callback) => {
        callback(event, identifier);
    }
    selectOptionChangeHandler = (value, identifier) => {
        const _updatedFormElement = {...this.formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = value;
        const validation = this.checkValidation(
            value,
            updatedFormElement.validation,
            updatedFormElement.elementConfig.type
        );
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        this.setFormState(_updatedFormElement);
    }
    chkEditorHandler = (data, identifier) => {
        if(!data || data === '') return;
        const _updatedFormElement = {...this.formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = data;
        const validation = this.checkValidation(
            data,
            updatedFormElement.validation,
            updatedFormElement.elementConfig.type
        );
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        this.setFormState(_updatedFormElement);
    }
    checkboxOptionChangeHandler = (event, identifier) => {
        const _updatedFormElement = {...this.formState};
        const updatedFormElement = {..._updatedFormElement[identifier]};
        updatedFormElement.touched = true;
        updatedFormElement.value = event.target.value;
        const validation = this.checkValidation(
            event.target.value,
            updatedFormElement.validation,
            updatedFormElement.elementConfig.type
        );
        updatedFormElement.valid = validation.isValid;
        updatedFormElement.elementConfig.error = validation.message;
        _updatedFormElement[identifier] = updatedFormElement;
        this.setFormState(_updatedFormElement);
    }
    validate = () => {
        const updateEnquiryForm = {...this.formState};
        for (let inputIdentifiers in updateEnquiryForm) {
            let formIsValid2 = true;
            const updatedFormElement = {
                ...updateEnquiryForm[inputIdentifiers],
            };
            const valid = this.checkValidation(
                updatedFormElement.value,
                updatedFormElement.validation,
                updatedFormElement.elementConfig.type
            );
            formIsValid2 = valid.isValid && formIsValid2;
            updatedFormElement.valid = formIsValid2;
            updatedFormElement.elementConfig.error = valid.message;
            updateEnquiryForm[inputIdentifiers] = updatedFormElement;
        }
        return updateEnquiryForm;
    }
    validatedForm = () => {
        let formIsValid2 = true;
        for (let inputIdentifiers in this.formState) {
            formIsValid2 = this.formState[inputIdentifiers].valid && formIsValid2;
        }
        return formIsValid2;
    }
    createSubmitHandler = (event, callback) => {
        event.preventDefault();
        const validatedData = this.validate(); console.log('validatedData: ', validatedData);
        this.setFormState(validatedData);
        const validated = this.validatedForm();
        if(!validated) {
            return;
        }
        callback(this.formState);
    }
    updateSubmitHandler = (event, callback) => {
        event.preventDefault();
        const validatedData = this.validate();
        this.setFormState(validatedData);
        const validated = this.validatedForm();
        if(!validated) {
            return;
        }
        callback(this.formState);
    }
}

export default ActionControl;