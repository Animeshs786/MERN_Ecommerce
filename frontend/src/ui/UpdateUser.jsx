import { useForm } from "react-hook-form";

import Button from "./Button";
import styles from "./UpdateUser.module.css";
import Select from "./Select";
import { useUpdateUser } from "../features/user/useUpdateUser";
import Input from "./Input";

function UpdateUser({ user, role, profile }) {
  const { updateUser, isUpdating } = useUpdateUser();
  const { userId, ...defaultValues } = user;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    updateUser({ user: data, userId });
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="Name"
            label="User Name"
            required={true}
            register={register}
            id="name"
            validation={{
              required: "User name  must be required.",
            }}
            errors={errors}
          />
          <Input
            type="email"
            placeholder="Email"
            label="User Email"
            required={true}
            register={register}
            id="email"
            validation={{
              required: "User email  must be required.",
            }}
            errors={errors}
          />
          {role && (
            <Select
              label="User Role"
              options={["user", "admin"]}
              required={true}
              id="role"
              register={register}
              validation={{ required: "User role must be required." }}
              errors={errors}
            />
          )}
          {profile && (
            <Input
              type="file"
              placeholder="Profile"
              label="User Profile"
              register={register}
              id="photo"
            />
          )}
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isUpdating} height="40px" width="130px">
            Update
          </Button>
        </div>
      </form>
    </main>
  );
}

export default UpdateUser;
