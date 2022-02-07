import React from 'react';

function UsersWhoLikedPost({ allUsers }) {
  return (
    allUsers.map((user) => (
      <div key={user}>
        <span style={{ fontStyle: "bold", color: "#ged" }}>
          {user}
        </span>
      </div>
    ))
  );
}

export default UsersWhoLikedPost;
