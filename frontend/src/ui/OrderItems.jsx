import { IMAGE_PATH } from "../utils/constant";
import { currencyFormat } from "../utils/helper";
import styles from "./OrderItems.module.css";

function OrderItems({ item }) {
  return (
    <tr className={styles.orderItem}>
      <td className={styles.productImg}>
        <img src={`${IMAGE_PATH}/product/${item.image}`} alt="cpuImage" />
      </td>
      <td>
        <span>{item.name}</span>
      </td>
      <td>
        <h4>{currencyFormat(item.unitPrice)}</h4>
      </td>
      <td>
        <span className={styles.qty}>{item.quantity}</span>
      </td>
      <td>
        <h4>{currencyFormat(item.subTotal)}</h4>
      </td>
    </tr>
  );
}

export default OrderItems;
