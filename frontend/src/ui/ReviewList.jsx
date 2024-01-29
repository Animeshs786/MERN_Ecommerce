import ReviewItem from "./ReviewItem";
import styles from "./ReviewList.module.css";

function ReviewList({ review }) {
  return (
    <ul className={styles.listWrapper}>
      {review.map((item, i) => (
        <ReviewItem key={i} item={item} />
      ))}
    </ul>
  );
}

export default ReviewList;
