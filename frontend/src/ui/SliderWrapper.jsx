import styles from "./SliderWrapper.module.css";
function SliderWrapper({children}) {
  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.btnWrapper}>
        <img
          className={styles.prevBtn}
          src="/images/prev-btn.svg"
          alt="prv-btn.svg"
        />
        <img
          className={styles.prevBtn}
          src="/images/next-btn.svg"
          alt="prv-btn.svg"
        />
      </div>
      <div className={styles.contentWrapper}>
        {children}
      </div>
    </div>
  );
}

export default SliderWrapper;
