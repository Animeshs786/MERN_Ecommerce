import styles from "./BrandRow.module.css";

function BrandRow() {
  return (
    <div className={styles.brandWrapper}>
      <img src="/images/brands/roccat.png" alt="roccat" />
      <img src="/images/brands/msi.png" alt="msi" />
      <img src="/images/brands/razer.png" alt="razer" />
      <img src="/images/brands/thermaltake.png" alt="thermaltake" />
      <img src="/images/brands/adata.png" alt="adata" />
      <img src="/images/brands/packard.png" alt="packard" />
      <img src="/images/brands/gigabyte.png" alt="gigabyte" />
    </div>
  );
}

export default BrandRow;
