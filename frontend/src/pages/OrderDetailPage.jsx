import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import BreadCrumbs from "../ui/BreadCrumbs";
import Heading from "../ui/Heading";
import styles from "./OrderDetailPage.module.css";
import { getOrder } from "../services/apiOrder";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import OrderItems from "../ui/OrderItems";
import OrderDetailSummary from "../ui/OrderDetailSummary";
import Support from "../ui/Support";

function OrderDetailPage() {
  const { id: orderId } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", orderId],
    queryFn: () => getOrder(orderId),
  });

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  const { order } = data?.data || {};

  return (
    <>
      <div className="container">
        <BreadCrumbs link="Dashboard" />
        <div className={styles.orderWrapper}>
          <Heading heading="Order Detail" />
          <div className={styles.orderMainWrapper}>
            <div className={styles.orderItemWrapper}>
              <div className={styles.tableWrapper}>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th></th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.product.map((item, i) => (
                      <OrderItems item={item} key={i} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.summaryWrapper}>
              <OrderDetailSummary order={order} />
              <div className={styles.additionalInfo}>
                <div className={styles.boxWrapper}>
                  <div className={styles.header}>
                    <h4>Order Information</h4>
                  </div>
                  <div className={styles.contentWrapper}>
                    <div>
                      <div>
                        <h5>Pyament Type</h5>
                        <p>:</p>
                      </div>
                      <div>
                        <span>{order.paymentType}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h5>Pyament status</h5>
                        <p>:</p>
                      </div>
                      <div>
                        <span>{order.paymentStatus}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h5>Order status</h5>
                        <p>:</p>
                      </div>
                      <div>
                        <span>{order.orderStatus}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.boxWrapper}>
                  <div className={styles.header}>
                    <h4>Shipping Information</h4>
                  </div>
                  <div className={styles.contentWrapper}>
                    <div>
                      <div>
                        <h5>Send to</h5>
                        <p>:</p>
                      </div>
                      <div>
                        <span>{order.address}</span>
                      </div>
                    </div>
                    <div>
                      <div>
                        <h5>Contact No.</h5>
                        <p>:</p>
                      </div>
                      <div>
                        <span>{order.phoneNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Support marginTop="60px" />
    </>
  );
}

export default OrderDetailPage;
