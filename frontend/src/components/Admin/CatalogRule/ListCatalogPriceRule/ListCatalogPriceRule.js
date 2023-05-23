import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import DataListing from "../../../../common/components/DataListing";
import AddNewItemAction from '../../../../common/components/AddNewItemAction';
import { FormContainer } from '../../../../common/components/FormContainer';

const ListCatalogPriceRule = () => {
    const alert = useAlert();
    const navigate = useNavigate();
    const deleteRuleHandler = (id) => {}
    const columns = [
        { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
        { field: "name", headerName: "Rule Name", minWidth: 200, flex: 1 },
        { field: "from_date", headerName: "Start", minWidth: 200, flex: 1 },
        { field: "to_date", headerName: "End", minWidth: 200, flex: 1 },
        { 
            field: "actions", 
            headerName: "Actions", 
            minWidth: 150, 
            flex: 0.3, 
            type: "number", 
            sortable: false,
            renderCell: (params) => {
                return (<>
                    <Link to = {`/admin/category/${params.row.id}`}><Edit /></Link>
                    <Button onClick={() => deleteRuleHandler(params.row.id)}><Delete /></Button>
                </>);
            }
        }
    ];
    const rows = [];

    return (<FormContainer pagetitle={"Catalog Price Rule"}>
        <AddNewItemAction actionUrl="/admin/catalog_rule/new" title={"Add New Rule"} />
        <DataListing columns={columns} rows={rows} />
    </FormContainer>)
}

export default ListCatalogPriceRule;
