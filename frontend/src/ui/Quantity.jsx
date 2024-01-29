import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import styles from "./Quantity.module.css";
import { decreaseQty, increaseQty } from "../features/cart/cartSlice";

function Quantity({ quantity = 1, productId, customFn }) {
  const [qty, setQty] = useState(quantity);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!customFn) return;
    customFn(qty);
  }, [customFn, qty]);

  const increamentHandler = () => {
    if (qty >= 10) return;
    setQty((val) => val + 1);

    if (productId) {
      dispatch(increaseQty(productId));
    }
  };

  const decreamentHandler = () => {
    if (qty <= 1) return;
    setQty((val) => val - 1);

    if (productId) {
      dispatch(decreaseQty(productId));
    }
  };

  return (
    <div className={styles.qtyWrapper}>
      <span>{qty}</span>
      <img
        onClick={decreamentHandler}
        className={styles.decreamentBtn}
        src="/images/qty1-icon.svg"
        alt="qty1-icon"
      />
      <img
        onClick={increamentHandler}
        className={styles.increamentBtn}
        src="/images/qty2-icon.svg"
        alt="qty2-icon"
      />
    </div>
  );
}

export default Quantity;
