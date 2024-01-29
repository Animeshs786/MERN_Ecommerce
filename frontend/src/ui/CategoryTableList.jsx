import { useState } from "react";
import { useDispatch } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";

import CustomTable from "./CustomTable";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import { dateFormat } from "../utils/helper";
import { useGetCategories } from "../features/category/useGetCategories";
import CustomModal from "./CustomModal";
import CreateUpdateCategory from "./CreateUpdateCategory";
import { useDeleteCategory } from "../features/category/useDeleteCategory";
import { setIsOpen } from "../features/modal/modalSlice";
import NotFound from "./NotFound";

function CategoryTableList() {
  const [category, setCategory] = useState({});
  const dispatch = useDispatch();

  const { isLoading, error, categories } = useGetCategories();
  const { deleteCategory, isDeleting } = useDeleteCategory();

  const createHandler = () => {
    dispatch(setIsOpen(true));
    setCategory({});
  };

  const editHandler = (data) => {
    dispatch(setIsOpen(true));
    setCategory((prev) => {
      return { ...prev, ...data };
    });
  };

  const deleteHandler = (id) => {
    const confirm = window.confirm("Are you sure want to delete.");
    if (confirm) {
      deleteCategory(id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  // if (categories.length <= 0) {
  //   return (
  //     <NotFound>
  //       <img src="/images/resultNotFound.png" alt="not-found-img" />
  //     </NotFound>
  //   );
  // }


  return (
    <div>
      <CreateNewFolderIcon onClick={createHandler} className="createIcon" />
      <CustomModal>
        <CreateUpdateCategory category={category} />
      </CustomModal>

      <CustomTable thead={["Sr No.", "Category", "Created At", ""]}>
        {categories.map((el, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el.name}</td>
              <td>{dateFormat(el.createdAt)}</td>
              <td className="iconWrapper">
                <ModeEditIcon
                  onClick={() => editHandler(el)}
                  className="editIcon"
                />
                <DeleteIcon
                  className="editIcon"
                  disabled={isDeleting}
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

export default CategoryTableList;
