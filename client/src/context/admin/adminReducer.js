import {
  ADD_PAYMENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  PAYMENT_ERROR,
  GET_PAYMENT,
  CLEAR_ERRORS,
  CLEAR_PAYMENT,
} from '../types';

const AdminReducer = (state, action) => {
  switch (action.type) {
    case ADD_PAYMENT:
      return {
        ...state,
        payments: [...state.payments, action.payload],
        loading: false,
        current: null,
      };
    case GET_PAYMENT:
      return {
        ...state,
        payments: action.payload,
        loading: false,
      };

    case CLEAR_PAYMENT:
      return {
        ...state,
        payments: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case PAYMENT_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default AdminReducer;
