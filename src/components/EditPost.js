import React, { useState } from 'react';

function EditPost(props) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState('');
  const [postOwnerId, setPostOwnerId] = useState('');
  const [postOwnerUsername, setPostOwnerUsername] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postData, setPostData] = useState({
    postTitle: props.postTitle,
    postBody: props.postBody
  });

  const handleUpdatePost = (event) => {

  }

  const handleTitle = (event) => {

  }

  const handleBody = (event) => {

  }

  const handleModal = () => {

  }

  return (
    <>
      {show && (
        <div className="modal">
          <button className="close"
            onClick={handleModal}>
            X
          </button>
          <form className="add-post"
            onSubmit={(event) => handleUpdatePost(event)}>
            <input style={{ fontSize: "19px" }}
              type="text" placeholder="Title"
              name="postTitle"
              value={postData.postTitle}
              onChange={handleTitle} />
            <input
              style={{ height: "150px", fontSize: "19px" }}
              type="text"
              name="postBody"
              value={postData.postBody}
              onChange={handleBody}
            />
            <button>Update Post</button>
          </form>
        </div>
      )}
      <button onClick={handleModal}>Edit</button>
    </>
  );
}

export default EditPost;
