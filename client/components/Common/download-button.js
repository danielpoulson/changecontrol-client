import React from 'react';

export default class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.onDownload = this.onDownload.bind(this);
  }
  onDownload() {
    window.location.href = `/api/files/upload/${this.props.fileLoad}`;

    if (this.props.exportFiles === 'hidden') {
      this.props.removeFile(this.props.fileId);
    }
  }
  props: {
    fileLoad: any,
    exportFiles: string,
    removeFile: any,
    fileId: string
  };

  render() {
    return (
      <button type="button" className="btn btn-info btn-xs" onClick={this.onDownload}>
        <span className="glyphicon glyphicon-circle-arrow-down" />
        Download
      </button>
    );
  }
}
