import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "../../common/hooks/use-alert";
import { clearErrors, fetchProducts } from "../../store";
import { FormContainer } from "../../common/components/FormContainer";
import Loader from "../layout/Loader/Loader";
import { getAllOrders } from "../../store/actions/orderAction";
import { getAllUsers } from "../../store/actions/userAction";
import "./Dashboard.css";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products, error, loading } = useSelector((state) => state.products);
  const { orders, loading: allOrdersLoading } = useSelector(
    (state) => state.allOrders
  );
  const { users, loading: allUsersLoading } = useSelector(
    (state) => state.allUsers
  );

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error("----" + error);
      dispatch(clearErrors());
    }
  }, [alert, error, dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  let outOfStock = 0;
  products &&
    products.forEach((product) => {
      if (product.stock === 0) {
        outOfStock += 1;
      }
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        id: 1,
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverbackgroundColor: ["rgb(197, 72, 40)"],
        data: [0, 400, 300, 1000],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverbackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

  return (
    <FormContainer pagetitle={"Dashboard"}>
      {loading || allOrdersLoading || allUsersLoading ? (
        <Loader />
      ) : (
        <>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ${totalAmount}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>
          <div className="lineChart">
            <Line datasetIdKey="id" data={lineState} />
          </div>
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </>
      )}
    </FormContainer>
  );
};

export default Dashboard;
