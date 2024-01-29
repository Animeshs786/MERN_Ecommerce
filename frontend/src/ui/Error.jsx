import { useBackMove } from "../hooks/useBackMove";
import Button from "./Button";
import NotFound from "./NotFound";
import styles from "./PageNotFound.module.css";

function Error({error}) {
  return (
    <div className={styles.mainWrapper}>
      <NotFound>
        <img src="/images/error.jpg" alt="error" />
      </NotFound>
      <div className={styles.messageWrapper}>
        <span>{error?.message}</span>
        <Button onClick={useBackMove()} height="45px" width="150px">
          Go Back
        </Button>
      </div>
    </div>
  );
}

export default Error;
