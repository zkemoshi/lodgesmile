import {
  ADD_BOOKING,
  DELETE_BOOKING,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_BOOKING,
  BOOKING_ERROR,
  GET_BOOKING,
  GET_CURRENT_BOOKING,
  CLEAR_BOOKING,
  CLEAR_ERRORS,
} from '../types';

const BookReducer = (state, action) => {
  switch (action.type) {
    case ADD_BOOKING:
      return {
        ...state,
        booking: [...state.booking, action.payload],
        loading: false,
      };

    case GET_BOOKING:
      return {
        ...state,
        booking: action.payload,
        loading: false,
      };

    case GET_CURRENT_BOOKING:
      return {
        ...state,
        currentBooking: action.payload,
        loading: false,
      };

    case UPDATE_BOOKING:
      return {
        ...state,
        booking: state.booking.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
        loading: false,
      };

    case DELETE_BOOKING:
      return {
        ...state,
        booking: state.booking.filter((book) => book._id !== action.payload),
        loading: false,
      };

    case CLEAR_BOOKING:
      return {
        ...state,
        booking: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case BOOKING_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
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

export default BookReducer;
