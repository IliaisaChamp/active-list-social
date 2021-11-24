import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';

import './Paginate.scss';
import List from '@mui/material/List';
import { TransitionGroup } from 'react-transition-group';

import TasksItem from '../TasksItem/TasksItem';

// Example items, to simulate fetching from another resources.

function Items({ currentTasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) {
  return (
    <>
      {currentTasks?.map((task) => (
        <TasksItem
          key={task?.id}
          task={task}
          subscribeOnTaskToggle={subscribeOnTaskToggle}
          isSelfPage={isSelfPage}
          completeTaskHandler={completeTaskHandler}
        />
      ))}
    </>
  );
}

function PaginatedItems({ itemsPerPage, tasks, subscribeOnTaskToggle, completeTaskHandler, isSelfPage }) {
  // We start with an empty list of items.
  const [currentTasks, setCurrentTasks] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentTasks(tasks.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(tasks.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, tasks]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % tasks.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>
      <List dense={true} sx={{ padding: 0 }}>
        {/* <TransitionGroup> */}
        <Items
          currentTasks={currentTasks}
          subscribeOnTaskToggle={subscribeOnTaskToggle}
          completeTaskHandler={completeTaskHandler}
          isSelfPage={isSelfPage}
        />
        {/* </TransitionGroup> */}
      </List>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        containerClassName="page"
        pageClassName="page__numbers"
        nextLinkClassName="material-icons"
        previousLabel="< previous"
      />
    </>
  );
}

export default PaginatedItems;
