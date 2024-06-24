import React from "react";
const Background = require("../../Assets/Background_img.jpg");

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="h-screen">
      <img
        className="absolute h-screen brightness-50 object-cover"
        alt="bg-img"
        src={Background}
      />
      <div className="relative h-full text-lg text-white z-9 flex justify-center items-center">
        Login
      </div>
    </div>
  );
};

export default Login;
