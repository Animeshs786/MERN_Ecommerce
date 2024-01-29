const initialState = {
  user: {},
  authenticate: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "user/userSignUp":
      return { ...state, user: action.payload, authenticate: true };
    case "user/userLogin":
      return { ...state, user: action.payload, authenticate: true };

    case "user/updateProfile":
      return { ...state, user: action.payload };

    case "user/updatePassword":
      return { ...state, authenticate:false};

    case "user/userLogout":
      return { ...initialState };

    default:
      return state;
  }
};

export default userReducer;

//action creater

export const userSignUP = (user) => {
  return { type: "user/userSignUP", payload: user };
};

export const userLogin = (user) => {
  return { type: "user/userLogin", payload: user };
};

export const updateProfile = (user) => {
  return { type: "user/updateProfile", payload: user };
};

export const updatePassword = () => {
  return { type: "user/updatePassword" };
};


export const userLogout = () => {
  return { type: "user/userLogout" };
};
