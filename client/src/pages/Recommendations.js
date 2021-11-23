import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { filter } from 'lodash';
import { sentenceCase } from 'change-case';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

// components
import Page from '../components/Page/Page';
import Label from '../components/Label/Label';
import Scrollbar from '../components/Scrollbar/Scrollbar';
import SearchNotFound from '../components/SearchNotFound/SearchNotFound';
//
import RecommendationsHead from '../components/RecommendationsHead/RecommentationsHead';
import RecommendationsToolbar from '../components/RecommendationsToolbar/RecommendationsToolbar';

//
import USERLIST from '../_mocks_/user';
import { getRecommendedUsers } from '../store/ac/usersListAC';
import RecommendationItem from '../components/RecommendationItem/RecommendationItem';

import { isSubscribed } from '../utils/isSubscribed';
import { subscribeOnUser, unsubscribeFromUser } from '../store/ac/subscribesAC';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'nickName', label: 'nickName', alignRight: false },
  { id: 'rang', label: 'Rang', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

const Recommendations = () => {
  const usersList = useSelector((state) => state.usersList);
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // console.log(usersList);
  useEffect(() => {
    dispatch(getRecommendedUsers());
    // return () => {
    //   cleanup
    // }
  }, []);
  // const handleRequestSort = (event, property) => {
  //   const isAsc = orderBy === property && order === 'asc';
  //   setOrder(isAsc ? 'desc' : 'asc');
  //   setOrderBy(property);
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = USERLIST.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleFilterByName = (event) => {
  //   setFilterName(event.target.value);
  // };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  // const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  // const isUserNotFound = filteredUsers.length === 0;

  // const subcsribHandler = use
  const subcsribeHandler = useCallback((userId, followingsId) => {
    dispatch(subscribeOnUser(userId, followingsId));
  }, []);

  const unsubcsribeHandler = useCallback((userId, followingsId) => {
    dispatch(unsubscribeFromUser(userId, followingsId));
  }, []);
  return (
    <Page title="Подписки">
      <Container>
        <Card>
          <RecommendationsToolbar
            numSelected={selected.length}
            filterName={filterName}
            // onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RecommendationsHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {usersList.map((user) => (
                    <RecommendationItem
                      key={user.id}
                      userInfo={user}
                      subcsribeHandler={subcsribeHandler}
                      unsubcsribeHandler={unsubcsribeHandler}
                    />
                  ))}
                  {/* {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    // const { id, name, role, status, nickname, avatarUrl, isVerified } = row;
                    const { id, name, rang, status, nickname, avatarUrl } = row;
                    const isItemSelected = selected.indexOf(name) !== -1;

                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left">{nickname}</TableCell>
                        <TableCell align="left">{rang}</TableCell>
                        <TableCell align="left">
                          <Label variant="ghost" color={(status === 'Offline' && 'error') || 'success'}>
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <Button
                            variant="contained"
                            component={RouterLink}
                            to="#"
                            startIcon={<Icon icon={plusFill} />}>
                            Subscribe
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })} */}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>
                {/* {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )} */}
              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
};

export default Recommendations;
