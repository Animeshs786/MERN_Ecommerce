import { useForm } from "react-hook-form";

import Button from "./Button";
import styles from "./UpdateUser.module.css";
import Input from "./Input";
import { useUpdatePassword } from "../features/user/useUpdatePassword";

function UpdatePassword() {
  const { updatePassword, isUpdating } = useUpdatePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    updatePassword(data, {
      onSuccess: () => reset(),
    });
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="Current Password"
            label="Current Password"
            required={true}
            register={register}
            id="oldPassword"
            validation={{
              required: "Current password  must be required.",
            }}
            errors={errors}
          />

          <Input
            type="password"
            placeholder="Password"
            label="New Password"
            required={true}
            register={register}
            id="password"
            validation={{
              required: "New Password  must be required.",
            }}
            errors={errors}
          />

          <Input
            type="password"
            placeholder="Confirm Password"
            label="Confirm Password"
            required={true}
            register={register}
            id="confirmPassword"
            validation={{
              required: "New Password  must be required.",
              validate: (val) => {
                return (
                  val === getValues().password ||
                  "Password and Confirm Password must be same."
                );
              },
            }}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isUpdating} height="40px" width="130px">
            {isUpdating ? "Loading..." : " Update"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default UpdatePassword;
