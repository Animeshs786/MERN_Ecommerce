import CustomTab from "./CustomTab";
import ProductRow from "./ProductRow";

import styles from "./ProductTabRow.module.css";

function ProductTabRow() {
  return (
    <>
      <CustomTab
        tabNames={[
          "MSI GS Series",
          "MSI GT Series",
          "MSI GL Series",
          "MSI GE Series",
        ]}
      />
      <div className={styles.tabContent}>
        <ProductRow />
      </div>
    </>
  );
}

export default ProductTabRow;
