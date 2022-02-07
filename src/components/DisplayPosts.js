import { API, Auth, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FaThumbsUp, FaSadTear } from 'react-icons/fa';
import { listPosts } from '../graphql/queries';
import { onCreateComment, onCreatePost, onDeletePost, onUpdatePost } from '../graphql/subscriptions';
import DeletePost from './DeletePost';
import EditPost from './EditPost';
import UsersWhoLikedPost from './UsersWhoLikedPost';
import CreateCommentPost from './CreateCommentPost';
import CommentPost from './CommentPost';

function DisplayPosts() {
  const [posts, setPosts] = useState([]);
  const [isHovering, setIsHovering] = useState(false);
  const [postLikedBy, setPostLikedBy] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [ownerId, setPostOwnerId] = useState('');

  useEffect(() => {
    const getCurrentUser = async () => {
      const userInfo = await Auth.currentUserInfo();
      setPostOwnerId(userInfo.attributes.sub);
    }

    getCurrentUser()
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      const result = await API.graphql(graphqlOperation(listPosts));
      setPosts(result.data.listPosts.items);
    }
    getPosts();
  }, []);

  useEffect(() => {
    const createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (postData) => {
        const newPost = postData.value.data.onCreatePost;
        const prevPosts = posts?.filter((post) => post.id !== newPost.id);
        const updatedPosts = [...prevPosts, newPost];
        setPosts(updatedPosts);
      }
    });

    const deletePostListener = API.graphql(graphqlOperation(onDeletePost)).subscribe({
      next: (postData) => {
        const deletedPost = postData.value.data.onDeletePost;
        const updatedPosts = posts?.filter((post) => post.id !== deletedPost.id);
        setPosts(updatedPosts);
      }
    });

    const updatePostListener = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
      next: (postData) => {
        const updatedPost = postData.value.data.onUpdatePost;
        const index = posts?.findIndex((post) => post.id === updatedPost.id);
        const updatedPosts = [...posts.slice(0, index), updatedPost, ...posts.slice(index + 1)];
        setPosts(updatedPosts);
      }
    });

    const createPostCommentListener = API.graphql(graphqlOperation(onCreateComment)).subscribe({
      next: (commentData) => {
        const createdComment = commentData.value.data.onCreateComment;
        const postsCopy = [...posts];
        for (let post of postsCopy) {
          if (createdComment.post.id === post.id) {
            post.comments.items.push(createdComment);
          }
        }

        setPosts(postsCopy);
      }
    });

    const unsubscribe = () => {
      createPostListener.unsubscribe();
      deletePostListener.unsubscribe();
      updatePostListener.unsubscribe();
      createPostCommentListener.unsubscribe();
    }

    return () => unsubscribe();
  }, [posts]);

  const handleLike = (postId) => {

  }

  const handleMouseHover = (postId) => {

  }

  const handleMouseHoverLeave = () => {

  }

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
        <span>
          {post.postOwnerId === ownerId
            && <DeletePost post={post} />}
          {post.postOwnerId === ownerId
            && <EditPost {...post} />}
          <span>
            <p className="alert">{post.postOwnerId === ownerId && errorMessage}</p>
            {/* <p onMouseEnter={() => handleMouseHover(post.id)}
              onMouseLeave={() => handleMouseHoverLeave()}
              onClick={() => handleLike(post.id)}
              style={{ color: (post.likes.items.length > 0) ? "blue" : "gray" }}
              className="like-button">
              <FaThumbsUp />
              {post.likes.items.length}
            </p> */}
            {isHovering && (
              <div className="users-liked">
                {postLikedBy.length === 0 ?
                  " Liked by No one " : "Liked by: "}
                {postLikedBy.length === 0 ? <FaSadTear /> : <UsersWhoLikedPost data={postLikedBy} />}
              </div>
            )}
          </span>
        </span>
        <span>
          <CreateCommentPost postId={post.id} />
          {post.comments?.items?.length > 0 && <span style={{ fontSize: "19px", color: "gray" }}>
            Comments: </span>}
          {post.comments?.items?.map((comment, index) => (
            <CommentPost key={index} comment={comment} />))}
        </span>
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
