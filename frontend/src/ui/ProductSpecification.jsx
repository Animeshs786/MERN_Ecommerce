import styles from "./ProductSpecification.module.css";

function ProductSpecification({ specification }) {
  return (
    <ul className={styles.specificationWrapper}>
      {specification.split(",").map((el, i) => (
        <li key={i}>{el}</li>
      ))}
    </ul>
  );
}

export default ProductSpecification;
