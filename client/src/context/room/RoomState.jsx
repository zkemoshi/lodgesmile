import React, { useReducer } from 'react';
import axios from 'axios';
import RoomContext from './roomContext';
import roomReducer from './roomReducer';

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

// Initial State
const RoomState = (props) => {
  const InitialState = {
    rooms: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(roomReducer, InitialState);

  // Get Rooms
  const getRooms = async () => {
    try {
      const res = await axios.get('/api/rooms');
      dispatch({
        type: GET_ROOM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ROOM_ERROR,
        payload: error.response.message,
      });
    }
  };

  //Add Rooms
  const addRoom = async (room) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/rooms', room, config);
      dispatch({
        type: ADD_ROOM,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ROOM_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //Update Room
  const updateRoom = async (room) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(`/api/rooms/${room._id}`, room, config);
      dispatch({ type: UPDATE_ROOM, payload: res.data });
    } catch (error) {
      dispatch({
        type: ROOM_ERROR,
        payload: error.response.msg,
      });
    }
  };
  //Delete Room
  const deleteRoom = async (id) => {
    try {
      await axios.delete(`/api/rooms/${id}`);
      dispatch({ type: DELETE_ROOM, payload: id });
    } catch (error) {
      dispatch({
        type: ROOM_ERROR,
        payload: error.response.msg,
      });
    }
  };

  // Set Clear Rooms
  const clearRooms = () => {
    dispatch({ type: CLEAR_ROOMS });
  };

  //Set Current Rooms
  const setCurrent = (room) => {
    dispatch({ type: SET_CURRENT, payload: room });
  };
  //Clear Current Rooms
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Filter Rooms
  const filterRooms = (text) => {
    dispatch({ type: FILTER_ROOMS, payload: text });
  };
  // Clear Filter
  const clearFiltered = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <RoomContext.Provider
      value={{
        rooms: state.rooms,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addRoom,
        deleteRoom,
        setCurrent,
        clearCurrent,
        updateRoom,
        filterRooms,
        clearFiltered,
        getRooms,
        clearRooms,
      }}
    >
      {props.children}
    </RoomContext.Provider>
  );
};

export default RoomState;
