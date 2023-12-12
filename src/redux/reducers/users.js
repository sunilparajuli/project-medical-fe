const initialState = {
    userLoading: false,
    loadedUsers: null,
    errorUsers: null,
    successMessage: null,
    errorMessage: null,
    pagination: null, // added for pagination information
  };
  
  export default function authReducer(state = initialState, action) {
    switch (action.type) {
      case "USERS_REQ":
        return {
          ...state,
          userLoading: true,
          loadedUsers: null,
          errorUsers: null,
          successMessage: null,
          pagination: null,
        };
      case "USERS_RESP":
        console.log("payload", action);
        return {
          ...state,
          userLoading: false,
          loadedUsers: action.payload.results,
          errorMessage: null,
          pagination: {
            page_size: action.payload.page_size,
            count: action.payload.count,
            count_per_page: action.payload.count_per_page,
            max_page_size: action.payload.max_page_size,
            next: action.payload.next,
            previous: action.payload.previous,
          },
        };
      case "USERS_ERR":
        return {
          ...state,
          errorMessage: action.payload,
          userLoading: false,
          pagination: null,
        };
      default:
        return state;
    }
  }
  