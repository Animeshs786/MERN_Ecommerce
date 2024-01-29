import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCartSummary } from "../hooks/useCartSummary";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./CheckoutPage.module.css";
import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import OrderSummary from "../ui/OrderSummary";
import Select from "../ui/Select";
import { GST, SHIPPING, TAX } from "../utils/constant";
import { createOrder } from "../services/apiOrder";
import Support from "../ui/Support";
import { clearCart } from "../features/cart/cartSlice";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Order placed successfully.");
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      reset();
      window.setTimeout(() => {
        dispatch(clearCart());
        navigate("/dashboard/myOrder", { replace: true });
      }, 2000);
    },
    onError: (err) => toast.error(err.message),
  });

  const { cart } = useSelector((state) => state.cart);
  const { totalPrice: price } = useCartSummary();

  const onSubmit = (data) => {
    const order = {
      product: cart,
      ...data,
      price,
      shippingPrice: SHIPPING,
      gst: GST,
      tax: TAX,
    };
    mutate(order);
  };

  return (
    <>
      <div className="container">
        <BreadCrumbs link="Checkout" />
        <div className={styles.checkoutWrapper}>
          <Heading heading="Checkout" />
          <div className={styles.checkoutMainWrapper}>
            <div className={styles.contentWrapper}>
              <header>Shipping Address</header>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputWrapper}>
                  <Input
                    type="text"
                    placeholder="Your Address"
                    label="Street Address"
                    required={true}
                    id="address"
                    register={register}
                    validation={{ required: "Address must be required." }}
                    errors={errors}
                  />
                  <Input
                    type="number"
                    placeholder="Your Pincode"
                    label="Pincode"
                    id="pincode"
                    required={true}
                    register={register}
                    validation={{ required: "Pincode must be required." }}
                    errors={errors}
                  />
                  <Input
                    type="number"
                    placeholder="Your Phone Number"
                    label="Phone Number"
                    id="phoneNumber"
                    required={true}
                    register={register}
                    validation={{ required: "Phone Number must be required." }}
                    errors={errors}
                  />
                  <Select
                    options={["India", "United States", "Pakistan", "Japan"]}
                    required={true}
                    id="country"
                    label="Your Country"
                    register={register}
                    validation={{ required: "Country must be required." }}
                    errors={errors}
                  />
                </div>
                <div className={styles.paymentWrapper}>
                  <div>
                    <label>Payment Mode</label>
                    <div className={styles.cashMode}>
                      <input
                        type="radio"
                        name="paymentType"
                        value="Cash On Delivery"
                        id="paymentType"
                        checked
                        {...register("paymentType")}
                      />
                      <span>Cash On Delivery</span>
                    </div>
                    <div>
                      <input
                        disabled
                        type="radio"
                        name="paymentType"
                        id="paymentType"
                        value="Stripe"
                      />
                      <span>Paypal</span>
                    </div>
                  </div>
                </div>
                <div className={styles.buttonWrapper}>
                  <Button disabled={isLoading} width="210px">
                    {isLoading ? "Loading..." : "Next"}
                  </Button>
                </div>
              </form>
            </div>
            <OrderSummary />
          </div>
        </div>
      </div>

      <Support marginTop="60px" />
    </>
  );
}

export default CheckoutPage;
