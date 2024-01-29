import { useState } from "react";
import styles from "./Footer.module.css";
import FooterList from "./FooterList";
import MobileFooterList from "./MobileFooterList";

function Footer() {
  const [isMobile] = useState(window.innerWidth <= 1000);
  return (
    <footer className={styles.footerWrapper}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <h3>Sign Up To Our Newsletter.</h3>
            <span>Be the first to hear about the latest offers.</span>
          </div>
          <div>
            <input type="email" placeholder="Your Email" />
            <button>Subscribe</button>
          </div>
        </div>
        <div className={styles.listWrapper}>
          {isMobile ? <MobileFooterList /> : <FooterList />}
        </div>
        <hr />
        <div className={styles.bottom}>
          <div>
            <img src="/images/facebook-gray.svg" alt="facebook" />
            <img src="/images/insta-gray.svg" alt="insta" />
          </div>
          <div>
            <img src="/images/paypal-logo.svg" alt="paypal" />
            <img src="/images/visa-logo.svg" alt="visa" />
            <img src="/images/master-logo.svg" alt="master" />
            <img src="/images/discover-logo.svg" alt="discover" />
            <img src="/images/american-logo.svg" alt="american" />
          </div>
          <div>Copyright © 2020 Shop Pty. Ltd.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
