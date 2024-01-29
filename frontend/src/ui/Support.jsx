import styles from "./Support.module.css";
function Support({ background = true, marginTop = "" }) {
  return (
    <div
      style={{ marginTop }}
      className={`${background ? styles.bg : ""} ${styles.mainWrapper}`}
    >
      <div>
        <div className={styles.content}>
          <div>
            <img src="/images/ellipse-color.svg" alt="ellipse" />
            <img src="/images/support-icon.svg" alt="support" />
          </div>
          <h4>Product Support</h4>
          <p>
            Up to 3 years on-site warranty available for your peace of mind.
          </p>
        </div>
        <div className={styles.content}>
          <div>
            <img src="/images/ellipse-color.svg" alt="ellipse" />
            <img src="/images/account-icon.svg" alt="account" />
          </div>
          <h4>Personal Account</h4>
          <p>
            With big discounts, free delivery and a dedicated support
            specialist.
          </p>
        </div>
        <div className={styles.content}>
          <div>
            <img src="/images/ellipse-color.svg" alt="ellipse" />
            <img src="/images/saving-icon.svg" alt="saving" />
          </div>
          <h4>Personal Account</h4>
          <p>
            With big discounts, free delivery and a dedicated support
            specialist.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Support;
