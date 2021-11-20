import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

// material
import { Card, Table, TableRow, TableBody, TableCell, Container, TableContainer } from '@mui/material';
// components
import Page from '../Page/Page';
import Scrollbar from '../Scrollbar/Scrollbar';
import SearchNotFound from '../SearchNotFound/SearchNotFound';
//
// import { UserListHead, UserListToolbar } from '../NearestFolder/index';
import TasksListHead from './TasksListHead';
import TasksListToolbar from './TasksListToolbar';
import TasksItem from './TasksItem';

//
import { getFilteredTasks } from '../../store/ac/tasksAC';

// ----------------------------------------------------------------------

export default function TasksList({ tasks, subscribeHandler, buttonName }) {
  const [filterName, setFilterName] = useState('');
  const location = useLocation();
  const isPageProfile = location.pathname.includes('profile');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isPageProfile) {
      dispatch(getFilteredTasks(filterName));
    }
  }, [filterName]);

  const filterHandler = (event) => {
    setFilterName(event.target.value);
  };

  const isNoTasks = tasks.length === 0;

  return (
    <Page title="Tasks | UI">
      <Container disableGutters>
        <Card>
          {isPageProfile ? <></> : <TasksListToolbar filterName={filterName} onFilterName={filterHandler} />}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <TasksListHead />
                <TableBody>
                  {tasks.map((task) => (
                    <TasksItem
                      key={task.id}
                      id={task.id}
                      title={task.title}
                      subscribeHandler={subscribeHandler}
                      buttonName={buttonName}
                    />
                  ))}
                </TableBody>
                {isNoTasks && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
