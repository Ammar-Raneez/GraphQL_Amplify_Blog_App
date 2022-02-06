import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { listPosts } from '../graphql/queries';

function DisplayPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));
      console.log(result);
      setPosts(result.data.listPosts.items);
    }

    getPosts();
  }, []);

  return (
    posts.map((post) => (
      <div className="posts" style={rowStyle} key={post.id}>
        <h1> {post.postTitle}</h1>
        <span style={{ fontStyle: "italic", color: "#0ca5e297" }}>
          {"Wrote by: "} {post.postOwnerUsername}
          {" on "}
          <time style={{ fontStyle: "italic" }}>
            {" "}
            {new Date(post.createdAt).toDateString()}
          </time>
        </span>

        <p>{post.postBody}</p>
        <br />
      </div>
    ))
  );
}

const rowStyle = {
  background: '#f4f4f4',
  padding: '10px',
  border: '1px #ccc dotted',
  margin: '14px'
}

export default DisplayPosts;
