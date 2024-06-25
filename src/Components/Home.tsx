import React from "react";
import BooksList from "./BooksList/BooksList";
import AddBook from "./AddNewBook/AddBook";
import { useStateValue } from "../StateProvider";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

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
    <div className="m-auto p-4">
      <div className="flex justify-between">
        <div className="text-2xl font-bold py-3 flex items-start">
          List of books
        </div>
        <div className="flex gap-3 items-center">
          <button
            type="button"
            className="h-max py-2 px-3 text-white text-base font-medium bg-blue-500 rounded-lg"
            onClick={() => {
              dispatch({
                type: "ADD_BOOK_FORM_VISIBLE",
                isAddBookFormVisible: !user.isAddBookFormVisible,
              });
            }}
          >
            + Add
          </button>
          <div className="cursor-pointer" onClick={SignOut}>
            <img
              alt=""
              src={"/logout.svg"}
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
