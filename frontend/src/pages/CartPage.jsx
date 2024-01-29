import { useSelector, useDispatch } from "react-redux";

import BreadCrumbs from "../ui/BreadCrumbs";
import Button from "../ui/Button";
import CartItems from "../ui/CartItems";
import CartSummary from "../ui/CartSummary";
import Heading from "../ui/Heading";
import styles from "./CartPage.module.css";
import { Link } from "react-router-dom";
import { clearCart } from "../features/cart/cartSlice";
import { useEffect } from "react";
import NotFound from "../ui/NotFound";
import Support from "../ui/Support";

function CartPage() {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  //store in local storage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  // if(cart?.length <= 0) return "cart is empty";

  return (
    <>
      <div className={`container ${styles.cartOuterWrapper}`}>
        <BreadCrumbs link="Cart" />
        <div className={styles.cartWrapper}>
          <Heading heading="Shopping Cart" />
          <div className={styles.cartMainWrapper}>
            {cart.length > 0 ? (
              <div className={styles.cartItemWrapper}>
                <div className={styles.tableWrapper}>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th></th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item, i) => (
                        <CartItems item={item} key={i} />
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.btnWrapper}>
                  <Link to="/product">
                    <Button
                      width="200px"
                      height="38px"
                      backgroundColor="transparent"
                      color="var(--base-gray)"
                      border="2px solid var(--base-gray)"
                    >
                      Continue Shopping
                    </Button>
                  </Link>
                  <Button
                    width="200px"
                    height="38px"
                    backgroundColor="var(--base-black)"
                    onClick={clearCartHandler}
                  >
                    Clear Shopping Cart
                  </Button>
                </div>
              </div>
            ) : (
              <NotFound>
                <img src="/images/resultNotFound.png" alt="not-found-img" />
              </NotFound>
            )}
            <div className={styles.summaryWrapper}>
              <CartSummary />
            </div>
          </div>
        </div>
      </div>
      <Support marginTop="60px" />
    </>
  );
}

export default CartPage;
