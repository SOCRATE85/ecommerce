import {createSlice} from "@reduxjs/toolkit";
import {
    createCartRule,
    updateCartRule,
    getAllCartRules,
    getCartRule,
    deleteCartRule,
    deleteCartRules,
    createCartRuleObject,
    updateCartRuleObject,
    updateCartConditionTypeFlag,
    setCartConditionObject
} from '../actions/cartRuleAction';
import {clearErrors}  from "../actions/clearformAction";

export const createCartRuleSlice = createSlice({
    name: "cartrule",
    initialState: {
        cartrule: {}
    },
    reducers: {
        createCartRuleReset: (state) => {
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createCartRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCartRule.fulfilled, (state, action) => {
            state.loading = false;
            state.cartrule = action.payload.cartrule;
            state.success = action.payload.success;
        });
        builder.addCase(createCartRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateCartRuleSlice = createSlice({
    name: "cartrule",
    initialState: {},
    reducers: {
        updateCartRuleReset: (state) => {
            state.loading = false;
            state.isUpdated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(updateCartRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCartRule.fulfilled, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        });
        builder.addCase(updateCartRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const getAllCartRulesSlice = createSlice({
    name: "cartrule",
    initialState: {
        cartrules: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCartRules.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllCartRules.fulfilled, (state, action) => {
            state.loading = false;
            state.cartrules = action.payload;
        });
        builder.addCase(getAllCartRules.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const getCartRuleSlice = createSlice({
    name: "cartrule",
    initialState: {
        cartrule: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCartRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCartRule.fulfilled, (state, action) => {
            state.loading = false;
            state.cartrule = action.payload;
        });
        builder.addCase(getCartRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const deleteCartRuleSlice = createSlice({
    name: "cartrule",
    initialState: {},
    reducers: {
        deleteCartRuleReset: (state) => {
            state.loading = false;
            state.isDeleted = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(deleteCartRule.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCartRule.fulfilled, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload;
        });
        builder.addCase(deleteCartRule.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});

export const updateCartRuleObjectSlice = createSlice({
    name: "cartrule",
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
        builder.addCase(deleteCartRules.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteCartRules.fulfilled, (state, action) => {
            state.loading = false;
            state.conditionObject = state.conditionObject.filter(item => item.level < action.payload);
        });
        builder.addCase(deleteCartRules.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //create catalog rules
        builder.addCase(createCartRuleObject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createCartRuleObject.fulfilled, (state, action) => {
            state.loading = false;
            state.conditionObject = [...state.conditionObject, action.payload];
        });
        builder.addCase(createCartRuleObject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //update catalog rules
        builder.addCase(updateCartRuleObject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCartRuleObject.fulfilled, (state, action) => {
            state.loading = false;
            const level = action.payload.level;
            const tempstate = [...state.conditionObject];
            const index = tempstate.findIndex(item => item.level === level);
            tempstate[index] = action.payload;
            state.conditionObject = tempstate;
        });
        builder.addCase(updateCartRuleObject.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        //update condition type flag
        builder.addCase(updateCartConditionTypeFlag.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateCartConditionTypeFlag.fulfilled, (state, action) => {
            state.loading = false;
            const level = action.payload.level;
            const tempstate = [...state.conditionObject];
            const index = tempstate.findIndex(item => item.level === level);
            tempstate[index] = action.payload;
            state.conditionObject = tempstate;
        });
        builder.addCase(updateCartConditionTypeFlag.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(setCartConditionObject.fulfilled, (state, action) => {
            state.conditionObject = action.payload
        });
        
        //clear error
        builder.addCase(clearErrors, (state) => {
            state.loading = false;
            state.error = null;
        });
    }
});