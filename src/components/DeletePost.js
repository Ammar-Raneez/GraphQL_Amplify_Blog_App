import { API, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { deletePost } from '../graphql/mutations';

function DeletePost({ post }) {
  const handleDeletePost = async (postId) => {
    const input = {
      id: postId,
    };

    await API.graphql(graphqlOperation(deletePost, { input }));
  }

  return (
    <button
      onClick={() => handleDeletePost(post.id)}
    >
      Delete
    </button>
  );
}

export default DeletePost;
