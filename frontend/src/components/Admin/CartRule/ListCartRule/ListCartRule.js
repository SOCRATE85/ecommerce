import React, { useMemo, useEffect } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAlert } from "../../../../common/hooks/use-alert";
import DataListing from "../../../../common/components/DataListing";
import AddNewItemAction from "../../../../common/components/AddNewItemAction";
import { FormContainer } from "../../../../common/components/FormContainer";
import { Loader } from "../../../layout";
import {
  clearErrors,
  getAllCartRules,
  deleteCartRule,
  deleteCartRuleReset
} from "../../../../store";

const ListCartRule = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { cartrules, error, loading } = useSelector(state => state.cartRules);
  const {
    isDeleted,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteCartRule);

  const deleteRuleHandler = (id) => {
    dispatch(deleteCartRule(id));
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
            <Link to={`/admin/cartrule/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteRuleHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    dispatch(getAllCartRules());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors);
    }
  }, [alert, dispatch, error]);

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError.error);
      dispatch(clearErrors);
    }
  }, [alert, dispatch, deleteError]);

  useEffect(() => {
    if (isDeleted) {
      alert.success("Cart Rule is deleted successfully");
      dispatch(deleteCartRuleReset());
      dispatch(getAllCartRules());
      navigate("/admin/cartrules");
    }
  }, [dispatch, isDeleted, alert, navigate]);

  const cartruleData = useMemo(() => {
    const rows = [];
    cartrules &&
      cartrules.forEach((cartrule) => {
        rows.push({
          id: cartrule._id,
          name: cartrule.name,
          from_date: moment(cartrule.from_date).format("LL"),
          to_date: moment(cartrule.to_date).format("LL"),
          status: cartrule.status,
        });
      });
    return rows;
  }, [cartrules]);

  if (loading || deleteLoading) {
    return <Loader />;
  }

  return (
    <FormContainer pagetitle={"Cart Price Rule"}>
      <AddNewItemAction
        actionUrl="/admin/cartrule/new"
        title={"Add New Rule"}
      />
      <DataListing columns={columns} rows={cartruleData} />
    </FormContainer>
  );
};

export default ListCartRule;
