import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { updatePost } from '../graphql/mutations';

function EditPost(props) {
  const [show, setShow] = useState(false);
  const [postOwnerId, setPostOwnerId] = useState('');
  const [postOwnerUsername, setPostOwnerUsername] = useState('');
  const [postTitle, setPostTitle] = useState(props.postTitle);
  const [postBody, setPostBody] = useState(props.postBody);

  useEffect(() => {
    const getCurrentUser = async () => {
      const userInfo = await Auth.currentUserInfo();
      setPostOwnerId(userInfo.attributes.sub);
      setPostOwnerUsername(userInfo.username);
    }

    getCurrentUser()
  }, []);

  const handleUpdatePost = async (event) => {
    event.preventDefault();
    const input = {
      postOwnerId,
      postOwnerUsername,
      postTitle,
      postBody,
      id: props.id
    };

    await API.graphql(graphqlOperation(updatePost, { input }));
    setShow(!show);
  }

  const handleTitle = (event) => {
    setPostTitle(event.target.value);
  }

  const handleBody = (event) => {
    setPostBody(event.target.value);
  }

  const handleModal = () => {
    setShow(!show);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>
      {show && (
        <div className="modal">
          <button className="close"
            onClick={handleModal}
          >
            X
          </button>
          <form
            className="add-post"
            onSubmit={(event) => handleUpdatePost(event)}
          >
            <input
              style={{ fontSize: "19px" }}
              type="text" placeholder="Title"
              name="postTitle"
              value={postTitle}
              onChange={handleTitle}
            />
            <input
              style={{ height: "150px", fontSize: "19px" }}
              type="text"
              name="postBody"
              value={postBody}
              onChange={handleBody}
            />
            <button style={{ width: "50%" }}>Update Post</button>
          </form>
        </div>
      )}
      <button onClick={handleModal}>Edit</button>
    </>
  );
}

export default EditPost;
