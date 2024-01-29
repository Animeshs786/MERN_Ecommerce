import { useSelector } from "react-redux";
import BreadCrumbs from "./BreadCrumbs";
import ProductAbout from "./ProductAbout";
import styles from "./AboutBox.module.css";

function AboutBox() {
  const {
    name,
    quantity,
    description: about,
  } = useSelector((state) => state.product.product);

  return (
    <div className={styles.infoWrapper}>
      <BreadCrumbs link="Product" />
      <header>
        <h2>{name}</h2>
      </header>
      <ProductAbout about={about} />
      <div className={styles.qtyWrapper}>
        <h4>Quantity:</h4>
        <span>{quantity}</span>
      </div>
    </div>
  );
}

export default AboutBox;
