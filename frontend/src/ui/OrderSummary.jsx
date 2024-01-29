import { useSelector } from "react-redux";

import styles from "./OrderSummary.module.css";
import Paper from "./Paper";
import OrderSummaryItem from "./OrderSummaryItem";
import { useState } from "react";

function OrderSummary() {
  const [isShow, setIsShow] = useState(true);
  const { cart } = useSelector((state) => state.cart);

  const showHandler = () => {
    setIsShow((show) => !show);
  };
  return (
    <div className={styles.orderSummaryWrapper}>
      <Paper padding="18px 30px">
        <div className={styles.headerWrapper}>
          <h3>Order Summary</h3>
        </div>
        <div className={styles.orderContainer}>
          <div>
            <h4>{cart?.length} Items in cart</h4>
            {isShow ? (
              <img
                src="/images/upward-icon.svg"
                alt="upward-icon"
                onClick={showHandler}
              />
            ) : (
              <img
                src="/images/downward-icon.svg"
                alt="downward-icon"
                onClick={showHandler}
              />
            )}
          </div>
          {isShow && (
            <div className={styles.listContainer}>
              {cart.map((item,i) => (
                <OrderSummaryItem key={i} item={item} />
              ))}
            </div>
          )}
        </div>
      </Paper>
    </div>
  );
}

export default OrderSummary;
