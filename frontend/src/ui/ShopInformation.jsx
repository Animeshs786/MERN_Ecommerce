import styles from "./ShopInformation.module.css";
function ShopInformation() {
  return (
    <div className={styles.infoWrapper}>
      <div className="container">
        <div>
          <span className={styles.firstMsg}>Mon-Thu:</span>
          <span className={`${styles.secondMsg} time`}>9:00 AM - 5:30 PM</span>
        </div>
        <div>
          <span className={styles.firstMsg}>
            Visit our showroom in 1234 Street Adress City Address, 1234
          </span>
          <span className={`${styles.contact} `}>Contact Us</span>
        </div>
        <div>
          <span className={styles.secondMsg}>Call Us: (00) 1234 5678</span>
          <a href="/#">
            {" "}
            <img src="/images/facebook-icon.svg" alt="facebook-icon" />
          </a>
          <a href="/#">
            <img src="/images/instagram-icon.svg" alt="instagram-icon" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default ShopInformation;
