import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import CustomTable from "./CustomTable";
import { getAllOrders } from "../services/apiOrder";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import { currencyFormat, dateFormat } from "../utils/helper";
import CustomModal from "./CustomModal";
import UpdateOrder from "./UpdateOrder";
import { setIsOpen } from "../features/modal/modalSlice";
import NotFound from "./NotFound";

function OrderList() {
  const [order, setOrder] = useState({});
  const dispatch = useDispatch();

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getAllOrders,
  });

  const modalHandler = (order) => {
    dispatch(setIsOpen(true));
    setOrder((prev) => {
      return {
        ...prev,
        orderId: order._id,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
      };
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  const { order: orders } = data?.data || {};

  if (orders.length <= 0) {
    return (
      <NotFound>
        <img src="/images/resultNotFound.png" alt="not-found-img" />
      </NotFound>
    );
  }

  return (
    <div>
      <CustomModal>
        <UpdateOrder order={order} />
      </CustomModal>
      <CustomTable thead={["Sr No.", "Order Id", "Price", "Order At", ""]}>
        {orders.map((el, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el._id}</td>
              <td>
                {currencyFormat(el.price + el.shippingPrice + el.gst + el.tax)}
              </td>
              <td>{dateFormat(el.orderAt)}</td>
              <td className="iconWrapper">
                <Link to={el._id}>
                  <RemoveRedEyeIcon className="showIcon" />
                </Link>
                <ModeEditIcon   className="editIcon" onClick={() => modalHandler(el)} />
              </td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
}

export default OrderList;
