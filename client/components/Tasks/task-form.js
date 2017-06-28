import React from 'react';
import { Link } from 'react-router-dom';
import TextArea from '../../components/Common/text-area';
import TextInputTask from '../../components/Common/form-text-input';
import DateTimePicker from '../../components/Common/date-picker';
import SelectInput from '../../components/Common/select-input';

type Props = {
  onChange: any,
  errors: any,
  onDateChange: any,
  onSaveTask: any,
  onCancel: any,
  onDeleteTask: any,
  hideDelete: string,
  submitting: boolean,
  status: Array<mixed>,
  task: any,
  users: Array<mixed>
};

const TaskForm = ({
  errors,
  task,
  status,
  users,
  onSaveTask,
  hideDelete,
  onDeleteTask,
  onChange,
  onDateChange,
  onCancel,
  submitting
}: Props) => (
  <form className="form form-horizontal">
    <TextInputTask
      name="TKName"
      label="Task Name"
      value={task.TKName}
      onChange={onChange}
      placeholder="Enter Task Name (Required)"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-9"
      error={errors.TKName}
    />

    <DateTimePicker
      name="TKStart"
      label="Start date"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-2"
      value={task.TKStart}
      onChange={onDateChange.bind(null, 'TKStart')}
      error={errors.TKStart}
    />

    <DateTimePicker
      name="TKTarg"
      label="Target date"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-2"
      value={task.TKTarg}
      onChange={onDateChange.bind(null, 'TKTarg')}
      error={errors.TKTarg}
    />

    <SelectInput
      name="TKStat"
      label="Status"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-3"
      value={task.TKStat}
      defaultOption="Select Status"
      options={status}
      onChange={onChange}
      error={errors.TKStat}
    />

    <SelectInput
      name="TKChamp"
      label="Owner"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-3"
      value={task.TKChamp}
      defaultOption="Select Task Owner"
      options={users}
      onChange={onChange}
      error={errors.TKChamp}
    />

    <TextArea
      name="TKComment"
      label="Comment"
      labelstyle="col-sm-2 control-label"
      inputdiv="col-sm-9"
      value={task.TKComment || ''}
      onChange={onChange}
      rows="6"
    />

    <div className="col-sm-9 col-md-offset-2">
      <button className="btn btn-success pull-left" disabled={submitting} onClick={onSaveTask}>
        {submitting ? <i /> : <i />} Save Task
      </button>
      <button className="btn btn-info dp-margin-10-LR" disabled={submitting} onClick={onCancel}>
        Cancel
      </button>
      <Link to={`/change/${task.SourceId}`}>
        <button className={hideDelete} disabled={submitting} onClick={onDeleteTask}>
          Delete
        </button>
      </Link>
    </div>
  </form>
);

export default TaskForm;
