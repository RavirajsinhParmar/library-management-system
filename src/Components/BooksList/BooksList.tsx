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
interface list {
  id: string;
  [key: string]: string;
}
const BooksList = () => {
  const [booksList, setBooksList] = useState<list[]>([]);
  const [sortBy, setSortBy] = useState("desc");
  const [data, dispatch] = useStateValue();
  const handleDelete = async (id: string) => {
    const taskDocRef = doc(db, "books", id);
    try {
      await deleteDoc(taskDocRef);
      console.log("deleted successfully");
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "books"), orderBy("created", 'desc'));
    onSnapshot(q, (querySnapshot) => {
      const list: list[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooksList(list);
    });
  }, []);
  
  useEffect(() => {
    if(sortBy == 'asc') {
      setBooksList(booksList.sort((a: any, b: any) => b.created - a.created));
    } else {
      setBooksList(booksList.sort((a: any, b: any) => a.created - b.created));
    }
  }, [sortBy])
  
  return (
    <div className="relative overflow-x-auto">
      <div className="flex justify-start gap-2 py-4">
        <button
          onClick={() => setSortBy("asc")}
          className="border border-gray-300 p-2 rounded-lg"
          type="button"
        >
          Asc
        </button>
        <button
          onClick={() => setSortBy("desc")}
          className="border border-gray-300 p-2 rounded-lg"
          type="button"
        >
          Desc
        </button>
      </div>
      <table className="w-full border rounded-lg border-gray-300 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
          <tr className="border-b border-gray-300">
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
          {booksList?.map((book) => {
            return (
              <tr
                key={book?.id}
                className="bg-white text-gray-900 border-b border-gray-300"
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
                      Delete
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
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
