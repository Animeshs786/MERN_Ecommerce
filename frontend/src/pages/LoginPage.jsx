import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./LoginPage.module.css";
import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import Paper from "../ui/Paper";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useLogin } from "../features/user/useLogin";
import CustomModal from "../ui/CustomModal";
import ForgetPassword from "../ui/ForgetPassword";
import { setIsOpen } from "../features/modal/modalSlice";
import Support from "../ui/Support";

function LoginPage() {
  const { login, isLogin } = useLogin();
  const dispatch = useDispatch();

  const { authenticate } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    login(data, {
      onSuccess: () => reset(),
    });
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/product", { replace: true });
    }
  }, [authenticate, navigate]);

  const modalHandler = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <>
      <div className={`container ${styles.loginContainer}`}>
        <CustomModal>
          <ForgetPassword />
        </CustomModal>
        <BreadCrumbs link="Login" />
        <div className={styles.loginWrapper}>
          <Heading heading="Customer Login" />
          <div className={styles.loginMainWrapper}>
            <Paper maxWidth="564px" padding="28px 35px">
              <div className={styles.headerWrapper}>
                <h3>Registered Customers</h3>
                <span>
                  If you have an account, sign in with your email address.
                </span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fieldWrapper}>
                  <Input
                    type="email"
                    placeholder="Your Email"
                    required={true}
                    label="Email"
                    id="email"
                    register={register}
                    validation={{
                      required: "Email must be required.",
                    }}
                    errors={errors}
                  />
                  <Input
                    type="password"
                    placeholder="Your Password"
                    required={true}
                    label="Password"
                    id="password"
                    register={register}
                    validation={{
                      required: "Password must be required.",
                    }}
                    errors={errors}
                  />
                </div>
                <div className={styles.buttonWrapper}>
                  <Button disabled={isLogin} width="151px">
                    {isLogin ? "Loading..." : "Sign In"}
                  </Button>
                  <span className={styles.forgetLink} onClick={modalHandler}>
                    Forgot Your Password?
                  </span>
                </div>
              </form>
            </Paper>
            <Paper maxWidth="564px" padding="28px 35px">
              <div className={styles.headerWrapper}>
                <h3>New Customer?</h3>
                <span>Creating an account has many benefits:</span>
                <ul className={styles.listWrapper}>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
              </div>
              <div className={styles.buttonWrapper}>
                <Link to="/register">
                  <Button width="208px">Create An Account</Button>
                </Link>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <Support marginTop="60px" />
    </>
  );
}

export default LoginPage;
