import {createSlice} from "@reduxjs/toolkit";
import {clearErrors}  from "../actions/clearformAction";
import {
    /*createCatalogRule,
    getAllCatalogRules,
    getCatalogRule,
    deleteCatalogRule,*/
    deleteRules,
    updateConditionTypeFlag,
    createCatalogRuleObject,
    updateCatalogRuleObject
} from '../actions/catalogRuleAction';

export const updateCatalogRuleObjectSlice = createSlice({
    name: "catalogrule",
    initialState: {
        conditionObject: [
            {
                level: 0,
                type: 'conditions_combinations',
                conditionType: 'all',
                conditionValue: true,
                conditionTypeFlag: false,
                conditionValueFlag: false,
                parent: null
            }
        ]
    },
    reducers: {},
    extraReducers: (builder) => {
        //delete rules
        builder.addCase(deleteRules.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteRules.fulfilled, (state, action) => {
            state.loading = false;
            state.conditionObject = state.conditionObject.filter(item => item.level < action.payload);
        });
        builder.addCase(deleteRules.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //create catalog rules
        builder.addCase(createCatalogRuleObject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCatalogRuleObject.fulfilled, (state, action) => {
            state.loading = false;
            state.conditionObject = [...state.conditionObject, action.payload];
        });
        builder.addCase(createCatalogRuleObject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //update catalog rules
        builder.addCase(updateCatalogRuleObject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCatalogRuleObject.fulfilled, (state, action) => {
            state.loading = false;
            const level = action.payload.level;
            const tempstate = [...state.conditionObject];
            const index = tempstate.findIndex(item => item.level === level);
            tempstate[index] = action.payload;
            state.conditionObject = tempstate;
        });
        builder.addCase(updateCatalogRuleObject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //update condition type flag
        builder.addCase(updateConditionTypeFlag.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateConditionTypeFlag.fulfilled, (state, action) => {
            state.loading = false;
            const level = action.payload.level;
            const tempstate = [...state.conditionObject];
            const index = tempstate.findIndex(item => item.level === level);
            tempstate[index] = action.payload;
            state.conditionObject = tempstate;
        });
        builder.addCase(updateConditionTypeFlag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //clear error
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
