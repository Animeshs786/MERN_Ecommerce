import { useSelector } from "react-redux";

import styles from "./PageStats.module.css";

function PageStats({ totalResult }) {
  const { currentPage, pageLimit } = useSelector((state) => state.product);
  const startValue = (currentPage - 1) * pageLimit + 1;
  const endValue = Math.min(currentPage * pageLimit, totalResult);
  return (
    <span className={styles.pageStats}>{` Items ${startValue}-${endValue} ${
      endValue === totalResult ? "" : "of " + totalResult
    }`}</span>
  );
}

export default PageStats;
