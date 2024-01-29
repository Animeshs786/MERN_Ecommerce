import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import MobileNavItem from "./MobileNavItem";
import { useDrawerHandler } from "../hooks/useDrawerHandler";
import Filter from "./Filter";

export default function CustomDrawer() {
  const { drawerOpen, drawerList, drawerDirection } = useSelector(
    (state) => state.modal
  );

  const list = () => (
    <Box sx={{ width: "355px" }} role="presentation">
      {drawerList === "navList" && <MobileNavItem />}
      {drawerList === "filterList" && <Filter />}
    </Box>
  );

  return (
    <div>
      <>
        <Drawer
          anchor={drawerDirection}
          open={drawerOpen}
          onClose={useDrawerHandler()}
        >
          {list()}
        </Drawer>
      </>
    </div>
  );
}
