import React from 'react';

export default class BookoutButton extends React.Component {
  constructor(props) {
    super(props);

    this.onBookout = this.onBookout.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  onBookout() {
    // TODO (3) MED If download does not complete donot delete from server.

    // const _log = { CC_No: this.props.source, CC_Id: 4, CC_Action: `File booked out - ${this.props.fileLoad}`,
    //           CC_ActBy: this.props.user.fullname, CC_ActDate: new Date() };

    window.location.href = `/api/files/upload/${this.props.fileLoad}`;

    //this.props.createLog(_log);
    this.props.bookoutFile(this.props.fileId, this.props.user.fullname);
  }

  deleteFile() {
    const _log = {
      CC_No: this.props.source,
      CC_Id: 4,
      CC_Action: `**** File Deleted **** - ${this.props.fileLoad}`,
      CC_ActDept: this.props.user.dept,
      CC_ActBy: this.props.user.fullname,
      CC_ActDate: new Date()
    };
    this.props.createLog(_log);
    this.props.deleteFile(this.props.fileId);
  }
  props: {
    fsBooked: number,
    user: {
      fullname: string,
      dept: string,
      role: string
    },
    source: string,
    fileId: string,
    bookoutFile: any,
    fileLoad: string,
    createLog: any,
    deleteFile: any
  };

  render() {
    let text = null;
    let action = {};
    let classButton = '';
    let classSpan = '';

    if (this.props.fsBooked > 0) {
      if (this.props.user.role === 'admin') {
        text = 'Delete';
        action = this.deleteFile;
        classButton = 'btn btn-danger btn-xs';
        classSpan = 'glyphicon glyphicon-trash';
      } else {
        text = 'Booked Out';
        classButton = 'btn btn-danger btn-xs';
        classSpan = 'glyphicon glyphicon-trash disabled';
      }
    } else {
      text = 'Book out';
      action = this.onBookout;
      classButton = 'btn btn-warning btn-xs';
      classSpan = 'glyphicon glyphicon-book';
    }
    return <button onClick={action} className={classButton}><span className={classSpan} /> {text} </button>;
  }
}
