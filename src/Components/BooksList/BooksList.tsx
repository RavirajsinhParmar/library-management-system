import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useStateValue } from "../../StateProvider";
import Pagination from "./Pagination";
interface list {
  id: string;
  [key: string]: string;
}
const BooksList = () => {
  const [booksList, setBooksList] = useState<list[]>([]);
  const rowsPerPage: number = 10;
  const [page, setPage] = useState<number>(0);
  const range = [];
  const num = Math.ceil(booksList?.length / rowsPerPage);
  for (let i = 1; i <= num; i++) {
    range.push(i);
  }
  const [sortBy, setSortBy] = useState("desc");
  const [data, dispatch] = useStateValue();
  const handleDelete = async (id: string) => {
    const taskDocRef = doc(db, "books", id);
    try {
      await deleteDoc(taskDocRef);
      alert(`Record deleted successfully`);
    } catch (err) {
      alert(err);
    }
  };
  const count = booksList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  ).length;

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  useEffect(() => {
    setSortBy("desc");
    const q = query(collection(db, "books"), orderBy("created", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const list: list[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooksList(list);
    });
  }, []);

  useEffect(() => {
    setBooksList(
      sortBy === "asc"
        ? booksList.sort(
            (a: { [key: string]: any }, b: { [key: string]: any }) =>
              b.created - a.created
          )
        : booksList.sort(
            (a: { [key: string]: any }, b: { [key: string]: any }) =>
              a.created - b.created
          )
    );
  }, [sortBy]);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-between gap-2 py-4">
        <div className="flex gap-3">
          <button
            onClick={() => setSortBy("asc")}
            className="border border-gray-400 p-2 rounded-lg"
            type="button"
          >
            Asc
          </button>
          <button
            onClick={() => setSortBy("desc")}
            className="border border-gray-400 p-2 rounded-lg"
            type="button"
          >
            Desc
          </button>
        </div>
        <button
          type="button"
          className="h-max py-2 px-3 text-white text-base font-semibold bg-blue-600 rounded-lg"
          onClick={() => {
            dispatch({
              type: "ADD_BOOK_FORM_VISIBLE",
              isAddBookFormVisible: !data.isAddBookFormVisible,
            });
          }}
        >
          + Add
        </button>
      </div>
      <table className="w-full border rounded-lg border-gray-400 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-600">
          <tr className="border-b border-gray-400">
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Author
            </th>
            <th scope="col" className="px-6 py-3">
              Genre
            </th>
            <th scope="col" className="px-6 py-3">
              Published Year
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {booksList?.length ? (
            booksList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((book) => {
                return (
                  <tr
                    key={book?.id}
                    className="text-gray-900 rouded-lg border-b border-gray-400"
                  >
                    <td className="px-6 py-4 font-medium whitespace-pre-wrap">
                      {book?.title}
                    </td>
                    <td className="px-6 py-4">{book?.author}</td>
                    <td className="px-6 py-4">{book?.genre}</td>
                    <td className="px-6 py-4">{book?.publishedYear}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-start items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleDelete(book?.id)}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          <img
                            alt="delete"
                            src={"/images/delete.svg"}
                            width={28}
                            height={28}
                          />
                        </button>
                        <button
                          type="button"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => {
                            dispatch({
                              type: "GET_BOOK_DETAILS",
                              selectedBook: book,
                            });
                            dispatch({
                              type: "ADD_BOOK_FORM_VISIBLE",
                              isAddBookFormVisible: true,
                            });
                          }}
                        >
                          <img
                            alt="delete"
                            src={"/images/edit.svg"}
                            width={24}
                            height={24}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
          ) : (
            <tr className="p-4 text-gray-900 border-b border-gray-400">
              <td colSpan={5} className="p-4 text-center">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {booksList?.length && (
        <Pagination
          total={booksList?.length}
          range={range}
          rowsPerPage={rowsPerPage}
          page={page}
          previous={() => handleChangePage(page - 1)}
          next={() => handleChangePage(page + 1)}
          onPageChange={(currentPage: number) =>
            handleChangePage(currentPage - 1)
          }
          count={count}
        />
      )}
    </div>
  );
};

export default BooksList;
