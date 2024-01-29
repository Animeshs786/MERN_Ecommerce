import { currencyFormat } from "../utils/helper";
import styles from "./OrderDetailSummary.module.css";

function OrderDetailSummary({ order }) {
  return (
    <div className={styles.orderSummaryWrapper}>
      <header>Order Summary</header>
      <div className={styles.amountWrapper}>
        <div className={styles.amountItem}>
          <div>
            <h4>Subtotal</h4>
          </div>
          <div>
            <h4>{currencyFormat(order.price)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Shipping</h4>
          </div>
          <div>
            <h4>{currencyFormat(order.shippingPrice)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Tax</h4>
          </div>
          <div>
            <h4>{currencyFormat(order.tax)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Gst</h4>
          </div>
          <div>
            <h4>{currencyFormat(order.gst)}</h4>
          </div>
        </div>

        <div className={styles.amountItem}>
          <div>
            <h4>Order Total</h4>
          </div>
          <div>
            <h3>
              {currencyFormat(
                order.price + order.shippingPrice + order.tax + order.gst
              )}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailSummary;
