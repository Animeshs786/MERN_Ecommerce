import { useDrawerHandler } from "../hooks/useDrawerHandler";
import styles from "./MobileNavItem.module.css";
import NavLinks from "./NavLinks";

function MobileNavItem() {
  return (
    <div className={styles.navItemWrapper}>
      <header>
        <img src="/images/logo.svg" alt="logo" />
        <img
          onClick={useDrawerHandler()}
          src="/images/cross-icon1.svg"
          alt="cross-icon"
        />
      </header>
      <NavLinks setDrawer={useDrawerHandler()} />
    </div>
  );
}

export default MobileNavItem;
