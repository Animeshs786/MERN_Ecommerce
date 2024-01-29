import { useForm } from "react-hook-form";

import Button from "./Button";
import styles from "./CreateUpdateCategory.module.css";
import Input from "./Input";
import { useForgetPassword } from "../features/user/useForgetPassword";

function ForgetPassword({ category }) {
  const { forgetPassword, isLoading } = useForgetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    forgetPassword(data, { onSuccess: () => reset() });
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Input
            type="email"
            placeholder="Email"
            label="Your Email"
            required={true}
            register={register}
            id="email"
            validation={{
              required: "Email must be required.",
            }}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isLoading} height="40px" width="130px">
            {isLoading ? "Loading..." : " Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default ForgetPassword;
