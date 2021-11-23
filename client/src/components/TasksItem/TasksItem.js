import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

// mui
import { styled } from '@mui/material/styles';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
// import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import AddIcon from '@mui/icons-material/Add';
import ModalDeleteTask from '../ModalDeleteTask/ModalDeleteTask';
import ButtonPopover from '../ButtonPopover/ButtonPopover';

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

const TasksItem = ({ task, subscribeToggle, isSelfPage, completeTaskHandler }) => {
  const location = useLocation();
  // const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const subscribeHandleClose = () => {
    setOpen(false);
    subscribeToggle(task.id);
  };

  const isPageTask = location.pathname.includes('tasks');

  return (
    <RootStyle
      // divider={true}
      sx={isPageTask ? {} : task.isDone ? { ...completedItemStyle } : { ...incompletedItemStyle }}>
      <ModalDeleteTask
        open={open}
        handleOpen={handleOpen}
        handleClose={handleClose}
        subscribeHandleClose={subscribeHandleClose}
      />
      {/* <ButtonPopover /> */}
      <ListItemText primary={task.title} primaryTypographyProps={{ variant: 'subtitle2' }} />

      <div style={{ display: 'flex', alignItems: 'baseline' }}>
        {isPageTask ? (
          // <IconButton onClick={() => subscribeToggle(task.id)} edge="end" aria-label="delete">
          //   <AddIcon />
          // </IconButton>
          <ButtonPopover
            edge="end"
            taskId={task.id}
            subscribeToggle={subscribeToggle}
            aria-label="add-task"
            text={'Добавить цель'}>
            <AddIcon />
          </ButtonPopover>
        ) : isSelfPage ? (
          <>
            {!task.isDone && (
              <ButtonPopover
                edge="end"
                taskId={task.id}
                completeTaskHandler={completeTaskHandler}
                aria-label="complete-task"
                text={'Отметить как выполненое'}>
                <CheckCircleIcon />
              </ButtonPopover>
            )}
            <ButtonPopover
              component={Link}
              to={`/reports/task/${task.id}/`}
              edge="end"
              taskId={task.id}
              aria-label="add-report"
              text={'Добавить отчет'}>
              <TaskIcon />
            </ButtonPopover>

            {/* <IconButton edge="end" component={Link} to={`/reports/task/${task.id}/`} aria-label="add-report">
              <TaskIcon />
            </IconButton> */}

            {!task.isDone && (
              <ButtonPopover taskId={task.id} edge="end" handleOpen={handleOpen} aria-label="delete" text={'Удалить'}>
                <DeleteIcon />
              </ButtonPopover>
            )}
          </>
        ) : null}
      </div>
    </RootStyle>
  );
};

export default TasksItem;
