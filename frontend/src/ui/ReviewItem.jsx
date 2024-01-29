import { useState } from "react";
import styles from "./ReviewItem.module.css";
import { dateFormat } from "../utils/helper";
import { IMAGE_PATH } from "../utils/constant";
import Star from "./Star";

function ReviewItem({ item }) {
  const [isExpand, setIsExpand] = useState(false);
  const expandHandler = () => {
    // alert("hs")
    setIsExpand((prev) => !prev);
  };
  const review = item.review;

  const shortReview = review.length > 150 ? review.slice(0, 150) + "..." : "";
  return (
    <div className={styles.itemWrapper}>
      <li>
        <Star rating={Math.floor(item.rating)} />
      </li>
      <li onClick={expandHandler}>
        {shortReview ? <>{isExpand ? review : shortReview}</> : review}
      </li>
      <li>
        <img src={`${IMAGE_PATH}/user/${item.user.photo}`} alt="avatar" />
        <span>{item.user.name}</span>
        <span>{dateFormat(item.createdAt)}</span>
      </li>
    </div>
  );
}

export default ReviewItem;
