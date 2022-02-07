import React, { useState } from 'react';

function CreatePost() {
  const [postOwnerId, setPostOwnerId] = useState('');
  const [postOwnerUsername, setPostOwnerUsername] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleAddPost = () => {

  }

  const handleChangePost = () => {

  }

  return (
    <form className="add-post"
      onSubmit={handleAddPost} >
      <input style={{ font: '19px' }}
        type="text" placeholder="Title"
        name="postTitle"
        required
        value={postTitle}
        onChange={handleChangePost}
      />
      <textarea
        type="text"
        name="postBody"
        rows="3"
        cols="40"
        required
        placeholder="New Blog Post"
        value={postBody}
        onChange={handleChangePost}
      />
      <input type="submit"
        className="btn"
        style={{ fontSize: '19px' }} />
    </form>
  );
}

export default CreatePost;
