import { useSelector, useDispatch } from "react-redux";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { setCurrentPage } from "../features/product/productSlice";

function CustomPagination({ totalPage }) {
  const { currentPage } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };

  return (
    <Stack spacing={2}>
      <Pagination
        count={totalPage}
        page={currentPage}
        color="primary"
        onChange={handlePageChange}
        sx={{
          ".css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root": {
            border: "2px solid var(--base-gray)",
            fontSize: "13px",
            fontWeight: 600,
            color: "var(--base-gray)",
            fontFamily: "Poppins",
          },
          ".css-1to7aaw-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected":
            {
              background: "var(--base-blue)",
              border: "none",
              color: "var(--base-light-white)",
            },
        }}
      />
    </Stack>
  );
}

export default CustomPagination;
