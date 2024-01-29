const initialState = {
  isOpen: false,
  drawerOpen: false,
  drawerDirection: "left",
  drawerList: "navList",
};

const modalReducer = (state = initialState, action) => {
  switch (action.type) {
    case "modal/setIsOpen":
      return { ...state, isOpen: action.payload };
    case "modal/setDrawerOpen":
      return { ...state, drawerOpen: action.payload };
    case "modal/setDrawerList":
      return { ...state, drawerList: action.payload };
    case "modal/setDrawerDirection":
      return { ...state, drawerDirection: action.payload };
    case "modal/resetDrawer":
      return { ...state, drawerDirection: "left", drawerList: "navList", drawerOpen:false };
    default:
      return state;
  }
};

export default modalReducer;

export const setIsOpen = (val) => {
  return { type: "modal/setIsOpen", payload: val };
};

export const setDrawerOpen = (val) => {
  return { type: "modal/setDrawerOpen", payload: val };
};

export const setDrawerList = (val) => {
  return { type: "modal/setDrawerList", payload: val };
};

export const setDrawerDirection = (val) => {
  return { type: "modal/setDrawerDirection", payload: val };
};

export const resetDrawer = () => {
  return { type: "modal/resetDrawer" };
};
