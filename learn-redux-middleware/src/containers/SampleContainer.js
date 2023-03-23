import React, { useEffect } from "react";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";
import { connect } from "react-redux";
import loading from "../modules/loading";
const SampleContainer = ({
  post,
  users,
  loadingUsers,
  loadingPost,
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    const fn = (async) => {
      try {
        getPost(2);
        getUsers(2);
      } catch (error) {
        console.log(error);
      }
    };
    fn();
  }, [getPost, getUsers]);

  return (
    <Sample
      post={post}
      users={users}
      loadingPost={loadingPost}
      loadingUsers={loadingUsers}
    ></Sample>
  );
};

export default connect(
  ({ sample }) => {
    // console.log(`::::: ${JSON.stringify(sample.users)}`);
    return {
      post: sample.post,
      users: sample.users,
      loadingPost: loading["sample/GET_POST"],
      loadingUsers: loading["sample/GET_USERS"],
    };
  },
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
