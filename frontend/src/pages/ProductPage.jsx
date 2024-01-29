import styles from "./ProductPage.module.css";

import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import ProductBox from "../features/product/ProductBox";
import Support from "../ui/Support";

function ProductPage() {
  return (
    <>
      <div className={styles.gamingBannerWrapper}>
        <img src="/images/gamingBanner.png" alt="gamingBanner" />
      </div>
      <div className={`container ${styles.productOuterWrapper}`}>
        <BreadCrumbs link="Product" />
        <div className={styles.productWrapper}>
          <Heading heading="Product" />
          <ProductBox />
        </div>
      </div>
      <Support />
    </>
  );
}

export default ProductPage;
