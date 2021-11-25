import React from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const buttonContainer = {
  display: 'flex',
};

const contentContainer = {
  position: 'absolute',
  top: '35%',
  display: 'flex',
  width: 300,
  flexDirection: 'column',
  alignItems: 'center',
};

const button = {
  marginRight: 2,
  '&:last-child': {
    marginRight: 0,
  },
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  height: 350,
  background: 'center / cover no-repeat url("../static/img/sdalsa.png")',
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
};

const ModalDeleteTask = ({ open, handleClose, handleOpen, subscribeHandleClose }) => {
  return (
    <div>
      <Modal
        keepMounted
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <Box sx={style}>
            <Box sx={contentContainer}>
              <Typography sx={{ marginBottom: 2 }} id="transition-modal-title" variant="h6" component="h2">
                Уже сдался?
              </Typography>
              <Box sx={buttonContainer}>
                <Button sx={button} variant="contained" onClick={subscribeHandleClose}>
                  Да
                </Button>
                <Button sx={button} variant="contained" onClick={handleClose}>
                  Нет
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalDeleteTask;
