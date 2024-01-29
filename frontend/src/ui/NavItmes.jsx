import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./NavItmes.module.css";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import NavIcons from "./NavIcons";
import SearchBar from "./SearchBar";
import { productSearch } from "../features/product/productSlice";

function NavItmes() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!searchParams.get("search")) {
      dispatch(productSearch(""));
    }
  }, [dispatch, searchParams]);

  return (
    <div className={`container ${styles.navBar}`}>
      <Logo />
      {showSearch ? <SearchBar /> : <NavLinks />}
      <NavIcons showSearch={showSearch} setShowSearch={setShowSearch} />
    </div>
  );
}

export default NavItmes;
