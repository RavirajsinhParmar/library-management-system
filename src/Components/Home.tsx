import React from "react";
import BooksList from "./BooksList/BooksList";
import AddBook from "./AddNewBook/AddBook";
import { useStateValue } from "../StateProvider";

const Home = () => {
  const [user, dispatch] = useStateValue();
  return (
    <div className="m-auto p-4">
      <div className="flex justify-between">
        <div className="text-2xl font-bold py-3 flex items-start">
          List of books
        </div>
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
      </div>
      {user?.isAddBookFormVisible && <AddBook />}
      <BooksList />
    </div>
  );
};

export default Home;
