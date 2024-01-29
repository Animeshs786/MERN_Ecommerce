import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";

import styles from "./LoginPage.module.css";
import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import Paper from "../ui/Paper";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useResetPassword } from "../features/user/useResetPassword";

function ResetPassword() {
  const { resetPassword, isUpdating } = useResetPassword();
  const { token } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    resetPassword(
      { user: { ...data }, token },
      {
        onSuccess: () => {
          reset();
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 2000);
        },
      }
    );
  };

  return (
    <div className="container">
      <BreadCrumbs link="Login" />
      <div className={styles.loginWrapper}>
        <Heading heading="Password Reset" />
        <div className={styles.loginMainWrapper}>
          <Paper maxWidth="564px" padding="28px 35px">
            <div className={styles.headerWrapper}>
              <h3>Change your password</h3>
              <span>Enter new password below to change your password</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.fieldWrapper}>
                <Input
                  type="password"
                  placeholder="Password"
                  required={true}
                  label="New Password"
                  id="password"
                  register={register}
                  validation={{
                    required: "New Password must be required.",
                  }}
                  errors={errors}
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  required={true}
                  label="Confirm Password"
                  id="confirmPassword"
                  register={register}
                  validation={{
                    required: "Confirm Password must be required.",
                    validate: (val) => {
                      return (
                        val === getValues().password ||
                        "Password and Confirm password must be same."
                      );
                    },
                  }}
                  errors={errors}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button disabled={isUpdating} width="151px">
                  {isUpdating ? "Loading..." : "Reset"}
                </Button>
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
  );
}

export default ResetPassword;
