import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./NavIcons.module.css";
import { useCartSummary } from "../hooks/useCartSummary";
import { IMAGE_PATH } from "../utils/constant";

function NavIcons({ showSearch, setShowSearch, isMobile = false }) {
  const { authenticate, user } = useSelector((state) => state.user);
  const { cartItem } = useCartSummary();

  function searchHandler() {
    setShowSearch((status) => !status);
  }

  return (
    <ul className={styles.navIcons}>
      {!isMobile && (
        <li onClick={searchHandler}>
          {!showSearch ? (
            <img src="/images/search-icon.svg" alt="search-icon" />
          ) : (
            <img src="/images/cross-icon.svg" alt="cross-icon" />
          )}
        </li>
      )}
      <li>
        <span
          className={`${isMobile ? styles.mobileCartItem : styles.cartItem}`}
        >
          {cartItem}
        </span>
        <Link to="/cart">
          {isMobile ? (
            <img src="/images/cart-icon1.svg" alt="cart-icon" />
          ) : (
            <img src="/images/cart-icon.svg" alt="cart-icon" />
          )}
        </Link>
      </li>
      {authenticate && (
        <li className={styles.profileContainer}>
          <Link to="/dashboard">
            <img src={`${IMAGE_PATH}/user/${user?.photo}`} alt="avatar" />
          </Link>
        </li>
      )}
    </ul>
  );
}

export default NavIcons;
