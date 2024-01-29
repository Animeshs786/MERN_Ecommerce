import { useBackMove } from "../hooks/useBackMove";
import styles from "./BackBtn.module.css";

function BackBtn() {
  return (
    <div className={styles.backBtn}>
      <span onClick={() => useBackMove}>‹ Back</span>
    </div>
  );
}

export default BackBtn;
