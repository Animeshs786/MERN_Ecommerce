import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import styles from "./Dashboard.module.css";
import Support from "../ui/Support";

function Dashboard() {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="container">
        <BreadCrumbs link="My Dashboard" />
        <Heading heading="My Dashboard" />
        <div className={styles.dashboardWrapper}>
          <div className={styles.tabWrapper}>
            <ul>
              <NavLink to="profile">
                <li>Account Information</li>
              </NavLink>
              <NavLink to="myOrder">
                <li>My Order</li>
              </NavLink>
              {user?.role === "admin" && (
                <>
                  <NavLink to="order">
                    <li> Order</li>
                  </NavLink>
                  <NavLink to="product">
                    <li>Product</li>
                  </NavLink>
                  <NavLink to="user">
                    <li>User</li>
                  </NavLink>
                  <NavLink to="category">
                    <li>Category</li>
                  </NavLink>
                </>
              )}
            </ul>
          </div>
          <div className={styles.contentWrapper}>
            <Outlet />
          </div>
        </div>
      </div>

      <Support marginTop="60px" />
    </>
  );
}

export default Dashboard;
