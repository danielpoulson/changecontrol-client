import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    padding-top: 1em;
`;

type Props = {
  onAddComment: Function,
  onCommentChange: Function,
  comCurrent: stirng
};

const ChangeComment = (props: Props) =>
  <Div className="container">
    <form className="form-horizontal">
      <div className="form-group col-sm-10">
        <label htmlFor="comments" className="col-sm-2 control-label">Enter a comment: </label>
        <div className="col-sm-10">
          <textarea
            rows="3"
            value={props.comCurrent}
            type="text"
            name="comments"
            className="form-control"
            id="comments"
            placeholder="Add Comments.."
            onChange={props.onCommentChange}
          />
        </div>
      </div>
      <button className="btn btn-primary col-sm-2" onClick={props.onAddComment}>Add Comment</button>
    </form>
  </Div>;

export default ChangeComment;
