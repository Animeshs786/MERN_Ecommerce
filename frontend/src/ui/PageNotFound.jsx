import { useBackMove } from "../hooks/useBackMove";
import Button from "./Button";
import NotFound from "./NotFound";
import styles from "./PageNotFound.module.css";

function PageNotFound() {
  return (
    <div className={styles.mainWrapper}>
      <NotFound>
        <img src="/images/pageNotFound(1).gif" alt="page-not-found" />
      </NotFound>
      <div className={styles.messageWrapper}>
        <p>Page Not Found</p>
        <span>Whoops... this page is not available for a moment.</span>
        <Button onClick={useBackMove()} height="45px" width="150px">
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default PageNotFound;
