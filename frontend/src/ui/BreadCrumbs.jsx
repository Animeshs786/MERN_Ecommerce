import styles from "./BreadCrumbs.module.css";
import { Link } from "react-router-dom";

function BreadCrumbs({ link }) {
  return (
    <ul className={styles.breadCrumbsWrapper}>
      <Link to="/">
        <li className={styles.listItem}>Home</li>
      </Link>
      <li className={styles.listIcon}>›</li>
      <li className={styles.listItem}>{link}</li>
    </ul>
  );
}

export default BreadCrumbs;
