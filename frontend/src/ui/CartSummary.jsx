import styles from "./CartSummary.module.css";
import Button from "./Button";
import { currencyFormat } from "../utils/helper";
import { GST, SHIPPING, TAX } from "../utils/constant";
import { useCartSummary } from "../hooks/useCartSummary";
import { Link } from "react-router-dom";

function CartSummary() {
  const { totalPrice } = useCartSummary();
  return (
    <div className={styles.cartSummaryWrapper}>
      <header>Summary</header>
      <div className={styles.amountWrapper}>
        <div className={styles.amountItem}>
          <div>
            <h4>Subtotal</h4>
          </div>
          <div>
            <h4>{currencyFormat(totalPrice)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Shipping</h4>
            <span className={styles.subHeading}>
              (Standard Rate - Price may vary depending on the item/destination.
              TECS Staff will contact you.)
            </span>
          </div>
          <div>
            <h4>{currencyFormat(SHIPPING)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Tax</h4>
          </div>
          <div>
            <h4>{currencyFormat(TAX)}</h4>
          </div>
        </div>
        <div className={styles.amountItem}>
          <div>
            <h4>Gst</h4>
          </div>
          <div>
            <h4>{currencyFormat(GST)}</h4>
          </div>
        </div>
        {totalPrice > 0 && (
          <div className={styles.amountItem}>
            <div>
              <h4>Order Total</h4>
            </div>
            <div>
              <h3>{currencyFormat(totalPrice + SHIPPING + TAX + GST)}</h3>
            </div>
          </div>
        )}
      </div>
      {totalPrice > 0 && (
        <div className={styles.buttonWrapper}>
          <Link to="checkout">
            <Button>Proceed to Checkout</Button>
          </Link>
          <Link to="checkout">
            <Button backgroundColor="var(--base-yellow)" color="#232C65">
              <span>Check out with</span>
              <img src="/images/paypal.svg" alt="paypal" />
            </Button>
          </Link>
          {/* <Button
            backgroundColor="transparent"
            color="var(--base-gray)"
            border="2px solid var(--base-gray)"
          >
            Check Out with Multiple Addresses
          </Button> */}
        </div>
      )}
    </div>
  );
}

export default CartSummary;
