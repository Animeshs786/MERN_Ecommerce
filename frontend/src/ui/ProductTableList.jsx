import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import CustomTable from "./CustomTable";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import { currencyFormat } from "../utils/helper";
import { useGetProducts } from "../features/product/useGetProducts";
import { useDeleteProduct } from "../features/product/useDeleteProduct";
import NotFound from "./NotFound";

function ProductTableList() {
  const { product, isLoading, error } = useGetProducts();
  const { deleteProduct, isDelete } = useDeleteProduct();

  const deleteHandler = (id) => {
    const isConfirm = window.confirm("Are you sure want to delete.");
    if (isConfirm) {
      deleteProduct(id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  // if (product.length <= 0) {
  //   return (
  //     <NotFound>
  //       <img src="/images/resultNotFound.png" alt="not-found-img" />
  //     </NotFound>
  //   );
  // }


  return (
    <div>
      <Link to="create">
        <CreateNewFolderIcon className="createIcon" />
      </Link>
      <CustomTable thead={["Sr No.", "Item", "Price", "Quantity", ""]}>
        {product.map((el, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el.name}</td>
              <td>{currencyFormat(el.price - el.discount)}</td>
              <td>{el.quantity}</td>
              <td className="iconWrapper">
                <Link to={`update/${el._id}`}>
                  <ModeEditIcon className="editIcon" />
                </Link>
                <DeleteIcon
                  className="editIcon"
                  disabled={isDelete}
                  onClick={() => deleteHandler(el._id)}
                />
              </td>
            </tr>
          );
        })}
      </CustomTable>
    </div>
  );
}

export default ProductTableList;
