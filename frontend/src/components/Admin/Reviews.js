import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import {
  getAllReviews,
  clearErrors,
  deleteReview,
} from "../../store/actions/productAction";
import { useNavigate } from "react-router-dom";
import { FormContainer } from "../../common/components/FormContainer";
import Loader from "../layout/Loader/Loader";
import { Delete, Star } from "@mui/icons-material";

import "./Reviews.css";
import { Button } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../store/contants/productConstant";

const Reviews = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const { reviews, error, loading } = useSelector((state) => state.allReviews);
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const columns = [
    { field: "id", headerName: "ID", minWidth: 200, flex: 0.5 },
    { field: "name", headerName: "User", minWidth: 200, flex: 1 },
    { field: "comment", headerName: "Comment", minWidth: 200, flex: 1 },
    {
      field: "rating",
      headerName: "Rating",
      minWidth: 200,
      flex: 1,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
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
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }>
              <Delete />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((review) => {
      rows.push({
        id: review._id,
        name: review.name,
        comment: review.comment,
        rating: review.rating,
      });
    });

  const deleteReviewHandler = (id) => {
    dispatch(deleteReview(id, productId));
  };

  useEffect(() => {
    if (isDeleted) {
      alert.success("Review deleted successfully.");
      navigate("/admin/reviews");
      dispatch(getAllReviews(productId));
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [alert, isDeleted, dispatch, navigate, productId]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  useEffect(() => {
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearErrors());
    }
  }, [alert, deleteError, dispatch]);

  useEffect(() => {
    if(productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
  },[dispatch, productId]);

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  return (<FormContainer pagetitle={"Admin Reviews Listing"}>
          {loading ? <Loader /> : <>
            <form
              className="productReviewsForm"
              onSubmit={productReviewsSubmitHandler}>
              <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>
              <div>
                <Star />
                <input
                  type="text"
                  placeholder="Product Id"
                  required
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                />
              </div>

              <Button
                id="createProductBtn"
                type="submit"
                disabled={
                  loading ? true : false || productId === "" ? true : false
                }>
                Search
              </Button>
            </form>

            {reviews && reviews.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                disableSelectionOnClick
                className="productListTable"
                autoHeight
              />
            ) : (
              <h1 className="productReviewsFormHeading">No Reviews Found</h1>
            )}
          </>}
    </FormContainer>
  );
};

export default Reviews;
