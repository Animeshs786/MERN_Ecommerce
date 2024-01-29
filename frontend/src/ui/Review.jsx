import styles from "./Review.module.css";

function Review() {
  return (
    <div className={styles.reviewWrapper}>
      <div className={styles.contentWrapper}>
        <div>
          <span>‘’</span>
          <div>
            <p>
              My first order arrived today in perfect condition. From the time I
              sent a question about the item to making the purchase, to the
              shipping and now the delivery, your company, Tecs, has stayed in
              touch. Such great service. I look forward to shopping on your site
              in the future and would highly recommend it.
            </p>
            <span>- Tama Brown</span>
            <div>
              <button>Leave Us a Review</button>
              <div className={styles.btnWrapper}>
                <span className="active"></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
