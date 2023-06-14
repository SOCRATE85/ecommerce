import React, { useMemo, useEffect } from "react";
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import DataListing from "../../../../common/components/DataListing";
import AddNewItemAction from "../../../../common/components/AddNewItemAction";
import { FormContainer } from "../../../../common/components/FormContainer";
import { Loader } from "../../../layout";
import {
  clearErrors,
  getAllCatalogRules,
  deleteCatalogRule,
  deleteCatalogRuleReset
} from '../../../../store';

const ListCatalogPriceRule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const {catalogrules, error, loading} = useSelector(state => state.catalogrules);
  const {isDeleted, error: deleteError, loading: deleteLoading} = useSelector(state => state.deleteCatalogRule);
  const deleteRuleHandler = (id) => {
    dispatch(deleteCatalogRule(id));
  };
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
        return (
          <>
            <Link to={`/admin/catalog_rule/${params.row.id}`}><Edit /></Link>
            <Button onClick={() => deleteRuleHandler(params.row.id)}><Delete /></Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllCatalogRules());
  }, [dispatch]);

  useEffect(() => {
    if(error) {
      alert.error(error.error);
      dispatch(clearErrors);
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    if(deleteError) {
      alert.error(deleteError.error);
      dispatch(clearErrors);
    }
  }, [alert, dispatch, deleteError]);

  useEffect(() => {
    if(isDeleted) {
        alert.success("Rule is deleted successfully");
        dispatch(deleteCatalogRuleReset());
        dispatch(getAllCatalogRules());
        navigate('/admin/catalog_rules');
    }
  }, [dispatch, isDeleted, alert, navigate]);

  const catalogruleData = useMemo(() => {
    const rows = [];
    catalogrules && catalogrules.forEach(catalogrule => {
        rows.push({
            id: catalogrule._id,
            name: catalogrule.name,
            from_date: moment(catalogrule.from_date).format("LL"),
            to_date: moment(catalogrule.to_date).format("LL"),
            status: catalogrule.status
        });
    });
    return rows;
  }, [catalogrules]);
  
  if(loading || deleteLoading) {
    return (
      <Loader />
    );
  }
  
  return (
    <FormContainer pagetitle={"Catalog Price Rule"}>
      <AddNewItemAction
        actionUrl="/admin/catalog_rule/new"
        title={"Add New Rule"}
      />
      <DataListing columns={columns} rows={catalogruleData} />
    </FormContainer>
  );
};

export default ListCatalogPriceRule;
