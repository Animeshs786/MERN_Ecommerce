import { useForm } from "react-hook-form";

import Button from "./Button";
import styles from "./UpdateOrder.module.css";
import { useUpdateOrder } from "../features/order/useUpdateOrder";
import Select from "./Select";

function UpdateOrder({ order }) {
  const { updateOrder, isUpdating } = useUpdateOrder();
  const { orderId, ...defaultValues } = order;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = (data) => {
    // console.log(data);
    updateOrder({order:data, orderId });
  };
  return (
    <main>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className={styles.inputWrapper}>
          <Select
            label="Payment Status"
            options={["Pending", "Paid"]}
            required={true}
            id="paymentStatus"
            register={register}
            validation={{ required: "Payment status must be required." }}
            errors={errors}
          />
          <Select
            label="Order Status"
            options={["Pending", "Processing", "Shipped", "Delivered"]}
            required={true}
            id="orderStatus"
            register={register}
            validation={{ required: "Order status must be required." }}
            errors={errors}
          />
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

export default UpdateOrder;
