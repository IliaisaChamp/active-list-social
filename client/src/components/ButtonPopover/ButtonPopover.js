import React, { useCallback } from 'react';

// mui
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

const ButtonPopover = ({ text, children, handleOpen, completeTaskHandler, subscribeToggle, taskId, component, to }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const clickHandler = useCallback(() => {
    completeTaskHandler ? completeTaskHandler(taskId) : subscribeToggle(taskId);
  }, []);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        component={component}
        to={to}
        onClick={component ? () => {} : handleOpen || clickHandler}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}>
        {children}
      </IconButton>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus>
        <Typography sx={{ p: 1 }}>{text}</Typography>
      </Popover>
    </>
  );
};

export default ButtonPopover;
