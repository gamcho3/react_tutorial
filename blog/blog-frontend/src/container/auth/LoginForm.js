import { useEffect } from "react";
import {
  useDispatch,
  useSelector,
} from "../../../node_modules/react-redux/es/exports";
import { changeField, initializeForm } from "../../modules/auth";
import AuthForm from "../../components/auth/AuthForm";

import React from "react";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { form } = useSelector(({ auth }) => {
    console.log(auth);
    return {
      //상태값 반환 auth.login => {username,password}
      form: auth.login,
    };
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    //액션함수를 통해 데이터를 저장
    dispatch(changeField({ form: "login", key: name, value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(initializeForm("login"));
  }, [dispatch]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    ></AuthForm>
  );
};

export default LoginForm;
