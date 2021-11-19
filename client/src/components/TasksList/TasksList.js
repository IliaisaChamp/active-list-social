import PropTypes from 'prop-types';
// material
import { Grid } from '@mui/material';
import TaskCard from '../TaskCard/TaskCard';

// ----------------------------------------------------------------------

TasksList.propTypes = {
  tasks: PropTypes.array.isRequired,
};

export default function TasksList({ tasks, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {tasks.map((task) => (
        <Grid key={task.id} item xs={12} sm={6} md={3}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
}
