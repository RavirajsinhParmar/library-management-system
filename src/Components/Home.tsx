import React from "react";
import BooksList from "./BooksList/BooksList";
import AddBook from "./AddNewBook/AddBook";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
// const Background = require("../Assets/Listpage_bg.jpg");

const Home = () => {
  const [user, dispatch] = useStateValue();
  const navigate = useNavigate();
  const SignOut = async () => {
    signOut(auth)
      .then(async () => {
        sessionStorage.removeItem("token");
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/");
      })
      .catch((error) => alert(error));
  };
  return (
    <div className="m-auto p-4 h-screen bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100">
      <div className="flex justify-between">
        <div className="text-2xl font-bold py-3 flex gap-3 items-start">
          <img alt="logo" src={"/book.svg"} width={28} height={28} />
          List of books
        </div>
        <div className="flex gap-3 items-center">
          <div className="cursor-pointer" onClick={SignOut}>
            <img
              alt=""
              src={"/images/logout.svg"}
              width={30}
              height={30}
              className="fill-black"
              color="black"
            />
          </div>
        </div>
      </div>
      {user?.isAddBookFormVisible && <AddBook />}
      <BooksList />
    </div>
  );
};

export default Home;
