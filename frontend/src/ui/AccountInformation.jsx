import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import styles from "./AccountInformation.module.css";
import { IMAGE_PATH } from "../utils/constant";
import CustomModal from "./CustomModal";
import UpdateUser from "./UpdateUser";
import UpdatePassword from "./UpdatePassword";
import { setIsOpen } from "../features/modal/modalSlice";

function AccountInformation() {
  const dispatch = useDispatch();

  const [isPasswordUpdate, setIsPasswordUpdate] = useState(false);

  const { user } = useSelector((state) => state.user);

  const profileHandler = () => {
    setIsPasswordUpdate(false);
    dispatch(setIsOpen(true));
  };

  const passwordHandler = () => {
    setIsPasswordUpdate(true);
    dispatch(setIsOpen(true));
  };
  return (
    <>
      <CustomModal>
        {isPasswordUpdate ? (
          <UpdatePassword />
        ) : (
          <UpdateUser profile={true} user={{ ...user, userId: user._id }} />
        )}
      </CustomModal>
      <div className={styles.informationWrapper}>
        <div className={styles.contentWrapper}>
          <header>
            <h3>Account Information</h3>
          </header>
          <main>
            <div className={styles.detailWrapper}>
              <div>
                <h4>Contact Information</h4>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
              <div className={styles.linkWrapper}>
                <span onClick={profileHandler}>Edit</span>
                <span onClick={passwordHandler}>Change Password</span>
              </div>
            </div>
            <div className={styles.imageWrapper}>
              <img src={`${IMAGE_PATH}/user/${user?.photo}`} alt="avatar" />
            </div>
          </main>
        </div>
        <div className={styles.contentWrapper}>
          <header>
            <h3>Address Information</h3>
          </header>
          <main>
            <div className={styles.detailWrapper}>
              <div>
                <h4>Shipping Address</h4>
                <p>You have not set a default shipping address.</p>
              </div>
              <div>{/* <a href="/">Edit</a> */}</div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default AccountInformation;
