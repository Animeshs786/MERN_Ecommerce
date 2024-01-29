import { useForm } from "react-hook-form";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

import StarRating from "./StarRating";
import Button from "./Button";
import styles from "./CreateUpdateRating.module.css";
import Input from "./Input";
import Textarea from "./Textarea";
import { useCreateReview } from "../features/review/useCreateReview";

function CreateUpdateRating() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const{createReview,isCreating}=useCreateReview();

  const {id}= useParams();  
  const {user}=useSelector((state)=>state.user);

  const onSubmit = (data) => {
    createReview({...data,product:id,user:user._id})
  };

  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.starWrapper}>
          <StarRating customFn={setValue} />
        </div>
        <div className={styles.inputWrapper}>
          <Input
            type="hidden"
            register={register}
            id="rating"
            validation={{
              required: "Rating  must be required.",
              min: {
                value: 1,
                message: "Minimum 1 Rating required",
              },
              max: {
                value: 5,
                message: "Maximum 5 Rating should be allow.",
              },
            }}
            errors={errors}
          />

          <Textarea
            rows="4"
            cols="50"
            label="Review"
            required={true}
            id="review"
            register={register}
            errors={errors}
            validation={{ required: "Review must be required." }}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button disabled={isCreating} height="40px" width="130px">
           {isCreating ? "Loading..." : " Submit"}
          </Button>
        </div>
      </form>
    </main>
  );
}

export default CreateUpdateRating;
