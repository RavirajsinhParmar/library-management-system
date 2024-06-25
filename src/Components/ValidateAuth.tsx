import React from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

const ValidateAuth = (props: Props) => {
  const { children } = props;
  const token = sessionStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};

export default ValidateAuth;
