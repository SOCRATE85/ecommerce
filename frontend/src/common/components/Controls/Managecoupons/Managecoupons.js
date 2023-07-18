import React, { useState, useMemo } from "react";
import FormElement from "../../FormElement/FormElement";
import ActionControl from "../../../ActionControl";
import { Button } from "@mui/material";
import DataListing from "../../DataListing/DataListing";

const Managecoupons = ({ cartRuleId }) => {
    const [formState, setFormState] = useState({
        qty: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Coupon Qty",
                error: "",
                disabled: cartRuleId ? false : true,
            },
            value: "",
            validation: {
                required: true,
            },
            hideLabel: false,
            valid: false,
            touched: false,
        },
        length: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Code Length",
                error: "",
                comment: "Excluding prefix, suffix and separators.",
                disabled: cartRuleId ? false : true,
            },
            value: 12,
            validation: {
                required: true,
            },
            hideLabel: false,
            valid: false,
            touched: false,
        },
        formate: {
            elementType: "select",
            elementConfig: {
                type: "select",
                placeholder: "Code Formate",
                error: "",
                options: [
                    { value: 1, label: "Alphanumeric" },
                    { value: 2, label: "Alphabate" },
                    { value: 3, label: "Numeric" },
                ],
                disabled: cartRuleId ? false : true,
            },
            value: { value: 1, label: "Alphanumeric" },
            validation: {
                required: true,
            },
            hideLabel: false,
            valid: false,
            touched: false,
        },
        prefix: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Code Prefix",
                error: "",
                disabled: cartRuleId ? false : true,
            },
            value: "",
            validation: {
                required: false,
            },
            hideLabel: false,
            valid: false,
            touched: false,
        },
        suffix: {
            elementType: "input",
            elementConfig: {
                type: "text",
                placeholder: "Code Suffix",
                error: "",
                disabled: cartRuleId ? false : true,
            },
            value: "",
            validation: {
                required: false,
            },
            hideLabel: false,
            valid: false,
            touched: false
        },
        dashaftercharacter: {
            elementType: "input",
            elementConfig: {
                type: "number",
                placeholder: "Dash Every X Characters",
                error: "",
                comment: "If empty no sepation.",
                disabled: cartRuleId ? false : true,
            },
            value: "",
            validation: {
                required: false,
            },
            hideLabel: false,
            valid: false,
            touched: false,
        }
    });

    const actioncontrol = useMemo(() => {
        return new ActionControl({formState, setFormState})
    }, [formState, setFormState]);

    let formElementArray = useMemo(() => {
        const _formElementArray = [];
        for (let key in formState) {
        _formElementArray.push({
            id: key,
            config: formState[key],
        });
        }
        return _formElementArray;
    }, [formState]);
    
    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "code", headerName: "Coupon Code", minWidth: 200, flex: 1 },
        { field: "expiration_date", headerName: "Expiration Date", minWidth: 200, flex: 1 },
        { field: "created_at", headerName: "Created", minWidth: 200, flex: 1 },
        { field: "times_used", headerName: "Times Used", minWidth: 200, flex: 1 },
    ];

    const rows =[];

    return <>{cartRuleId}
        <FormElement
          formElementArray={formElementArray}
          actioncontrol={actioncontrol}
        />
        <DataListing columns={columns} rows={rows} />
        <Button disabled={cartRuleId ? false : true} variant="secondary" type="button" onClick={(() => {})}>Generate</Button>
    </>
}

export default Managecoupons;
