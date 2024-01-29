import styles from "./ProductBanner.module.css";
const name = "Custome Builds";

function ProductBanner() {
  return (
    <div className={styles.bannerWrapper}>
      <img src="/images/productBanner.png" alt="productBanner" />
      <div>
       { name.split(" ").map((element,i) => <span key={i}>{element}</span>)}
      </div>
      <a href="/">See All Products</a>
    </div>
  );
}

export default ProductBanner;
