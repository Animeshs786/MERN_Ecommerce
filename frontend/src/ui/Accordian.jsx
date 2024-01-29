import { useState } from "react";

import styles from "./Accordian.module.css";

function Accordian({ name, children, open = false }) {
  const [isShow, setIsShow] = useState(open);
  const showHandller = () => {
    setIsShow((show) => !show);
  };
  return (
    <div className={styles.mainWrapper}>
      <div onClick={showHandller} className={styles.headerWrapper}>
        <h4>{name}</h4>
        {isShow ? (
          <img src="/images/upward-icon1.svg" alt="upward-icon" />
        ) : (
          <img src="/images/downward-icon1.svg" alt="downward-icon" />
        )}
      </div>
      {!isShow && <hr />}
      {isShow && children}
    </div>
  );
}

export default Accordian;
