import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.loaderWrapper}>
      <div className={styles.loader}>
        <span>Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
