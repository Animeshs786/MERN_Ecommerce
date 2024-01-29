import { useDispatch } from "react-redux";

import styles from "./ActiveFilter.module.css";
import { removeCategory } from "../features/product/productSlice";

function ActiveFilter({ filter }) {
  const dispatch = useDispatch();
  const removeHandler = (id) => {
    dispatch(removeCategory(id));
  };
  return (
    <div className={styles.activeItem}>
      <span>{filter.name}</span>
      <img
        onClick={() => removeHandler(filter._id)}
        src="/images/deleteRed-icon.svg"
        alt="delete-icon"
      />
    </div>
  );
}

export default ActiveFilter;
