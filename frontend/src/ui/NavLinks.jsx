import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./NavLinks.module.css";
import { useLogout } from "../features/user/useLogout";
import Loader from "./Loader";

function NavLinks({ setDrawer }) {
  const { logout, isLogout } = useLogout();

  const { authenticate } = useSelector((state) => state.user);

  const logoutHandler = () => {
    logout();
    if (setDrawer) setDrawer();
  };

  if (isLogout) return <Loader />;

  return (
    <ul className={styles.navLinks}>
      <NavLink to="/product">
        <li onClick={setDrawer && (() => setDrawer())} className={styles.items}>
          Home
        </li>
      </NavLink>

      <NavLink to="/product">
        <li onClick={setDrawer && (() => setDrawer())} className={styles.items}>
          Product
        </li>
      </NavLink>

      <NavLink to="/cart">
        <li onClick={setDrawer && (() => setDrawer())} className={styles.items}>
          Cart
        </li>
      </NavLink>

      <li onClick={setDrawer && (() => setDrawer())} className={styles.items}>
        About Us
      </li>
      <li onClick={setDrawer && (() => setDrawer())} className={styles.items}>
        Contact Us
      </li>
      <li className={styles.items} onClick={setDrawer && (() => setDrawer())}>
        Repairs
      </li>

      {authenticate ? (
        <>
          <NavLink to="/dashboard">
            <li
              onClick={setDrawer && (() => setDrawer())}
              className={styles.items}
            >
              Dashboard
            </li>
          </NavLink>
          <li onClick={logoutHandler} className={styles.items}>
            Logout
          </li>
        </>
      ) : (
        <>
          <NavLink to="/register">
            <li
              onClick={setDrawer && (() => setDrawer())}
              className={styles.items}
            >
              Sign Up
            </li>
          </NavLink>
          <NavLink to="/login">
            <li
              onClick={setDrawer && (() => setDrawer())}
              className={styles.items}
            >
              Login
            </li>
          </NavLink>
        </>
      )}

      <li>
        <button onClick={setDrawer && (() => setDrawer())}>Our Deals</button>
      </li>
    </ul>
  );
}

export default NavLinks;
