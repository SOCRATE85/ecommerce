import {createSlice} from "@reduxjs/toolkit";
import {clearErrors}  from "../actions/clearformAction";
import {
    createCatalogRule,
    updateCatalogRule,
    getAllCatalogRules,
    getCatalogRule,
    deleteCatalogRule,
    deleteRules,
    updateConditionTypeFlag,
    createCatalogRuleObject,
    updateCatalogRuleObject,
    setConditionObject
} from '../actions/catalogRuleAction';

export const deleteCatalogRuleSlice = createSlice({
    name: "catalogrule",
    initialState: {},
    reducers: {
        deleteCatalogRuleReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCatalogRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCatalogRule.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteCatalogRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const getAllCatalogRulesSlice = createSlice({
    name: "catalogrule",
    initialState: {
        catalogrules: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCatalogRules.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCatalogRules.fulfilled, (state, action) => {
            state.loading = false;
            state.catalogrules = action.payload;
        });
        builder.addCase(getAllCatalogRules.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const getCatalogRuleSlice = createSlice({
    name: "catalogrule",
    initialState: { catalogrule: {} },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCatalogRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCatalogRule.fulfilled, (state, action) => {
            state.loading = false;
            state.catalogrule = action.payload;
        });
        builder.addCase(getCatalogRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const createCatalogRuleSlice = createSlice({
    name: "catalogrule",
    initialState: {
        catalogrule: {}
    },
    reducers: {
        createCatalogRuleReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCatalogRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCatalogRule.fulfilled, (state, action) => {
            state.loading = false;
            state.catalogrule = action.payload.catalogrule;
            state.success = action.payload.success;
        });
        builder.addCase(createCatalogRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateCatalogRuleSlice = createSlice({
    name: "catalogrule",
    initialState: {
        catalogrule: {}
    },
    reducers: {
        updateCatalogRuleReset: (state) => {
            state.loading = false;
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCatalogRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCatalogRule.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateCatalogRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

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

        builder.addCase(setConditionObject.fulfilled, (state, action) => {
            state.conditionObject = action.payload
        });
        
        //clear error
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

