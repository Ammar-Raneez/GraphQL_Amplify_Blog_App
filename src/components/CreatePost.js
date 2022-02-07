import { API, graphqlOperation } from 'aws-amplify';
import React, { useState } from 'react';
import { createPost } from '../graphql/mutations';

function CreatePost() {
  const [postOwnerId, setPostOwnerId] = useState('as');
  const [postOwnerUsername, setPostOwnerUsername] = useState('d');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  const handleAddPost = async (event) => {
    event.preventDefault();
    const input = {
      postOwnerId,
      postOwnerUsername,
      postTitle,
      postBody,
      createdAt: new Date().toISOString(),
    };

    await API.graphql(graphqlOperation(createPost, { input }));

    setPostTitle('');
    setPostBody('');
  }

  return (
    <form
      className="add-post"
      onSubmit={handleAddPost}
    >
      <input
        style={{ font: '19px' }}
        type="text"
        placeholder="Title"
        name="postTitle"
        required
        value={postTitle}
        onChange={(event) => setPostTitle(event.target.value)}
      />
      <textarea
        type="text"
        name="postBody"
        rows="3"
        cols="40"
        required
        placeholder="New Blog Post"
        value={postBody}
        onChange={(event) => setPostBody(event.target.value)}
      />
      <input
        type="submit"
        className="btn"
        style={{ fontSize: '19px' }}
      />
    </form>
  );
}

export default CreatePost;
