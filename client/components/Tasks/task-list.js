// @flow
//TODO: Convert into a functional component
import React from 'react';
import { Link } from 'react-router-dom';

import TaskTable from './task-table';

type Props = {
  onSelectTask: any,
  newTask: any,
  type: string,
  tasksTab: string,
  tasklist: any
};
const TaskList = (props: Props) => {
  let hideButton = '';

  if (props.type === 'All') {
    hideButton = 'hidden';
  }

  return (
    <div className={props.tasksTab}>
      <div>
        <TaskTable tasklist={props.tasklist} onSelectTask={props.onSelectTask} />
      </div>
      <div className={hideButton}>
        <Link to="/task/new">
          <input type="submit" value="New Task" className="btn btn-success pull-left" onClick={props.newTask} />
        </Link>
      </div>
    </div>
  );
};

export default TaskList;
