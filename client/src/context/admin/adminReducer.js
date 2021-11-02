import { GET_USERS, USERS_ERROR } from '../types';


const AdminReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case USERS_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    

    default:
      return state;
  }
};

export default AdminReducer;
