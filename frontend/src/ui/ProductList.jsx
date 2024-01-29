import styles from "./ProductList.module.css";
import ProductCard from "./ProductCard";

function ProductList({ length }) {
  return (
    <div className={styles.productWrapper}>
      {Array.from({ length }, (_, i) => (
        <ProductCard key={i} />
      ))}
    </div>
  );
}

export default ProductList;
