import React, { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
} from "firebase/firestore";
import { db } from "../../firebase";
interface list {
  id: string;
  [key: string]: string;
}
const BooksList = () => {
  const [booksList, setBooksList] = useState<list[]>([]);

  const handleDelete = async (id: string) => {
    const taskDocRef = doc(db, "books", id);
    try {
      await deleteDoc(taskDocRef);
      console.log('deleted successfully')
    } catch (err) {
      alert(err);
    }
  };

  useEffect(() => {
    const q = query(collection(db, "books"));
    onSnapshot(q, (querySnapshot) => {
      const list: list[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooksList(list);
    });
  }, []);
  return (
    <div className="relative overflow-x-auto">
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
