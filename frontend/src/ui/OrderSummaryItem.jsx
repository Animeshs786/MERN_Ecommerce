import { IMAGE_PATH } from "../utils/constant";
import { currencyFormat } from "../utils/helper";
import styles from "./OrderSummaryItem.module.css";

function OrderSummaryItem({ item }) {
  return (
    <div className={styles.listItemWrapper}>
      <div className={styles.imgWrapper}>
        <img src={`${IMAGE_PATH}/product/${item.image}`} alt="cpu-img" />
      </div>
      <div className={styles.infoWrapper}>
        <p>
          {item.name?.length > 70 ? item.name?.slice(0, 70) + "..." : item.name}
        </p>
        <div>
          <span>Qty {item.quantity}</span>
          <h6>{currencyFormat(item.unitPrice)}</h6>
        </div>
      </div>
    </div>
  );
}

export default OrderSummaryItem;
