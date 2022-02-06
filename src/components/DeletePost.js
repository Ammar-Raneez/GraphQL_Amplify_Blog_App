import React from 'react';

function DeletePost({ post }) {
  const handleDeletePost = (postId) => {

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
