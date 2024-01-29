import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Box from "@mui/material/Box";

import { setIsOpen } from "../features/modal/modalSlice";

const style = {
  position: "absolute",
  top: "20%",
  left: "50%",
  transform: "translateX(-50%)",
  width: " 100%",
  maxWidth: "500px",
  backgroundColor: "var(--base-light-white)",
  borderRadius: "4px",
  padding: " 20px 20px",
  paddingBottom: "0",
};

function CustomModal({ children }) {

  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(setIsOpen(false));

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isOpen}>
          <Box sx={style}>{children}</Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default CustomModal;
