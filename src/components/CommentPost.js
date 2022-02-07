import React from 'react';

function CommentPost({ comment }) {
  return (
    <div className="comment">
      <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
        {"Commment by: "} {comment.commentOwnerUsername}
        {" on "}
        <time style={{ fontStyle: "italic" }}>
          {" "}
          {new Date(comment.createdAt).toDateString()}
        </time>
      </span>
      <p> {comment.content}</p>
    </div>
  );
}

export default CommentPost;
