import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import Star from "./Star";
import { currencyFormat } from "../utils/helper";
import { IMAGE_PATH } from "../utils/constant";
import { useState } from "react";
import { useAddtoCart } from "../hooks/useAddToCart";

function ProductCard({ item }) {
  const [isActive, setIsActive] = useState(false);
  const productName = item.description;

  const mouseEnterHandler = () => {
    setIsActive((prev) => !prev);
  };

  const mouseLeaveHandler = () => {
    setIsActive((prev) => !prev);
  };

  return (
    <div
      className={`${styles.productCard}`}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      <header>
        <div className={styles.stockWrapper}>
          {item.quantity > 0 ? (
            <>
              <img src="/images/inStock-icon.svg" alt="inStock" />
              <span>in stock</span>
            </>
          ) : (
            <>
              <img src="/images/outStock-icon.svg" alt="outStock" />
              <span className={styles.stockOut}>check availablity</span>
            </>
          )}
        </div>
        <div className={styles.whishlistWrapper}>
          <img
            className={`${isActive ? styles.show : styles.hidden}`}
            src="/images/whishlist-icon.svg"
            alt="whishlist"
          />
        </div>
        <div className={styles.compareWrapper}>
          <img
            className={`${isActive ? styles.show : styles.hidden}`}
            src="/images/ellipse-icon.svg"
            alt="ellipse"
          />
          <img
            className={`${isActive ? styles.show : styles.hidden}`}
            src="/images/compare-icon.svg"
            alt="compare"
          />
        </div>
        <div className={styles.imageContainer}>
          <img src={`${IMAGE_PATH}/product/${item.thumbImage}`} alt="product" />
        </div>
      </header>
      <div className={styles.productContent}>
        <div className={styles.ratingWrapper}>
          <ul className={styles.rating}>
            <Star rating={Math.floor(item.ratingAverage)} />
          </ul>
          <span>Reviews ({item.ratingNumber})</span>
        </div>
        {
          <Link to={`${item.id}`}>
            <p className={styles.productName}>
              {productName.length >= 61
                ? productName.slice(0, 61) + "..."
                : productName}
            </p>
          </Link>
        }
        <div className={styles.priceWrapper}>
          <span className={styles.productPrice}>
            {currencyFormat(item.price)}
          </span>
          <span className={styles.productSellPrice}>
            {currencyFormat(item.price - item.discount)}
          </span>
        </div>

        <button className={`${isActive ? styles.show : styles.hidden}`}>
          <img src="/images/cartBtn-icon.svg" alt="cartBtn" />
          <span onClick={useAddtoCart(item)}>Add To Cart</span>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
