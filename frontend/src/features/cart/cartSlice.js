const initialState = {
  cart: getCartFromLocalStorage(),
};

function getCartFromLocalStorage() {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
}

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "cart/createCart":
      return { ...state, cart: [...state.cart, action.payload] };
    case "cart/deleteCart":
      return {
        ...state,
        cart: state.cart.filter((item) => item.productId !== action.payload),
      };
    case "cart/increaseQty":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? {
                ...item,
                quantity: item.quantity + 1,
                subTotal: (item.quantity + 1) * item.unitPrice,
              }
            : { ...item }
        ),
      };
    case "cart/decreaseQty":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.productId === action.payload
            ? {
                ...item,
                quantity: item.quantity - 1,
                subTotal: (item.quantity - 1) * item.unitPrice,
              }
            : { ...item }
        ),
      };
    case "cart/clearCart":
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default cartReducer;

//Action Creater
export const createCart = (cart) => {
  return { type: "cart/createCart", payload: cart };
};

export const deleteCart = (id) => {
  return { type: "cart/deleteCart", payload: id };
};

export const increaseQty = (id) => {
  return { type: "cart/increaseQty", payload: id };
};

export const decreaseQty = (id) => {
  return { type: "cart/decreaseQty", payload: id };
};

export const clearCart = () => {
  return { type: "cart/clearCart" };
};
