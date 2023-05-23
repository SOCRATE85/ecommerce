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

export const getAllCatalogRules = createAsyncThunk("catalogrule/getAllCatalogRules", async(_, thunkAPI) => {
    try {
        const { data } = await axios.get(`/api/v1/admin/catalog_rules`);
        return data.catalogrules;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const getCatalogRule = createAsyncThunk("catalogrule/getAllCatalogRules", async(catalogruleId, thunkAPI) => {
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
        return data;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});

export const updateCatalogRuleObject = createAsyncThunk("catalogrule/updateCatalogRuleObject", async (catalogObject, thunkAPI) => {
    try {
        console.log('catalogObject: ', catalogObject);
        return catalogObject;
    } catch (error) {
        return thunkError(error, thunkAPI);
    }
});
