import React, { Component } from 'react';
import { connect } from 'react-redux';
import toastr from 'toastr';
import classNames from 'classnames';
import ChangeForm from '../../components/Changes/change-form';
import { changeFormIsValid } from './change-form.validation';
import { usersFormattedForDropdown } from '../../selectors/selectors';
import TaskList from '../../components/Tasks/task-list';
import FileList from '../../containers/Files/file-list';
import ChangeLog from '../../components/Changes/change-log';
import ErrorPanel from '../../components/Common/error-panel';

import './changeDetail-style.css';

/* actions */
import { addChange, createLog, closeChange, editChange, getChange } from '../../actions/actions_changes';
import { getTask, getProjectTasks } from '../../actions/actions_tasks';
import { setMain, setTitle } from '../../actions/actions_main';

class ChangeDetail extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      change: Object.assign({}, props.change),
      changeTitle: 'Get the main title',
      ccNo: '',
      dirty: false,
      DetailTab: 'show',
      errors: [],
      errorsObj: {},
      FilesTab: 'hidden',
      fCount: 0,
      LogTab: 'hidden',
      mainId: 'new',
      tasks: [],
      TasksTab: 'hidden',
      tCount: 0,
      status: [
        { value: 1, text: 'Review' },
        { value: 2, text: 'Approved' },
        { value: 3, text: 'On-hold' },
        { value: 4, text: 'Closed' },
        { value: 5, text: 'Cancelled' }
      ]
    };

    this.cancelChange = this.cancelChange.bind(this);
    this.onApprove = this.onApprove.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.updateChangeState = this.updateChangeState.bind(this);
    this.updateChangeStateDate = this.updateChangeStateDate.bind(this);
    this.onFinal = this.onFinal.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.saveChange = this.saveChange.bind(this);
  }

  componentWillMount() {
    const ccNo = this.props.match.params.id;
    if (this.props.main.loading === true) {
      this.props.getProjectTasks(ccNo);
    }
    this.setState({ ccNo });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.change._id !== nextProps.change._id) {
      // Necessary to populate form when existing course is loaded directly.
      this.setState({ change: Object.assign({}, nextProps.change) });
    }
  }

  componentWillUnmount() {
    this.props.setTitle(`${this.props.change.CC_No} - ${this.props.change.CC_Descpt}`);
  }

  onRefresh() {
    this.props.getChange(this.state.ccNo);
  }

  onCancel() {
    this.logMessage('Change Cancelled');
  }

  onApprove() {
    this.logMessage('Approved to Implement');
  }

  onFinal() {
    this.logMessage('Change Closed');
  }

  onSelectTask = i => {
    this.props.getTask(i.id);
    this.props.history.push(`/task/${i.id}`);
  };

  newTask = () => {
    this.props.getTask('new');
  };
  logMessage(message) {
    const _log = {
      CC_No: this.props.change.CC_No,
      CC_Id: 1,
      CC_Action: message,
      CC_ActBy: this.props.main.user.fullname,
      CC_ActDate: new Date()
    };

    this.props.createLog(_log);
    toastr.success(message);
  }

  cancelChange(e) {
    e.preventDefault();
    // this.props.history.push(`/change/${this.state.change.CC_No}`);
    this.props.history.push('/changes');
  }

  updateChangeState(event) {
    const field = event.target.name;
    const _change = this.state.change;
    _change[field] = event.target.value;
    return this.setState({ change: _change });
  }

  updateChangeStateDate(field, value) {
    const _change = this.state.change;
    _change[field] = value;
    return this.setState({ change: _change });
  }

  saveChange(event) {
    event.preventDefault();
    const _change = this.state.change;

    const validation = changeFormIsValid(_change);
    this.setState({ errors: validation.errors });
    this.setState({ errorsObj: validation.errorsObj });

    if (!validation.formIsValid) {
      return;
    }

    if (this.state.ccNo !== 'new') {
      _change.newOwner = _change.CC_Champ !== this.props.change.CC_Champ;

      if (_change.CC_Stat >= 4) {
        // TODO: If the status is 4 or greater delete cached record
        this.props.closeChange(_change);
      } else {
        this.props.editChange(_change);
      }
    } else {
      const created = [];
      created.push({ CC_Id: 0, CC_Action: 'Created', CC_ActBy: this.props.main.user.fullname, CC_ActDate: new Date() });
      _change.CC_LOG = created;
      _change.CC_Stat = _change.CC_Stat || 1;
      this.props.addChange(_change);
    }

    toastr.success('Change has been saved', 'Change Detail', { timeOut: 1000 });
    this.setState({ dirty: false });
    this.props.history.push('/changes');
  }

  showTab(value) {
    this.setState({ DetailTab: 'hidden' });
    this.setState({ TasksTab: 'hidden' });
    this.setState({ FilesTab: 'hidden' });
    this.setState({ LogTab: 'hidden' });
    this.setState({ [value]: 'show' });
  }
  props: {
    addChange: any,
    change: any,
    ctTotal: number,
    createLog: any,
    closeChange: any,
    editChange: any,
    getChange: any,
    getProjectTasks: any,
    getTask: any,
    history: any,
    main: any,
    setTitle: any,
    tasklist: any,
    users: any,
    match: {
      params: {
        id: string
      }
    }
  };

  render() {
    const _title = this.props.change !== null
      ? `${this.props.change.CC_No} - ${this.props.change.CC_Descpt}`
      : 'New - Change Control';

    const detailTabClass = classNames({
      active: this.state.DetailTab === 'show'
    });

    const tasksTabClass = classNames({
      active: this.state.TasksTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    const fileTabClass = classNames({
      active: this.state.FilesTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    const logTabClass = classNames({
      active: this.state.LogTab === 'show',
      hidden: this.props.main.MainId === 'new'
    });

    return (
      <div>
        <div className="">
          <div className="section-header">
            <p className="section-header-text-sub">{_title}</p>
          </div>
        </div>
        <ul className="nav nav-tabs dpHand">
          <li className={detailTabClass}>
            <a onClick={this.showTab.bind(this, 'DetailTab')} data-toggle="tab">Detail</a>
          </li>
          <li className={tasksTabClass}>
            <a onClick={this.showTab.bind(this, 'TasksTab')} data-toggle="tab">
              Tasks <span className="badge"> {this.props.ctTotal} </span>
            </a>
          </li>
          <li className={fileTabClass}>
            <a onClick={this.showTab.bind(this, 'FilesTab')} data-toggle="tab">
              Files <span className="badge"> {this.props.main.fileTabCount} </span>
            </a>
          </li>
          <li className={logTabClass}>
            <a onClick={this.showTab.bind(this, 'LogTab')} data-toggle="tab">Log</a>
          </li>
        </ul>

        <div className={`cdButtonGroup ${this.state.DetailTab} pull-right`}>
          <button className="btn btn-success pull-left" onClick={this.saveChange}>
            Save Change
          </button>
          <button className="btn btn-info dp-margin-10-LR" onClick={this.cancelChange}>
            Cancel
          </button>
        </div>

        <div className={this.state.DetailTab}>
          <div className="panel panel-default">
            <div className="panel-body">
              {this.state.errors.length > 0 ? <ErrorPanel errors={this.state.errors} /> : ''}
              <ChangeForm
                change={this.state.change}
                errors={this.state.errorsObj}
                onChange={this.updateChangeState}
                onDateChange={this.updateChangeStateDate}
                status={this.state.status}
                users={this.props.users}
              />
            </div>
          </div>
        </div>

        <TaskList
          onSelectTask={this.onSelectTask}
          tasklist={this.props.tasklist}
          tasksTab={this.state.TasksTab}
          title={this.state.changeTitle}
          newTask={this.newTask}
        />

        <ChangeLog
          logTab={this.state.LogTab}
          onApprove={this.onApprove}
          onFinal={this.onFinal}
          onCancel={this.onCancel}
          log={this.state.change}
        />

        <FileList filesTab={this.state.FilesTab} refreshChange={this.onRefresh} sourceId={this.props.match.params.id} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  change: state.change,
  main: state.main,
  tasklist: state.tasks.ctlist,
  ctTotal: state.tasks.ctTotal,
  users: usersFormattedForDropdown(state.users)
});

export default connect(mapStateToProps, {
  addChange,
  createLog,
  closeChange,
  editChange,
  getChange,
  getTask,
  getProjectTasks,
  setMain,
  setTitle
})(ChangeDetail);
