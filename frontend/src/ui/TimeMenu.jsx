import { Box, Divider, MenuList, Paper } from '@mui/material';
import styles from './TimeMenu.module.css';
function TimeMenu() {
    return (
        <Paper sx={{ width: "100%", maxWidth: "262px", }}>
        <MenuList sx={{padding:0}}>
          <Box className={styles.listWrapper}>
            <img src="/images/watch-icon.svg" alt="watch-icon" />
            <div className={styles.timeInfo}>
              <p>We are open:</p>
              <p><span>Mon-Thu:</span> 9:00 AM - 5:30 PM</p>
              <p><span>Fri:</span> 9:00 AM - 6:00 PM</p>
              <p><span>Sat:</span> 11:00 AM - 5:00 PM</p>
            </div>
          </Box>
          <Divider />
          <Box className={styles.listWrapper}>
            <img src="/images/location-icon.svg" alt="location-icon" />
            <div className={styles.address}>
              <p>Address: 1234 Street Adress, <br/> City Address, 1234</p>
            </div>
          </Box>
          <Divider />
          <Box className={styles.phone}>
            <p>
              <span>Phones:</span>
              <span> (00) 1234 5678</span>
            </p>
            <p>
              <span>Phones:</span>
              <span> (00) 1234 5678</span>
            </p>
          </Box>
        </MenuList>
      </Paper>
    )
}

export default TimeMenu
