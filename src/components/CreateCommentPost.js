import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { createComment } from '../graphql/mutations';

function CreateCommentPost({ postId }) {
  const [commentOwnerId, setCommentOwnerId] = useState('');
  const [content, setContent] = useState('');
  const [commentOwnerUsername, setCommentOwnerUsername] = useState('');

  useEffect(() => {
    const getCurrentUser = async () => {
      const userInfo = await Auth.currentUserInfo();
      setCommentOwnerId(userInfo.attributes.sub);
      setCommentOwnerUsername(userInfo.username);
    }

    getCurrentUser()
  }, []);

  const handleAddComment = async (event) => {
    event.preventDefault();
    const input = {
      commentOwnerUsername,
      commentOwnerId,
      content,
      postCommentsId: postId,
      createdAt: new Date().toISOString()
    };

    await API.graphql(graphqlOperation(createComment, { input }));
    setContent('');
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
          onChange={(event) => setContent(event.target.value)} />
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
