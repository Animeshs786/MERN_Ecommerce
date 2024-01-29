import styles from "./NotFound.module.css";

function NotFound({children}) {
  return (
    <div className={styles.mainWrapper}>
      <div className={styles.imageContainer}>
        {children}
      </div>
    </div>
  );
}

export default NotFound;
