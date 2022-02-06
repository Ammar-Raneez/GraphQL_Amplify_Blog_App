import React, { useState } from 'react';

function CreateCommentPost({ postId }) {
  const [commentOwnerId, setCommentOwnerId] = useState('');
  const [content, setContent] = useState('');
  const [commentOwnerUsername, setCommentOwnerUsername] = useState('');

  const handleAddComment = () => {

  }

  const handleChangeContent = () => {

  }

  return (
    <div>
      <form className="add-comment"
        onSubmit={handleAddComment}>
        <textarea
          type="text"
          name="content"
          rows="3"
          cols="40"
          required
          placeholder="Add Your Comment..."
          value={content}
          onChange={handleChangeContent} />
        <input
          className="btn"
          type="submit"
          style={{ fontSize: '19px' }}
          value="Add Comment" />
      </form>
    </div>
  );
}

export default CreateCommentPost;
