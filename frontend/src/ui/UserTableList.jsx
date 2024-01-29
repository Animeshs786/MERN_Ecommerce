import { useState } from "react";
import { useDispatch } from "react-redux";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

import CustomTable from "./CustomTable";
import Loader from "../ui/Loader";
import Error from "../ui/Error";
import { dateFormat } from "../utils/helper";
import CustomModal from "./CustomModal";
import { useGetUsers } from "../features/user/useGetUsers";
import UpdateUser from "./UpdateUser";
import { useDeleteUser } from "../features/user/useDeleteUser";
import { setIsOpen } from "../features/modal/modalSlice";
import NotFound from "./NotFound";

function UserTableList() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();

  const { isLoading, error, users } = useGetUsers();
  const { deleteUser, isDeleting } = useDeleteUser();

  const editHandler = (data) => {
    dispatch(setIsOpen(true));
    setUser((prev) => {
      return {
        ...prev,
        userId: data._id,
        email: data.email,
        name: data.name,
        role: data.role,
      };
    });
  };

  const deleteHandler = (id) => {
    const confirm = window.confirm("Are you sure want to delete.");
    if (confirm) {
      deleteUser(id);
    }
  };

  if (isLoading) return <Loader />;
  if (error) return <Error error={error} />;

  if (users.length <= 0) {
    return (
      <NotFound>
        <img src="/images/resultNotFound.png" alt="not-found-img" />
      </NotFound>
    );
  }

  return (
    <div>
      <CustomModal>
        <UpdateUser user={user} />
      </CustomModal>

      <CustomTable
        thead={["Sr No.", "Name", "Email", "Role", "Creared At", ""]}
      >
        {users?.map((el, i) => {
          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>{el.role}</td>
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

export default UserTableList;
