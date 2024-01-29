import { useForm } from "react-hook-form";

import Button from "./Button";
import styles from "./CreateUpdateCategory.module.css";
import Input from "./Input";
import { useCreateCategory } from "../features/category/useCreateCategory";
import { useUpdateCategory } from "../features/category/useUpdateCategory";

function CreateUpdateCategory({ category }) {
  const { createCategory, isCreating } = useCreateCategory();
  const { updateCategory, isUpdating } = useUpdateCategory();

  const { _id: categoryId, name } = category;
  const isUpdate = Boolean(categoryId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: isUpdate ? { name } : {},
  });

  const onSubmit = (data) => {
    if (!isUpdate) {
      createCategory(data, {
        onSuccess: () => reset(),
      });
    } else {
      updateCategory({ ...data, categoryId });
    }
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="Name"
            label="Category Name"
            required={true}
            register={register}
            id="name"
            validation={{
              required: "Category name  must be required.",
              minLength: {
                value: 3,
                message: "Minimum 3 character required.",
              },
            }}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isCreating || isUpdating} height="40px" width="130px">
            {isUpdate ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default CreateUpdateCategory;
