import styles from "./HomePage.module.css";

import SliderWrapper from "../ui/SliderWrapper";
import ProductBannerSlides from "../ui/ProductBannerSlides";
import ProductList from "../ui/ProductList";
import Support from "../ui/Support";
import Review from "../ui/Review";
import ProductRow from "../ui/ProductRow";
import ProductTabRow from "../ui/ProductTabRow";
import BrandRow from "../ui/BrandRow";

function HomePage() {
  return (
    <section className="container">
      <SliderWrapper>
        <ProductBannerSlides />
      </SliderWrapper>

      {/* new product section */}
      <div className={styles.newProductWrapper}>
        <div className={styles.headerWrapper}>
          <div>
            <h3>New Products</h3>
          </div>
          <div>
            <a href="/#">See All New Products</a>
          </div>
        </div>
        <div className={styles.contentWrapper}>
          <SliderWrapper>
            <ProductList length={7} />
          </SliderWrapper>
        </div>
      </div>

      {/* Custom Build Section */}
      <div className={styles.productBuildsWrapper}>
        <ProductRow />
      </div>

      {/* Laptop tab Section */}
      <div className={styles.tabWrapper}>
        <ProductTabRow />
      </div>

      {/* Msi infinute tab section */}
      <div className={styles.tabWrapper}>
        <ProductTabRow />
      </div>

      {/* Gaming Monitor Section */}
      <div className={styles.productBuildsWrapper}>
        <ProductRow />
      </div>

      <div className={styles.brandWrapper}>
        <BrandRow />
      </div>

      <div className={styles.reviewWrapper}>
        <Review />
      </div>

      <Support />
    </section>
  );
}

export default HomePage;
