import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../../../common/hooks/use-alert";
import {
  clearErrors,
  getAllCartRules,
  getCartRule,
  setConditionObject,
  updateCartRuleReset,
  updateCartRule
} from "../../../../store";
import { FormContainer } from "../../../../common/components/FormContainer";
import FormAction from "../../../../common/components/FormAction";
import ActionControl from "../../../../common/ActionControl";
import FormElement from "../../../../common/components/FormElement";
import SubmitActionButton from "../../../../common/components/SubmitActionButton";
import { Loader } from "../../../layout";
import { Button } from "@mui/material";

const EditCartRule = () => {
    const params = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [status, setStatus] = useState(false);
    const {conditionObject} = useSelector(state => state.updateCatalogRuleObject);
    const {cartrule, error, loading} = useSelector(state => state.cartRule);
    const {isUpdated, loading: updateLoading, error: updateError} = useSelector(state=>state.updateCatalongrule);
    const cartRuleId = params.id;
    const stopRulesProcessing = [
    {
      value: true,
      label: "Yes",
    },
    {
      value: false,
      label: "No",
    },
  ];
  const simpleAction = [
    {
      value: "by_percent",
      label: "Apply as percentage of original",
    },
    {
      value: "by_fixed",
      label: "Apply as fixed amount",
    },
    {
      value: "to_percent",
      label: "Adjust final price to this percentage",
    },
    {
      value: "to_fixed",
      label: "Adjust final price to discount value",
    },
  ];
  const coupon = [
    {
      value: 1,
      label: "No Coupon",
    },
    {
      value: 2,
      label: "Specific Coupon",
    }
  ];
  const [formState, setFormState] = useState({
        name: {
        elementType: "input",
        elementConfig: {
            type: "text",
            placeholder: "Rule Name",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        description: {
        elementType: "textarea",
        elementConfig: {
            type: "textarea",
            placeholder: "Description",
            error: "",
        },
        value: "",
        validation: {
            required: false,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        from_date: {
        elementType: "input",
        elementConfig: {
            type: "date",
            placeholder: "From",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        to_date: {
        elementType: "input",
        elementConfig: {
            type: "date",
            placeholder: "To",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        coupon: {
        elementType: "select",
        elementConfig: {
            placeholder: "Coupon",
            options: coupon,
            error: "",
        },
        value: { value: 1, label: "No Coupon" },
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        is_active: {
        elementType: "boolean",
        elementConfig: {
            placeholder: "Active",
            error: "",
            type: "boolean",
        },
        value: true,
        validation: {
            required: false,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        sort_order: {
        elementType: "input",
        elementConfig: {
            type: "number",
            placeholder: "Priority",
            error: "",
        },
        value: 0,
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        conditions_serialized: {
        elementType: "conditions",
        elementConfig: {
            type: "conditions",
            placeholder:
            "Conditions(don't add conditions if rule is applied to all products)",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        simple_action: {
        elementType: "select",
        elementConfig: {
            placeholder: "Apply",
            options: simpleAction,
            error: "",
        },
        value: { value: "by_percent", label: "Apply as percentage of original" },
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        discount_amount: {
        elementType: "input",
        elementConfig: {
            type: "number",
            placeholder: "Discount Amount",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        stop_rules_processing: {
        elementType: "select",
        elementConfig: {
            placeholder: "Discard Subsequent rules",
            options: stopRulesProcessing,
            error: "",
        },
        value: { value: "no", label: "No" },
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
        },
        listofcoupons: {
        elementType: "managecoupons",
        elementConfig: {
            type: "managecoupons",
            placeholder:
            "Manage Coupon Codes",
            error: "",
        },
        value: "",
        validation: {
            required: true,
        },
        hideLabel: false,
        valid: false,
        touched: false,
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
        if(isUpdated) {
            alert.success("Rule is updated successfully");
            dispatch(getCartRule(cartRuleId));
            dispatch(updateCartRuleReset());
            //navigate('/admin/catalog_rules');
        }
    }, [dispatch, isUpdated, alert, navigate, cartRuleId]);

    useEffect(() => {
        if(error) {
            alert.error(error.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, error]);

    useEffect(() => {
        if(updateError) {
            alert.error(updateError.error);
            dispatch(clearErrors());
        }
    }, [dispatch, alert, updateError]);

    useEffect(() => {
        if(loading) {
            return;
        }
        if(cartrule && cartrule._id !== cartRuleId) {
            dispatch(getCartRule(cartRuleId));
        }else {
            if (cartrule.couponcode) {
                const state = actioncontrol.getFormState();
                const cloneState = {...state};
                const insertIndex = 5;
                const objectToInsert = {
                    couponcode: {
                        elementType: "input",
                        elementConfig: {
                            type: "text",
                            placeholder: "Coupon Code",
                            error: "",
                        },
                        value: cartrule.couponcode,
                        validation: {
                            required: true,
                            isAlphaNumeric: true
                        },
                        hideLabel: false,
                        valid: false,
                        touched: false,
                    }
                };
                const targetArray = Object.entries(cloneState);
                targetArray.splice(insertIndex, 0, ...Object.entries(objectToInsert));
                const modifiedObject = Object.fromEntries(targetArray);
                actioncontrol.setNewFormState(modifiedObject);
                setFormState(modifiedObject);
            }
            !status && actioncontrol.setFormDataValues(cartrule, setStatus);
            !status && dispatch(setConditionObject(JSON.parse(cartrule['conditions_serialized'])));
        }
        dispatch(getAllCartRules());
    },[dispatch, cartrule, cartRuleId, actioncontrol, status, loading]);

    const updateSubmitHandler = (state) => {
        const myForm = new FormData();
        myForm.set("saveandapply", false);
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
        dispatch(updateCartRule({cartRuleData: myForm, cartRuleId}));
    }

    const saveAndApplySubmitHandler = (state) => {
        const myForm = new FormData();
        myForm.set("saveandapply", true);
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
        dispatch(updateCartRule({catalogRuleData: myForm, cartRuleId}));
    }
    
    const customCouponAction = (e, id) => {
        const state = actioncontrol.getFormState();
        const cloneState = {...state};
        const frmELement = cloneState[id];
        frmELement.value = e;
        cloneState[id] = frmELement;
        if(e.value === 2) {
            const insertIndex = 5;
            const objectToInsert = {
                couponcode: {
                    elementType: "input",
                    elementConfig: {
                        type: "text",
                        placeholder: "Coupon Code",
                        error: "",
                    },
                    value: "",
                    validation: {
                        required: true,
                        isAlphaNumeric: true
                    },
                    hideLabel: false,
                    valid: false,
                    touched: false,
                }
            };
            delete cloneState.listofcoupons;
            const targetArray = Object.entries(cloneState);
            targetArray.splice(insertIndex, 0, ...Object.entries(objectToInsert));
            const modifiedObject = Object.fromEntries(targetArray);
            actioncontrol.setNewFormState(modifiedObject);
            setFormState(modifiedObject);
        }

        if(e.value === 1) {
        delete cloneState.couponcode;
        const objectToInsert = {
            listofcoupons: {
            elementType: "managecoupons",
            elementConfig: {
                type: "managecoupons",
                placeholder:
                "Manage Coupon Codes",
                error: "",
            },
            value: "",
            validation: {
                required: false,
            },
            hideLabel: false,
            valid: false,
            touched: false,
            }
        };
        const targetArray = Object.entries(cloneState);
        targetArray.splice(11, 0, ...Object.entries(objectToInsert));
        const modifiedObject = Object.fromEntries(targetArray);
        actioncontrol.setNewFormState(modifiedObject);
        setFormState(modifiedObject);
        }
    }

    let formElementArray = useMemo(() => {
        const _formElementArray = [];
        const tempformElementArray = actioncontrol.getFormState();
        for (let key in tempformElementArray) {
        _formElementArray.push({
            id: key,
            config: tempformElementArray[key],
        });
        }
        return _formElementArray;
    }, [actioncontrol]);

    if (loading || updateLoading) {
        return <Loader />;
    }
    console.log("cartrule: ", cartrule);
    return (
        <FormContainer pagetitle={'Edit Cart Rule'}>
            <FormAction>
                <FormElement
                    formElementArray={formElementArray}
                    actioncontrol={actioncontrol}
                    customActions = {
                        [
                        {
                            key: "coupon",
                            action: (e, id) => customCouponAction(e, id)
                        }
                        ]
                    }
                    options={[
                        {
                        key: "simple_action",
                        option: simpleAction,
                        },
                        {
                        key: "stop_rules_processing",
                        option: stopRulesProcessing,
                        },
                        {
                        key: "coupon",
                        option: coupon
                        }
                    ]}
                    />
                <SubmitActionButton title={'Update Rule'} actions={(e) => actioncontrol.updateSubmitHandler(e, updateSubmitHandler)}>
                    <Button
                        type="submit"
                        onClick={(e) => actioncontrol.updateSubmitHandler(e, saveAndApplySubmitHandler)}>Save and Apply</Button>
                </SubmitActionButton>
            </FormAction>
        </FormContainer>
    );
};

export default EditCartRule;
