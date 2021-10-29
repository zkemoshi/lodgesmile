import React, { useReducer } from 'react';
import axios from 'axios';
import BookContext from './bookContext';
import bookReducer from './bookReducer';

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

// Initial State
const BookState = (props) => {
  const InitialState = {
    booking: [],
    current: null,
    loading: true,
    currentBooking: null,
    todayBooking: null,
    totalCollected: null,
    totalBooked: null,
    error: null,
  };

  const [state, dispatch] = useReducer(bookReducer, InitialState);

  //Add Booking
  const addBooking = async (book) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/booking', book, config);
      dispatch({
        type: ADD_BOOKING,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Booking
  const getBooking = async () => {
    try {
      const res = await axios.get('/api/booking');
      dispatch({
        type: GET_BOOKING,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Today's Booking
  const getCurrentBooking = async (today) => {
    try {
      const res = await axios.get(`/api/booking/${today}`);
      dispatch({
        type: GET_CURRENT_BOOKING,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: BOOKING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //Update Booking
  const updateBooking = async (book) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.patch(`/api/booking/${book._id}`, book, config);
      dispatch({ type: UPDATE_BOOKING, payload: res.data });
    } catch (error) {
      dispatch({
        type: BOOKING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //Delete Room
  const deleteBooking = async (id) => {
    try {
      await axios.delete(`/api/booking/${id}`);
      dispatch({ type: DELETE_BOOKING, payload: id });
    } catch (error) {
      dispatch({
        type: BOOKING_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Set Clear Rooms
  const clearBooking = () => {
    dispatch({ type: CLEAR_BOOKING });
  };

  //Set Current Rooms
  const setCurrent = (book) => {
    dispatch({ type: SET_CURRENT, payload: book });
  };
  //Clear Current Rooms
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <BookContext.Provider
      value={{
        booking: state.booking,
        current: state.current,
        loading: state.loading,
        error: state.error,
        currentBooking: state.currentBooking,
        totalCollected: state.totalCollected,
        totalBooking: state.totalBooking,
        addBooking,
        deleteBooking,
        setCurrent,
        clearCurrent,
        updateBooking,
        getBooking,
        getCurrentBooking,
        clearBooking,
        clearErrors,
      }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
