export const initialState = {
  isAddBookFormVisible: false,
  user: null,
  selectedBook: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK_FORM_VISIBLE":
      return {
        ...state,
        isAddBookFormVisible: action.isAddBookFormVisible,
      };

    case "GET_BOOK_DETAILS":
      return {
        ...state,
        selectedBook: action.selectedBook,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      break;
  }
};

export default reducer;
