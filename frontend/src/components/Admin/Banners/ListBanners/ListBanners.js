import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useAlert } from "../../../../common/hooks/use-alert";
import DataListing from "../../../../common/components/DataListing";
import {
  getAllBanner,
  clearErrors,
  deleteBanner,
  deleteBannerReset,
} from "../../../../store";
import AddNewItemAction from "../../../../common/components/AddNewItemAction";
import { FormContainer } from "../../../../common/components/FormContainer";
import Loader from "../../../layout/Loader/Loader";

const ListBanners = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { banners, loading, error } = useSelector((state) => state.banners);
  const { isDeleted } = useSelector((state) => state.deleteBanner);
  const alert = useAlert();

  useEffect(() => {
    if (isDeleted) {
      alert.success("Banner deleted successfully");
      navigate("/admin/banners");
      dispatch(getAllBanner());
      dispatch(deleteBannerReset());
    }
  }, [isDeleted, alert, dispatch, banners, navigate]);

  useEffect(() => {
    dispatch(getAllBanner());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error.error);
      dispatch(clearErrors);
    }
  }, [alert, dispatch, error]);

  const deleteBannerHandler = (id) => {
    dispatch(deleteBanner(id));
  };

  let columns = [
    { field: "id", headerName: "Id", flex: 1 },
    { field: "name", headerName: "Name", type: "number", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      renderCell: (params) => {
        return params.row.status === true ? "Enabled" : "Disabled";
      },
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "number",
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/banner/${params.row.id}`}>
              <Edit />
            </Link>
            <Button onClick={() => deleteBannerHandler(params.row.id)}>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  banners &&
    banners.forEach((banner) => {
      rows.push({
        id: banner._id,
        name: banner.name,
        status: banner.status,
      });
    });

  if (loading) {
    return <Loader />;
  }

  return (
    <FormContainer pagetitle={"Manage Banner"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <AddNewItemAction
            actionUrl="/admin/banner/new"
            title={"Add Banner"}
          />
          <DataListing columns={columns} rows={rows} />
        </>
      )}
    </FormContainer>
  );
};

export default ListBanners;
