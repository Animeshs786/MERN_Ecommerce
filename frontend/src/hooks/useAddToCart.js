import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { createCart } from "../features/cart/cartSlice";

export const useAddtoCart = (product, quantity = 1) => {
  const dispatch = useDispatch();
  const productPrice = product?.price - product?.discount;
  const inCart = useSelector((state) => state.cart.cart);

  return () => {
    if (inCart.length > 0) {
      const isExist = inCart.some((item) => item.productId === product.id);

      //check product already in cart or not
      if (isExist) {
        toast.error("Product is already in the cart.");
        return;
      }
    }

    const cart = {
      productId: product.id,
      unitPrice: productPrice,
      image: product.thumbImage,
      name: product.description,
      quantity,
      subTotal: productPrice * quantity,
    };

    //store in cart
    dispatch(createCart(cart));

    toast.success("Product added to the cart successfully.");
  };
};
