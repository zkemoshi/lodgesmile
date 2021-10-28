import {
  ADD_ATTENDANT,
  DELETE_ATTENDANT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ATTENDANT,
  ATTENDANT_ERROR,
  GET_ATTENDANT,
  CLEAR_ATTENDANTS,
  CLEAR_ERRORS,
} from '../types';

const AttendantReducer = (state, action) => {
  switch (action.type) {
    case ADD_ATTENDANT:
      return {
        ...state,
        attendants: [...state.attendants, action.payload],
        loading: false,
      };
    case GET_ATTENDANT:
      return {
        ...state,
        attendants: action.payload,
        loading: false,
      };
    case UPDATE_ATTENDANT:
      return {
        ...state,
        attendants: state.attendants.map((attendant) =>
          attendant._id === action.payload._id ? action.payload : attendant
        ),
        loading: false,
      };

    case DELETE_ATTENDANT:
      return {
        ...state,
        attendants: state.attendants.filter(
          (attendant) => attendant._id !== action.payload
        ),
        loading: false,
      };
    case CLEAR_ATTENDANTS:
      return {
        ...state,
        attendants: null,
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
    case ATTENDANT_ERROR:
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

export default AttendantReducer;
