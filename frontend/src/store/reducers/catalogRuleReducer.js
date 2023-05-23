import {createSlice} from "@reduxjs/toolkit";
import {clearErrors}  from "../actions/clearformAction";
import {
    /*createCatalogRule,
    getAllCatalogRules,
    getCatalogRule,
    deleteCatalogRule,*/
    updateCatalogRuleObject
} from '../actions/catalogRuleAction';

export const updateCatalogRuleObjectSlice = createSlice({
    name: "catalogrule",
    initialState: {
        conditionObject: {
            lavel: 0,
            type: 'conditions_combinations',
            conditionType: 'all',
            conditionValue: true,
            conditionTypeFlag: false,
            conditionValueFlag: false,
            conditions: null
        }
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(updateCatalogRuleObject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCatalogRuleObject.fulfilled, (state, action) => {
            state.loading = false;
            //const temp = {...state};
            switch(action.payload) {
                case "conditions_combinations":

                break;
                case "attribute_set":

                break; 
                case "category":

                break;
                case "productid":

                break;
                default:

                break;
            }
            state.conditionObject = action.payload;
        });
        builder.addCase(updateCatalogRuleObject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});
