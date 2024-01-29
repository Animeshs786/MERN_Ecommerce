import { useSelector } from "react-redux";

export const useCartSummary = () => {
  const cart = useSelector((state) => state.cart.cart);

  const cartItem = cart.length;
  let totalPrice = 0;
  let productQty = 0;

  if (cartItem > 0) {
    totalPrice = cart.reduce((accu, item) => {
      return accu + item.subTotal;
    }, 0);

    productQty = cart.reduce((accu, item) => accu + item.quantity, 0);
  }

  return { cartItem, totalPrice, productQty };
};
