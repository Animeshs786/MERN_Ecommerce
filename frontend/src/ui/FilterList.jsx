import { useState } from "react";
import styles from "./FilterList.module.css";

function FilterList({ listName, children }) {
  const [isShow, setIsShow] = useState(true);
  const showHandller = () => {
    setIsShow((show) => !show);
  };
  return (
    <div className={styles.filterOptions}>
      <div onClick={showHandller} className={styles.optionHeading}>
        <h4>{listName}</h4>
        {isShow ? (
          <img src="/images/upward-icon.svg" alt="upward-icon" />
        ) : (
          <img src="/images/downward-icon.svg" alt="downward-icon" />
        )}
      </div>
      {isShow && <div className={styles.optionItems}>{children}</div>}
    </div>
  );
}

export default FilterList;
