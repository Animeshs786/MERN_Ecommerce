import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "./Button";
import styles from "./CreateUpdateProduct.module.css";
import Input from "./Input";
import Select from "./Select";
import Textarea from "./Textarea";
import Loader from "./Loader";
import { createProduct, updateProduct } from "../services/apiProducts";
import { useGetProduct } from "../features/product/useGetProduct";
import Error from "./Error";
import { useGetCategories } from "../features/category/useGetCategories";

function CreateProduct() {
  const { productId } = useParams();
  const isUpdte = Boolean(productId);
  const {
    categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategories();

  const option = [];

  categories?.forEach((item) => {
    option.push({ value: item._id, name: item.name });
  });

  const {
    isLoading: fetchLoading,
    error: fetchError,
    product,
  } = useGetProduct(productId);

  const { ...defaultValues } = product || {};

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
    reset,
  } = useForm();

  // set the value
  useEffect(() => {
    if (!product) return;
    Object.keys(defaultValues).forEach((key) => {
      if (
        key !== "user" &&
        key !== "reviews" &&
        key !== "thumbImage" &&
        key !== "images"
      ) {
        setValue(
          key,
          key !== "category" ? defaultValues[key] : defaultValues[key]._id,
          {
            shouldValidate: false,
          }
        );
      }
    });
  }, [product]);

  const queryClient = useQueryClient();

  //create product query
  const { isPending: isCreating, mutate: createMutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success(`Product create successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      reset();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  //update product query
  const { isPending: isUpdating, mutate: updateMutate } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast.success(`Product update successfully.`);
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  // form submit handler
  const onSubmit = (data) => {
    if (isUpdte) {
      updateMutate({ data, productId });
    } else {
      createMutate(data);
    }
  };

  if (fetchLoading || categoryLoading) return <Loader />;
  if (fetchError || categoryError) return <Error error={fetchError || categoryError} />;

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            placeholder="Name"
            label="Product Name"
            required={true}
            register={register}
            id="name"
            validation={{
              required: "Product name  must be required.",
              minLength: {
                value: 5,
                message: "Minimum 5 character required.",
              },
            }}
            errors={errors}
          />
          <Input
            type="number"
            placeholder="Price"
            label="Product Price"
            required={true}
            register={register}
            id="price"
            validation={{
              required: "Product price must be required.",
              min: {
                value: 1,
                message: "Minimum price value 1 ",
              },
            }}
            errors={errors}
          />
          <Input
            type="number"
            placeholder="Quantity"
            label="Product Quantity"
            required={true}
            register={register}
            id="quantity"
            validation={{
              required: "Product quantity must be required",
              min: {
                value: 1,
                message: "Minimum quantity value 1",
              },
            }}
            errors={errors}
          />
          <Input
            type="text"
            placeholder="Series"
            label="Product Series"
            register={register}
            id="series"
          />
          <Select
            label="Category"
            optionWithValue={option}
            required={true}
            id="category"
            register={register}
            validation={{ required: "Category must be required." }}
            errors={errors}
          />
          <Textarea
            rows="4"
            cols="50"
            label="Description"
            required={true}
            id="description"
            register={register}
            errors={errors}
            validation={{ required: "Description must be required." }}
          />
          <Textarea
            rows="4"
            cols="50"
            label="Specification"
            required={true}
            id="specification"
            register={register}
            errors={errors}
            validation={{ required: "Specification must be required." }}
          />
          <Input
            type="number"
            placeholder="Discount"
            label="Discount"
            register={register}
            id="discount"
            validation={{
              validate: (val) => {
                return (
                  val < +getValues().price ||
                  "Discount must be less then price."
                );
              },
            }}
            errors={errors}
          />
          <Input
            type="file"
            label="Thumb Image"
            register={register}
            required={true}
            id="thumbImage"
            validation={{
              required: isUpdte ? false : "Thumb image must be required.",
            }}
            errors={errors}
          />
          <Input
            type="file"
            multiple={true}
            required={true}
            label="Product Images"
            register={register}
            id="images"
            validation={{
              required: isUpdte ? false : "Product images must be required.",
            }}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isUpdating || isCreating} width="210px">
            {isCreating || isUpdating
              ? "Loading..."
              : isUpdte
              ? "Update"
              : "Create"}
          </Button>
        </div>
      </form>
      .
    </main>
  );
}

export default CreateProduct;
