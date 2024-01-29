import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import MobileNavBar from "./MobileNavBar";
import NavBar from "./NavBar";
import ShopInformation from "./ShopInformation";
import CustomDrawer from "./CustomDrawer";
import { useActiveUser } from "../features/user/useActiveUser";
import { userLogin } from "../features/user/userSlice";
import Loader from "./Loader";
import Error from "./Error";

function Header() {
  const [isMobile] = useState(window.innerWidth <= 1000);

  const { isLoading, user, error } = useActiveUser();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token && user) {
      dispatch(userLogin(user));
    }
  }, [token, user, dispatch]);

  if (isLoading) return <Loader />;
  if (error) return <Error />;

  return (
    <header>
      <CustomDrawer />
      <ShopInformation />
      {isMobile ? <MobileNavBar /> : <NavBar />}
    </header>
  );
}

export default Header;
