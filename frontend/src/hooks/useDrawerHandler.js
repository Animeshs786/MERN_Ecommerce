import { useDispatch, useSelector } from "react-redux";
import { resetDrawer, setDrawerOpen } from "../features/modal/modalSlice";

export const useDrawerHandler = () => {
  const dispatch = useDispatch();
  const { drawerOpen, drawerList } = useSelector((state) => state.modal);

  return () => {
    if (drawerOpen && drawerList !== "navList") {
      dispatch(resetDrawer());
    } else {
      dispatch(setDrawerOpen(!drawerOpen));
    }
  };
};
