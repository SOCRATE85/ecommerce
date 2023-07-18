import axios from 'axios';
import { thunkError } from './clearformAction';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCartRule = createAsyncThunk("cartrule/createCartRule", async (cartRuleData, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.post(`/api/v1/admin/cartrule/new`, cartRuleData, config);
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCartRule = createAsyncThunk("cartrule/updateCartRule", async ({cartRuleData, cartRuleId}, thunkAPI) => {
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        };
        const { data } = await axios.put(`/api/v1/admin/cartrule/${cartRuleId}`, cartRuleData, config);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllCartRules = createAsyncThunk("cartrule/getAllCartRules", async(_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/cartrules`);
        return data.cartrules;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getCartRule = createAsyncThunk("cartrule/getCartRule", async(cartruleId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/cartrule/${cartruleId}`);
        return data.cartrule;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteCartRule = createAsyncThunk("cartrule/deleteCartRule", async (cartruleId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/cartrule/${cartruleId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteCartRules = createAsyncThunk("cartrule/deleteCartRules", async (level, thunkAPI) => {
    try {
        return level;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCartConditionTypeFlag = createAsyncThunk("cartrule/updateCartConditionTypeFlag", async (cartObject, thunkAPI) => {
    try {
        return cartObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

/*
export const updateCartConditionValueFlag = createAsyncThunk("cartrule/updateCartConditionValueFlag", async (cartObject, thunkAPI) => {
    try {
        return cartObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
*/

export const createCartRuleObject = createAsyncThunk("cartrule/createCartRuleObject", async (cartObject, thunkAPI) => {
    try {
        switch(cartObject.type) {
            case "conditions_combinations":
                return {
                    level: cartObject.level,
                    type: "conditions_combinations",
                    conditionType: 'all',
                    conditionValue: true,
                    conditionTypeFlag: false,
                    conditionValueFlag: false,
                    parent: cartObject.parent
                }
            case "attribute_set":
                return {
                    level: cartObject.level,
                    type: "attribute_set",
                    open: cartObject.open,
                    attributeset: cartObject.attributeset,
                    parent: cartObject.parent
                }
            case "category":
                return {
                    level: cartObject.level,
                    type: "category",
                    open: cartObject.open,
                    category: cartObject.category,
                    parent: cartObject.parent
                }
            case "productid":
                return {
                    level: cartObject.level,
                    type: "productid",
                    open: cartObject.open,
                    product: cartObject.product,
                    parent: cartObject.parent
                }
            default:
                return {
                    level: cartObject.level,
                    type: cartObject.type,
                    conditionType: 'all',
                    conditionValue: true,
                    conditionTypeFlag: false,
                    conditionValueFlag: false,
                    parent: cartObject.parent
                }
        };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCartRuleObject = createAsyncThunk("cartrule/updateCartRuleObject", async (cartObject, thunkAPI) => {
    try {
        switch(cartObject.type) {
                case "conditions_combinations":
                    return {
                        level: cartObject.level,
                        type: cartObject.type,
                        conditionType: cartObject.conditionType,
                        conditionValue: cartObject.conditionValue,
                        conditionTypeFlag: cartObject.conditionTypeFlag,
                        conditionValueFlag: cartObject.conditionValueFlag,
                        parent: cartObject.parent
                    }
                case "attribute_set":
                    return {
                        level: cartObject.level,
                        type: cartObject.type,
                        open: cartObject.open,
                        attributeset: cartObject.attributeset,
                        parent: cartObject.parent
                    }
                case "category":
                    return {
                        level: cartObject.level,
                        type: cartObject.type,
                        category: cartObject.category,
                        parent: cartObject.parent
                    }
                case "productid":
                    return {
                        level: cartObject.level,
                        type: cartObject.type,
                        product: cartObject.product,
                        parent: cartObject.parent
                    }
                default:
                    return {
                        level: cartObject.level,
                        type: cartObject.type,
                        conditionType: 'all',
                        conditionValue: true,
                        conditionTypeFlag: false,
                        conditionValueFlag: false,
                        parent: cartObject.parent
                    }
            };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const setCartConditionObject = createAsyncThunk("cartrule/setCartConditionObject", async (cartObject, thunkAPI) => {
    try {
        return cartObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
