import styles from "./ProductAbout.module.css";
function ProductAbout({about}) {
  return (
    <div className={styles.aboutProduct}>
      <p>
       {about}
      </p>
    </div>
  );
}

export default ProductAbout;
