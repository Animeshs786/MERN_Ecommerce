import { Outlet, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import styles from "./ProductDetailPage.module.css";
import CustomTab from "../ui/CustomTab";
import Quantity from "../ui/Quantity";
import Button from "../ui/Button";
import Paper from "../ui/Paper";
import { useGetProduct } from "../features/product/useGetProduct";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import { createProduct } from "../features/product/productSlice";
import { currencyFormat } from "../utils/helper";
import { IMAGE_PATH } from "../utils/constant";
import { useAddtoCart } from "../hooks/useAddToCart";
import Support from "../ui/Support";

function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1);
  const { id: productId } = useParams();
  const { isLoading, error, product } = useGetProduct(productId);
  const dispatch = useDispatch();
  const addCart = useAddtoCart(product, quantity);

  //store current prdouct detail globally
  useEffect(() => {
    if (!product) return;
    dispatch(createProduct(product));
  }, [dispatch, product]);

  if (isLoading) return <Loader />;

  if (error) return <Error error={error} />;

  return (
    <>
      <div className={`${styles.productDetail} ${styles.isMobile}`}>
        <div className={`container`}>
          <div className={`${styles.headerWrapper} `}>
            <CustomTab tabNames={["About Product", "Specs", "Review"]} />
            <div>
              <div>
                <span>Price:</span>
                <h3>{currencyFormat(product.price - product.discount)}</h3>
              </div>
              <Quantity customFn={setQuantity} />
              <Button onClick={addCart} width="151px">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.productContentWrapper}>
        <Paper maxWidth="900px">
          <div className={`${styles.headerWrapper} ${styles.isHidden}`}>
            <CustomTab tabNames={["About Product", "Specs", "Review"]} />
          </div>

          <Outlet />
        </Paper>
        <div className={styles.imageContainer}>
          <div className={styles.imageBox}>
            <img
              src={`${IMAGE_PATH}/product/${product.thumbImage}`}
              alt="product-detail"
            />
          </div>
          <div className={styles.btnWrapper}>
            <span className="active"></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div className={styles.priceWrapper}>
        <div>
          <span>Price:</span>
          <h3>{currencyFormat(product.price - product.discount)}</h3>
        </div>
        <Quantity customFn={setQuantity} />
        <Button onClick={addCart} width="151px">
          Add to cart
        </Button>
      </div>
      <div className={styles.featuresWrapper}>
        <div>
          <h2>
            Outplay <br />
            the Competittion{" "}
          </h2>
          <p>
            Experience a 40% boost in computing from last generation. MSI
            Desktop equips the 10th Gen. Intel® Core™ i7 processor with the
            upmost computing power to bring you an unparalleled gaming
            experience.
            <br />
            <br />
            *Performance compared to i7-9700. Specs varies by model.
          </p>
        </div>
      </div>
      <Support />
    </>
  );
}

export default ProductDetailPage;
