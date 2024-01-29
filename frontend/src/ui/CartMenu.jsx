import { useState } from "react";
import styles from "./CartMenu.module.css";
import { Button, Menu } from "@mui/material";

function CartMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        sx={{ borderRadius: "10px" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: "0px 0",
            width: "100%",
            maxWidth: "310px",
            height: "auto",
            minHeight: "189.389px",
            overflow: "visible",
            filter: "drop-shadow( rgba(0, 0, 0, 0.16) 0px 1px 4px)",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <div className={styles.cartWrapper}>
          <div className={styles.header}>
            <p>My Cart</p>
            <span>2 item in cart</span>
            <button>View or Edit Your Cart</button>
          </div>
          <div className={styles.itemsList}>
            <ul>
              <li>
                <span>1</span>
                <span>x</span>
              </li>
              <li>
                <img src="/images/cartImg.png" alt="cartImg" />
              </li>
              <li>
                EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
              </li>
              <li>
                <img src="/images/delete-icon.svg" alt="delete-icon" />
                <img src="/images/ellipse-small.svg" alt="ellipse-small" />
                <img src="/images/edit-icon.svg" alt="edit-icon" />
              </li>
            </ul>
            <ul>
              <li>
                <span>1</span>
                <span>x</span>
              </li>
              <li>
                <img src="/images/cartImg.png" alt="cartImg" />
              </li>
              <li>
                EX DISPLAY : MSI Pro 16 Flex-036AU 15.6 MULTITOUCH All-In-On...
              </li>
              <li>
                <img src="/images/delete-icon.svg" alt="delete-icon" />
                <img src="/images/ellipse-small.svg" alt="ellipse-small" />
                <img src="/images/edit-icon.svg" alt="edit-icon" />
              </li>
            </ul>
          </div>
          <div className={styles.footer}>
            <p>
              Subtotal: <strong>$499.00</strong>
            </p>
            <button>Go to Checkout</button>
            <button>
              <span>Check out with</span>
              <img src="/images/paypal.svg" alt="paypal" />
            </button>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default CartMenu;
