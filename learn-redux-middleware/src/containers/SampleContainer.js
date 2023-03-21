import React, { useEffect } from "react";
import Sample from "../components/Sample";
import { getPost, getUsers } from "../modules/sample";
import { connect } from "react-redux";
const SampleContainer = ({
  post,
  users,
  loadingUsers,
  loadingPost,
  getPost,
  getUsers,
}) => {
  useEffect(() => {
    getPost(1);
    getUsers(1);
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
    console.log(sample);
    return {
      post: sample.post,
      users: sample.users,
      loadingPost: sample.loading.GET_POST,
      loadingUsers: sample.loading.GET_USERS,
    };
  },
  {
    getPost,
    getUsers,
  }
)(SampleContainer);
