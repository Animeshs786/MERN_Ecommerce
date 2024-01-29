import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import CustomTable from "./CustomTable";
import { getMyOrders } from "../services/apiOrder";
import Loader from "./Loader";
import Error from "./Error";
import { currencyFormat, dateFormat } from "../utils/helper";
import NotFound from "./NotFound";

function MyOrderList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: getMyOrders,
  });

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  const { order } = data?.data || {};

  if (order.length <= 0) {
    return (
      <NotFound>
        <img src="/images/resultNotFound.png" alt="not-found-img" />
      </NotFound>
    );
  }

  return (
    <CustomTable thead={["Sr No.", "Order Id", "Price", "Order At", ""]}>
      {order.map((el, i) => {
        return (
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{el._id}</td>
            <td>
              {currencyFormat(el.price + el.shippingPrice + el.gst + el.tax)}
            </td>
            <td>{dateFormat(el.orderAt)}</td>
            <td>
              <Link to={el._id}>
                <RemoveRedEyeIcon className="showIcon" />
              </Link>
            </td>
          </tr>
        );
      })}
    </CustomTable>
  );
}

export default MyOrderList;
