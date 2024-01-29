import { useDispatch } from "react-redux";

import { currencyFormat } from "../utils/helper";
import styles from "./CartItems.module.css";
import Quantity from "./Quantity";
import { deleteCart } from "../features/cart/cartSlice";
import { IMAGE_PATH } from "../utils/constant";

function CartItems({ item }) {
  const dispatch = useDispatch();

  const cartDeleteHandler = () => {
    dispatch(deleteCart(item.productId));
  };
  
  return (
    <tr className={styles.cartItem}>
      <td className={styles.productImg}>
        <img
          src={`${IMAGE_PATH}/product/${item.image}`}
          alt="cpuImage"
        />
      </td>
      <td>
        <span>{item.name}</span>
      </td>
      <td>
        <h4>{currencyFormat(item.unitPrice)}</h4>
      </td>
      <td>
        <Quantity quantity={item.quantity} productId={item.productId} />
      </td>
      <td>
        <h4>{currencyFormat(item.subTotal)}</h4>
      </td>
      <td>
        <img
          onClick={cartDeleteHandler}
          src="/images/delete-icon.svg "
          alt="delete-icon"
        />
      </td>
    </tr>
  );
}

export default CartItems;
