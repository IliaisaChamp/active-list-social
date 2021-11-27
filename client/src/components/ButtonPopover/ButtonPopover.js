import React, { useCallback } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

//--------------------------------------------------------------

const ButtonPopover = ({
  text,
  children,
  handleOpen,
  completeTaskHandler,
  subscribeOnTaskToggle,
  taskId,
  component,
  to,
  setChecked,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const clickHandler = useCallback(() => {
    setChecked(false);
    setTimeout(() => {
      completeTaskHandler ? completeTaskHandler(taskId) : subscribeOnTaskToggle(taskId);
      setChecked(true);
    }, 500);
    // eslint-disable-next-line
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
        disableRestoreFocus
        disableScrollLock>
        <Typography sx={{ p: 1 }}>{text}</Typography>
      </Popover>
    </>
  );
};

export default ButtonPopover;
