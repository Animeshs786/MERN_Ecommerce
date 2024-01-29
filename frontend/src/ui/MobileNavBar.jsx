import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useDrawerHandler } from "../hooks/useDrawerHandler";
import { useSearchHandler } from "../hooks/useSearchHandler";
import styles from "./MobileNavBar.module.css";
import NavIcons from "./NavIcons";
import { productSearch } from "../features/product/productSlice";

function MobileNavBar() {
  const { search, submitHandler, setSearch } = useSearchHandler();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("search")) {
      dispatch(productSearch(""));
    }
  }, [dispatch, searchParams]);

  return (
    <nav className={styles.navContainer}>
      <img src="/images/logo-icon.svg" alt="logo-icon" />
      <div className={`${styles.navList} container`}>
        <div>
          <img
            onClick={useDrawerHandler()}
            src="/images/nav-icon.svg"
            alt="nav-icon"
          />
        </div>
        <div>
          <img src="/images/search-icon1.svg" alt="search-icon" />
          <form onSubmit={submitHandler}>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              placeholder="Search here"
            />
          </form>
        </div>
        <NavIcons isMobile={true} />
      </div>
    </nav>
  );
}

export default MobileNavBar;
