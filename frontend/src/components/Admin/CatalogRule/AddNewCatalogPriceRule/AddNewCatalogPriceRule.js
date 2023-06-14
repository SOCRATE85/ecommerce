import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { clearErrors, createCatalogRule, createCatalogRuleReset } from '../../../../store';
import { FormContainer } from "../../../../common/components/FormContainer";
import FormAction from '../../../../common/components/FormAction';
import ActionControl from '../../../../common/ActionControl';
import FormElement from '../../../../common/components/FormElement';
import Loader from "../../../layout/Loader/Loader";
import SubmitActionButton from '../../../../common/components/SubmitActionButton';

const AddNewCatalogPriceRule = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {success, error, loading} = useSelector(state => state.createCatalogRule);
    const {conditionObject} = useSelector(state => state.updateCatalogRuleObject);
    const stopRulesProcessing = [
        {
            value: true,
            label: "Yes"
        },
        {
            value: false,
            label: "No"
        },
    ];
    const simpleAction = [
        {
            value: "by_percent",
            label: "Apply as percentage of original"
        },
        {
            value: "by_fixed",
            label: "Apply as fixed amount"
        },
        {
            value: "to_percent",
            label: "Adjust final price to this percentage"
        },
        {
            value: "to_fixed",
            label: "Adjust final price to discount value"
        },
    ];
    const [formState, setFormState] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Rule Name",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        description: {
            elementType: "textarea",
            elementConfig: {
                type: "textarea",
                placeholder: "Description",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        from_date: {
            elementType: "input",
            elementConfig: {
                type: "date",
                placeholder: "From",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        to_date: {
            elementType: "input",
            elementConfig: {
                type: "date",
                placeholder: "To",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        is_active: {
            elementType: "boolean",
            elementConfig: {
                placeholder: "Active",
                error: "",
                type: "boolean"
            },
            value: true,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        sort_order: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Priority",
                error: ""
            },
            value: 0,
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        conditions_serialized: {
            elementType: "conditions",
            elementConfig: {
                type: "conditions",
                placeholder: "Conditions(don't add conditions if rule is applied to all products)",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        simple_action: {
            elementType: "select",
            elementConfig: {
                placeholder: "Apply",
                options: simpleAction,
                error: ""
            },
            value: {value: "by_percent", label: "Apply as percentage of original"},
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        discount_amount: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Discount Amount",
                error: ""
            },
            value: "",
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        stop_rules_processing: {
            elementType: "select",
            elementConfig: {
                placeholder: "Discard Subsequent rules",
                options: stopRulesProcessing,
                error: ""
            },
            value: {value: "no", label: "No"},
            validation: {
                required: true
            },
            hideLabel: false,
            valid: false,
            touched: false
        }
    });

    const actioncontrol = useMemo(() => {
        return new ActionControl({
            formState,
            setFormState
        });
    }, [
        formState,
        setFormState,
    ]);

    useEffect(() => {
        if(success) {
            alert.success("Rule added successfully");
            dispatch(createCatalogRuleReset());
            navigate('/admin/catalog_rules');
        }
    }, [success, dispatch, alert, navigate]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    const createSubmitHandler = (state) => {
        const myForm = new FormData();
        for(let key in state) {
            if(key === 'conditions_serialized') {
                myForm.set(key, JSON.stringify(conditionObject));
            } else if(key === 'simple_action') {
                myForm.set(key, state[key].value.value);
            } else if(key === 'stop_rules_processing')  {
                myForm.set(key, state[key].value.value);
            } else {
                myForm.set(key, state[key].value);
            }
        }
        dispatch(createCatalogRule(myForm));
    }

    let formElementArray = useMemo(() => {
        const _formElementArray = [];
        const tempformElementArray = actioncontrol.getFormState();
        for(let key in tempformElementArray) {
            _formElementArray.push({
                id: key,
                config: tempformElementArray[key]
            })
        }
        return _formElementArray;
    }, [actioncontrol]);
    
    if(loading) {
        return <Loader />
    }

    return <FormContainer pagetitle={"Add Catalog Rule"}>
        <FormAction 
            submitHandler={(e) => actioncontrol.createSubmitHandler(e, createSubmitHandler)}
        >
            <FormElement 
                formElementArray={formElementArray}
                actioncontrol={actioncontrol}
                options={[
                    {
                        key: "simple_action",
                        option: simpleAction
                    },
                    {
                        key: "stop_rules_processing",
                        option: stopRulesProcessing
                    }
                ]}
            />
            <SubmitActionButton title={'Save Rule'} />
        </FormAction>
    </FormContainer>
}

export default AddNewCatalogPriceRule;
