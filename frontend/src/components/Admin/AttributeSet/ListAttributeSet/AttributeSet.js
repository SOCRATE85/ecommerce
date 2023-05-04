import React, { useEffect } from "react";
import { Button } from "@mui/material";
import { Edit, Delete } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from "react-alert";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from '../../../layout/Loader/Loader';
import DataListing from "../../../../common/components/DataListing";
import AddNewItemAction from '../../../../common/components/AddNewItemAction';
import {
    getAttributeSets,
    deleteAttributeSet,
    clearErrors,
    deleteAttributeSetReset
} from '../../../../store';

const AttributeSet = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, attributesets} = useSelector(state => state.attributesets);
    const {loading: deleteLoading, isDeleted, error: deleteError} = useSelector(state => state.deleteAttributeset);

    useEffect(() => {
        dispatch(getAttributeSets());
    }, [dispatch]);

    useEffect(() => {
        if(isDeleted) {
            alert.error("Attribute set deleted successfully.");
            navigate("/admin/attributesets");
            dispatch(getAttributeSets());
            dispatch(deleteAttributeSetReset());
        }
    },[alert, isDeleted, dispatch, navigate]);

    useEffect(() => {
        if(deleteError) {
            alert.error(deleteError);
            dispatch(clearErrors());
        }
    }, [dispatch, deleteError, alert]);

    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 1 },
        { field: "attribute_set_name", headerName: "Attribute Set", minWidth: 200, flex: 1 },
        { 
            field: 'products', 
            headerName: "Products", 
            minWidth: 100, 
            flex: 1,
            renderCell: (params) => {
                return <>{params.row.products.length}</>;
            }
        },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                const num = params.row.products.length;
                if(num > 0) {
                    return (
                        <>
                            <Link to = {`/admin/attributeset/${params.row.id}`}><Edit /></Link>
                            {params.row.attribute_set_name === "Default" ? <div className="empty">&nbsp;</div> : <Button><Delete /></Button>}
                        </>
                    );
                } else {
                    return (
                        <>
                            <Link to = {`/admin/attributeset/${params.row.id}`}><Edit /></Link>
                            {params.row.attribute_set_name === "Default" ? <div className="empty">&nbsp;</div> : <Button onClick={() => deleteAttributesetHandler(params.row.id)}><Delete /></Button>}
                        </>
                    );
                }
            }
        }
    ];

    const rows = [];

    const deleteAttributesetHandler = (attributesetId) => {
        dispatch(deleteAttributeSet(attributesetId));
    }

    attributesets && attributesets.forEach(attributeset => {
        rows.push({
            id: attributeset._id,
            attribute_set_name: attributeset.attribute_set_name,
            products: attributeset.products
        });
    });

    return (<FormContainer pagetitle={"Manage Attribute sets"}>
        {loading || deleteLoading ? <Loader/> : <>
            <AddNewItemAction actionUrl="/admin/attributeset/new" title={"Add Attribute Set"} />
            <DataListing columns={columns} rows={rows} />
        </>}
    </FormContainer>);
}

export default AttributeSet;
