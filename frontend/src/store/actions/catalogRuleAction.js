import axios from 'axios';
import { thunkError } from './clearformAction';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createCatalogRule = createAsyncThunk("catalogrule/createCatalogRule", async (catalogRuleData, thunkAPI) => {
    try {
        const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.post(`/api/v1/admin/catalog_rule/new`, catalogRuleData, config);
            return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCatalogRule = createAsyncThunk("catalogrule/updateCatalogRule", async ({catalogRuleData, catalogRuleId}, thunkAPI) => {
    try {
        const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            };
            const { data } = await axios.put(`/api/v1/admin/catalog_rule/${catalogRuleId}`, catalogRuleData, config);
            return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getAllCatalogRules = createAsyncThunk("catalogrule/getAllCatalogRules", async(_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/catalog_rules`);
        return data.catalogrules;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getCatalogRule = createAsyncThunk("catalogrule/getCatalogRule", async(catalogruleId, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/catalog_rule/${catalogruleId}`);
        return data.catalogrule;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteCatalogRule = createAsyncThunk("catalogrule/deleteCatalogRule", async (catalogruleId, thunkAPI) => {
    try {
        const { data } = await axios.delete(`/api/v1/admin/catalog_rule/${catalogruleId}`);
        return data.success;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const loadDefaultOption = createAsyncThunk("catalogrule/loadDefaultOption", async(_, thunkAPI) => {
    try {
        
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const deleteRules = createAsyncThunk("catalogrule/deleteRules", async (level, thunkAPI) => {
    try {
        return level;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateConditionTypeFlag = createAsyncThunk("catalogrule/conditionTypeFlag", async (catalogObject, thunkAPI) => {
    try {
        return catalogObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateConditionValueFlag = createAsyncThunk("catalogrule/updateConditionValueFlag", async (catalogObject, thunkAPI) => {
    try {
        return catalogObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const createCatalogRuleObject = createAsyncThunk("catalogrule/createCatalogRuleObject", async (catalogObject, thunkAPI) => {
    try {
        switch(catalogObject.type) {
            case "conditions_combinations":
                return {
                    level: catalogObject.level,
                    type: "conditions_combinations",
                    conditionType: 'all',
                    conditionValue: true,
                    conditionTypeFlag: false,
                    conditionValueFlag: false,
                    parent: catalogObject.parent
                }
            case "attribute_set":
                return {
                    level: catalogObject.level,
                    type: "attribute_set",
                    open: catalogObject.open,
                    attributeset: catalogObject.attributeset,
                    parent: catalogObject.parent
                }
            case "category":
                return {
                    level: catalogObject.level,
                    type: "category",
                    open: catalogObject.open,
                    category: catalogObject.category,
                    parent: catalogObject.parent
                }
            case "productid":
                return {
                    level: catalogObject.level,
                    type: "productid",
                    open: catalogObject.open,
                    product: catalogObject.product,
                    parent: catalogObject.parent
                }
            default:
                return {
                    level: catalogObject.level,
                    type: catalogObject.type,
                    conditionType: 'all',
                    conditionValue: true,
                    conditionTypeFlag: false,
                    conditionValueFlag: false,
                    parent: catalogObject.parent
                }
        };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCatalogRuleObject = createAsyncThunk("catalogrule/updateCatalogRuleObject", async (catalogObject, thunkAPI) => {
    try {
        switch(catalogObject.type) {
                case "conditions_combinations":
                    return {
                        level: catalogObject.level,
                        type: catalogObject.type,
                        conditionType: catalogObject.conditionType,
                        conditionValue: catalogObject.conditionValue,
                        conditionTypeFlag: catalogObject.conditionTypeFlag,
                        conditionValueFlag: catalogObject.conditionValueFlag,
                        parent: catalogObject.parent
                    }
                case "attribute_set":
                    return {
                        level: catalogObject.level,
                        type: catalogObject.type,
                        open: catalogObject.open,
                        attributeset: catalogObject.attributeset,
                        parent: catalogObject.parent
                    }
                case "category":
                    return {
                        level: catalogObject.level,
                        type: catalogObject.type,
                        category: catalogObject.category,
                        parent: catalogObject.parent
                    }
                case "productid":
                    return {
                        level: catalogObject.level,
                        type: catalogObject.type,
                        product: catalogObject.product,
                        parent: catalogObject.parent
                    }
                default:
                    return {
                        level: catalogObject.level,
                        type: catalogObject.type,
                        conditionType: 'all',
                        conditionValue: true,
                        conditionTypeFlag: false,
                        conditionValueFlag: false,
                        parent: catalogObject.parent
                    }
            };
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const setConditionObject = createAsyncThunk("catalogrule/setConditionObject", async (catalogObject, thunkAPI) => {
    try {
        return catalogObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});