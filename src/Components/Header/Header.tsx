import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <nav className="absolute w-full top-0 z-10">
      <div className="mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <span className="text-2xl text-gray-900 font-semibold">
            <div className="flex space-x-4">
              <img
                alt=""
                src={"/book.svg"}
                width={30}
                height={30}
                className="fill-black"
                color="black"
              />
            </div>
          </span>
          <div className="flex space-x-4 text-white">
            <button
              className="min-w-16 p-2 border border-white rounded-lg"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="min-w-16 p-2 border border-white rounded-lg"
              onClick={() => navigate("signup")}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
