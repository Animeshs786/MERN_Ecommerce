import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "./Button";
import ReviewList from "./ReviewList";
import styles from "./ReviewBox.module.css";
import Star from "./Star";
import CustomModal from "./CustomModal";
import CreateUpdateRating from "./CreateUpdateRating";
import { useGetProductReview } from "../features/review/useGetProductReview";
import Loader from "./Loader";
import Error from "./Error";
import { setIsOpen } from "../features/modal/modalSlice";

function ReviewBox() {
  const { id: productId } = useParams();
  const dispatch = useDispatch();

  const { review, isLoading, error } = useGetProductReview(productId);

  const ratingSum = review?.reduce((acc, item) => acc + item.rating, 0);
  const ratingAverage = Math.round((ratingSum / review?.length) * 10) / 10;

  const reviewHandler = () => {
    dispatch(setIsOpen(true));
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  return (
    <div className={styles.reviewMainWrapper}>
      <CustomModal>
        <CreateUpdateRating />
      </CustomModal>
      <div className={styles.reviewBox}>
        <h4>{ratingAverage || 0?.toFixed(1)}</h4>
        <div>
          <Star rating={Math.floor(ratingAverage)} />
        </div>
        <p>{review?.length} Reviews</p>
        <div>
          <Button onClick={reviewHandler} width="178px" height="40px">
            Write Review
          </Button>
        </div>
      </div>
      <ReviewList review={review} />
    </div>
  );
}

export default ReviewBox;
