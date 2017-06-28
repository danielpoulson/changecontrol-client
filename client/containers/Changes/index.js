import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Toastr from 'toastr';

import ChangeList from '../../components/Changes/change-list';
import Pagination from '../../components/Common/pagination';
import SearchBox from '../../components/Common/search-box';

/* actions */
import { getChange, getChanges, addChange, loadPage, exportChanges, setChanges } from '../../actions/actions_changes';
import { setMain, setChangeState } from '../../actions/actions_main';
import { getFiles } from '../../actions/actions_files';

class Changes extends Component {
  state = {
    activePage: 0,
    colSelected: null,
    paged: {},
    count: 0,
    numPage: 15,
    txtSearch: this.props.changes.searchText,
    showAll: this.props.showAll
  };

  componentDidMount() {
    this.onChange(1, this.state.txtSearch);
  }

  // TODO: (2) MED Show all button reverts to "Show all"
  // The button should be "Show Current" but reverts back when returning from the details page.

  onSearchText = event => {
    const value = event.target.value;
    this.setState({ activePage: 0 });
    this.setState({ txtSearch: value });
    this.onChange(0, value);
  };

  onChange(pageNum, searchText, column) {
    const action = {};
    action.pageNum = pageNum || 1;
    action.search = searchText || null;
    action.numPage = this.state.numPage;
    action.column = column;
    this.props.loadPage(action);
  }

  onGetChange = i => {
    const _id = i;
    // const _id = this.props.changelist[i].CC_No;
    this.props.setMain({ MainId: _id, CurrentMode: 'change', loading: true });
    this.props.getChange(_id);
    this.props.history.push(`/change/${_id}`);
  };

  onSortByClick = column => {
    this.setState({ activePage: 0 });
    this.onChange(0, this.state.txtSearch, column);
  };

  linkClick = i => {
    this.onChange(i + 1, this.state.txtSearch);
    this.setState({ activePage: i });
  };

  allChanges = () => {
    let _showAll = this.state.showAll;
    _showAll = !_showAll;
    this.setState({ showAll: _showAll });
    this.props.setChangeState();

    if (this.state.showAll !== true) {
      this.props.getChanges(6);
    } else {
      this.props.getChanges(4);
    }
    this.setState({ txtSearch: null });
    this.setState({ activePage: 0 });
    const toastMessage = _showAll ? 'Showing all changes' : 'Showing active changes';
    Toastr.success(toastMessage, 'Change Detail', { timeOut: 2000 });
  };

  exportChange = () => {
    const info = {
      fsSource: 'exp',
      fsAddedBy: this.props.user.username,
      fsType: 'changes',
      search: this.state.txtSearch,
      showAll: this.state.showAll
    };

    this.props.exportChanges(info);
  };

  newChange = () => {
    this.props.getChange('new');
    this.props.setMain({ MainId: 'new', CurrentMode: 'change', loading: false });
    this.props.setChanges();
  };

  props: {
    changes: any,
    showAll: boolean,
    exportChanges: any,
    getChanges: any,
    getChange: any,
    history: any,
    loadPage: any,
    setMain: any,
    setChanges: any,
    setChangeState: any,
    user: any
  };

  render() {
    const _changeTitle = 'Register';
    let butText;

    if (this.state.showAll !== true) {
      butText = 'Show all changes';
    } else {
      butText = 'Show Current Changes';
    }

    return (
      <section>
        <div className="">
          <div className="section-header">
            <div className="col-sm-6 pull-left">
              <p className="section-header-text-main">Change Control - {_changeTitle} </p>
            </div>

            <SearchBox searchText={this.state.txtSearch} onChange={this.onSearchText} />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <Link to="/change/new" onClick={this.newChange}>
              <button className="btn btn-success pull-left">New Change</button>
            </Link>
            <Link to="/export">
              <button className="btn btn-info dp-margin-10-LR" onClick={this.exportChange}>
                Export List
              </button>
            </Link>
            <button className="btn btn-warning" onClick={this.allChanges}>
              {butText}
            </button>
          </div>

          <div className="col-sm-6">
            <Pagination
              activePage={this.state.activePage}
              numPage={this.props.changes.per_page}
              count={this.props.changes.total}
              getPage={this.linkClick}
            />
          </div>
        </div>

        <div className="">
          <ChangeList
            changelist={this.props.changes.paged}
            getChange={this.onGetChange}
            sortByClick={this.onSortByClick}
            colSelected={this.props.changes.sorted}
          />
        </div>

      </section>
    );
  }
}

export default connect(state => ({ changes: state.changes, user: state.main.user, showAll: state.main.showAll }), {
  getChange,
  getChanges,
  addChange,
  loadPage,
  exportChanges,
  setChanges,
  setMain,
  setChangeState,
  getFiles
})(Changes);
