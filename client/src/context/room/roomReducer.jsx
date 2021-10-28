import {
  ADD_ROOM,
  DELETE_ROOM,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_ROOM,
  FILTER_ROOMS,
  CLEAR_FILTER,
  ROOM_ERROR,
  GET_ROOM,
  CLEAR_ROOMS,
} from '../types';

const RoomReducer = (state, action) => {
  switch (action.type) {
    case GET_ROOM:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        loading: false,
      };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room._id === action.payload._id ? action.payload : room
        ),
        loading: false,
      };

    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room._id !== action.payload),
        loading: false,
      };
    case CLEAR_ROOMS:
      return {
        ...state,
        rooms: null,
        filtered: null,
        error: null,
        current: null,
        loading: true,
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
    case FILTER_ROOMS:
      return {
        ...state,
        filtered: state.rooms.filter((room) => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return room.name.match(regex);
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    case ROOM_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default RoomReducer;
