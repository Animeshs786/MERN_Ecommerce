import { NavLink } from "react-router-dom";

import styles from "./CustomTab.module.css";

function CustomTab({ tabNames }) {
  return (
    <div className={styles.tabWrapper}>
      {tabNames.map((val, i) => {
        return (
          <NavLink key={i} to={val.split(" ")[0].toLowerCase()}>
            <span className={styles.tab}>{val}</span>
          </NavLink>
        );
      })}
    </div>
  );
}

export default CustomTab;
