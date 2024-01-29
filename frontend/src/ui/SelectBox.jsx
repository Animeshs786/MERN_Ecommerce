import styles from "./SelectBox.module.css";

function SelectBox({ optionName, children }) {
  return (
    <div className={styles.selectBoxWrapper}>
      <span>{optionName}</span>
      {children}
    </div>
  );
}

export default SelectBox;
