import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// mui
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grow from '@mui/material/Grow';
// import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import GroupIcon from '@mui/icons-material/Group';

import ModalDeleteTask from '../ModalDeleteTask/ModalDeleteTask';
import ButtonPopover from '../ButtonPopover/ButtonPopover';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { currentTaskReports } from '../../store/ac/reportsAC';
import { useDispatch } from 'react-redux';

const completedItemStyle = {
  backgroundColor: 'primary.lighter',
  color: 'primary.darker',
};
const incompletedItemStyle = {
  backgroundColor: 'error.lighter',
  color: 'error.darker',
};

const RootStyle = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2, 2),
  // borderRadius: 30,
  marginBottom: 5,
  '&:last-child': {
    marginBottom: 0,
  },
}));

const TasksItem = ({ task, subscribeOnTaskToggle, isSelfPage, completeTaskHandler }) => {
  const location = useLocation();
  const [checked, setChecked] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const subscribeHandleClose = () => {
    setOpen(false);
    setChecked(false);
    subscribeOnTaskToggle(task?.id);
  };

  const isPageTask = location.pathname.includes('tasks');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentTaskIdBitch = () => {
    dispatch(currentTaskReports(task?.id));
    navigate(`/tasks/${task?.id}`);
  };

  return (
    <Grow in={checked} timeout={500}>
      <RootStyle sx={isPageTask ? {} : task?.isDone ? { ...completedItemStyle } : { ...incompletedItemStyle }}>
        <ModalDeleteTask open={open} handleOpen={handleOpen} handleClose={handleClose} subscribeHandleClose={subscribeHandleClose} />
        <ListItemText
          disableTypography
          secondaryTypographyProps={{}}
          sx={{ display: 'block' }}
          secondary={task?.Reports !== undefined ? 'Количество отчетов' + ' ' + task?.Reports + ' ' : false}>
          <Typography
            onClick={() => currentTaskIdBitch()}
            variant="subtitle2"
            sx={{ '&:hover': { cursor: 'pointer' }, display: 'flex' }}>
            {task?.title}
          </Typography>
        </ListItemText>

        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          {isPageTask ? (
            <>
              <Box sx={{ display: 'flex', marginRight: 10 }}>
                <GroupIcon sx={{ marginRight: 2 }} />
                <Typography>{task?.Users}</Typography>
              </Box>
              <ButtonPopover
                edge="end"
                taskId={task?.id}
                subscribeOnTaskToggle={subscribeOnTaskToggle}
                aria-label="add-task"
                setChecked={setChecked}
                text={'Добавить цель'}>
                <AddIcon />
              </ButtonPopover>
            </>
          ) : isSelfPage ? (
            <>
              {!task?.isDone && (
                <ButtonPopover
                  edge="end"
                  taskId={task?.id}
                  taskTitle={task?.title}
                  completeTaskHandler={completeTaskHandler}
                  setChecked={setChecked}
                  aria-label="complete-task"
                  text={'Отметить как выполненое'}>
                  <CheckCircleIcon />
                </ButtonPopover>
              )}
              <ButtonPopover
                component={Link}
                to={`/reports/task/${task?.id}/`}
                edge="end"
                taskId={task.id}
                aria-label="add-report"
                text={'Добавить отчет'}>
                <TaskIcon />
              </ButtonPopover>

              {!task?.isDone && (
                <ButtonPopover taskId={task?.id} edge="end" handleOpen={handleOpen} aria-label="delete" text={'Удалить'}>
                  <DeleteIcon />
                </ButtonPopover>
              )}
            </>
          ) : null}
        </div>
      </RootStyle>
    </Grow>
  );
};

export default TasksItem;
