import { useEffect, useReducer } from "react";

import Star from "./Star";
import styles from "./StarRating.module.css";

const initialState = {
  rating: 0,
  tempRating: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "rating":
      return { ...state, rating: action.payload };
    case "tempRating":
      return { ...state, tempRating: action.payload };
    default:
      return "Case not defined";
  }
}

function StarRating({ customFn }) {
  const [{ rating, tempRating }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    customFn("rating", rating);
  }, [rating, customFn]);
  
  return (
    <div className={styles.ratingWrapper}>
      <Star
        width="32px"
        dispatch={dispatch}
        rating={tempRating || rating}
        cursor="pointer"
      />
      <span>{tempRating || rating ? `${tempRating || rating}.0` : null}</span>
    </div>
  );
}

export default StarRating;
