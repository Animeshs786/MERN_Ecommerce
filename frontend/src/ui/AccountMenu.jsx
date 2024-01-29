import { Button, Menu, MenuItem } from '@mui/material';
import styles from './AccountMenu.module.css';
import { useState } from 'react';
function AccountMenu() {
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
              padding: "8px 0",
              width: "100%",
              maxWidth: "245px",
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
          <MenuItem className={styles.menuItems} onClick={handleClose}>
            My Account
          </MenuItem>
          <MenuItem className={styles.menuItems} onClick={handleClose}>
            My Wish List (0)
          </MenuItem>
          <MenuItem className={styles.menuItems} onClick={handleClose}>
            Compare (0)
          </MenuItem>
          <MenuItem className={styles.menuItems} onClick={handleClose}>
            Create an Account Sign In
          </MenuItem>
          <MenuItem className={styles.menuItems} onClick={handleClose}>
            Sign In
          </MenuItem>
        </Menu>
  
        
      </div>
    )
}

export default AccountMenu
