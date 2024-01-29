import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import styles from "./RegisterPage.module.css";
import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import Paper from "../ui/Paper";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useSingUp } from "../features/user/useSignUp";
import Support from "../ui/Support";

function RegisterPage() {
  const { signUp, isCreating } = useSingUp();
  const { authenticate } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticate) {
      navigate("/product", { replace: true });
    }
  }, [authenticate, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    signUp(data, {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <div className={`container ${styles.registerContainer}`}>
        <BreadCrumbs link="Register" />
        <div className={styles.registerWrapper}>
          <Heading heading="Create Customer" />
          <div className={styles.registerMainWrapper}>
            <Paper maxWidth="564px" padding="28px 35px">
              <div className={styles.headerWrapper}>
                <h3>New Customers</h3>
                <span>Please provide all required details to register.</span>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.fieldWrapper}>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    required={true}
                    label="Name"
                    id="name"
                    register={register}
                    validation={{
                      required: "Name must be required.",
                    }}
                    errors={errors}
                  />
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
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    required={true}
                    label="Confirm Password"
                    id="confirmPassword"
                    register={register}
                    validation={{
                      required: "Confirm password must be required.",
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
                  <Button disabled={isCreating} width="151px">
                    {isCreating ? "Loading..." : "Sign Up"}
                  </Button>
                </div>
              </form>
            </Paper>
            <Paper maxWidth="564px" maxHeight="415px" padding="28px 35px">
              <div className={styles.headerWrapper}>
                <h3>Existing Customer?</h3>
                <span>Existing Customer has many benefits:</span>
                <ul className={styles.listWrapper}>
                  <li>Check out faster</li>
                  <li>Keep more than one address</li>
                  <li>Track orders and more</li>
                </ul>
              </div>
              <div className={styles.buttonWrapper}>
                <Link to="/login">
                  <Button width="208px">Login An Account</Button>
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

export default RegisterPage;
