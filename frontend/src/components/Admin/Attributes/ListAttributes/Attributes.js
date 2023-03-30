import React, { useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loader from '../../../layout/Loader/Loader';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useAlert } from "react-alert";
import { FormContainer } from "../../../../common/components/FormContainer";
import { DELETE_ATTRIBUTE_RESET } from '../../../../store/contants/attributeConstant';
import { getAllAttributes, deleteAttribute, clearErrors } from "../../../../store/actions/attributeAction";
import "./Attributes.css";

const Attributes = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, attributes } = useSelector( state => state.attributes);
    const { loading: loadingIsDelete, error: deleteError, isDeleted } = useSelector( state => state.deleteAttribute);

    useEffect(() => {
        dispatch(getAllAttributes());
    },[dispatch]);
    
    useEffect(() => {
        if(isDeleted) {
            alert.success("Attribute deleted successfully.");
            navigate("/admin/attributes");
            dispatch(getAllAttributes());
            dispatch({ type: DELETE_ATTRIBUTE_RESET });
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        if(error) {
            alert.error(error);
            dispatch(clearErrors());
        }
    },[alert, error, dispatch]);

    useEffect(() => {
        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    },[alert, deleteError, dispatch]);

    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "attribute_code", headerName: "Attribute Code", minWidth: 100, flex: 0.5 },
        { field: "frontend_label", headerName: "Attribute Name", minWidth: 100, flex: 1 },
        { field: "frontend_input", headerName: "Input Type", minWidth: 50, flex: 1 },
        { 
            field: "is_user_defined", 
            headerName: "User Defined", 
            minWidth: 50, 
            flex: 1,
            renderCell: (params) => {
                const value = params.getValue(params.id, "is_user_defined");
                return value === true ? "Yes" : "No";
            }
        },
        { 
            field: "is_required", 
            headerName: "Required", 
            minWidth: 50, 
            flex: 1,
            renderCell: (params) => {
                const value = params.getValue(params.id, "is_required");
                return value === 2 ? "Yes" : "No";
            } 
        },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 100, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                const value = params.getValue(params.id, "is_user_defined");
                return (<>
                    <Link to = {`/admin/attribute/${params.getValue(params.id, "id")}`}><Edit /></Link>
                    {value && <Button onClick={() => deleteAttributeHandler(params.getValue(params.id, "id"))}><Delete /></Button>}
                </>);
            }
        }
    ];

    const rows = [];
    attributes && attributes.forEach(attribute => {
        rows.push({
            id: attribute._id,
            attribute_code: attribute.attribute_code,
            frontend_label: attribute.frontend_label,
            frontend_input: attribute.frontend_input,
            is_required: attribute.is_required,
            is_user_defined: attribute.is_user_defined
        });
    });

    const deleteAttributeHandler = (attributeId) => {
        dispatch(deleteAttribute(attributeId));
    }

    return (<FormContainer pagetitle={"Attributes Listing"}>
        {loading || loadingIsDelete ? <Loader /> : <DataGrid 
            columns={columns} 
            rows={rows} 
            pageSize={10} 
            disableSelectionOnClick 
            className='productListTable'
            autoHeight
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
        />}
    </FormContainer>);
}

export default Attributes;
