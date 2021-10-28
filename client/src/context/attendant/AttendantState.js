import React, { useReducer } from 'react';
import axios from 'axios';
import AttendantContext from './attendantContext';
import attendantReducer from './attendantReducer';

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

// Initial State
const AttendantState = (props) => {
  const InitialState = {
    attendants: null,
    current: null,
    error: null,
  };

  const [state, dispatch] = useReducer(attendantReducer, InitialState);

  //Add Attendant
  const addAttendant = async (attendant) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/attendants', attendant, config);
      dispatch({
        type: ADD_ATTENDANT,
        payload: res.data,
      });
      console.log(res.data);
    } catch (error) {
      dispatch({
        type: ATTENDANT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Attendants
  const getAttendants = async () => {
    try {
      const res = await axios.get('/api/attendants');
      dispatch({
        type: GET_ATTENDANT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ATTENDANT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  //Update Attendant
  const updateAttendant = async (attendant) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.put(
        `/api/attendants/${attendant._id}`,
        attendant,
        config
      );
      dispatch({ type: UPDATE_ATTENDANT, payload: res.data });
    } catch (error) {
      dispatch({
        type: ATTENDANT_ERROR,
        payload: error.response.msg,
      });
    }
  };
  //Delete attendant
  const deleteAttendant = async (id) => {
    try {
      await axios.delete(`/api/attendants/${id}`);
      dispatch({ type: DELETE_ATTENDANT, payload: id });
    } catch (error) {
      dispatch({
        type: ATTENDANT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Set Clear Attendant
  const clearAttendants = () => {
    dispatch({ type: CLEAR_ATTENDANTS });
  };

  //Set Current Attendant
  const setCurrent = (attendant) => {
    dispatch({ type: SET_CURRENT, payload: attendant });
  };

  //Clear Current Attendant
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <AttendantContext.Provider
      value={{
        attendants: state.attendants,
        current: state.current,
        error: state.error,
        deleteAttendant,
        setCurrent,
        clearCurrent,
        addAttendant,
        updateAttendant,
        getAttendants,
        clearAttendants,
        clearErrors,
      }}
    >
      {props.children}
    </AttendantContext.Provider>
  );
};

export default AttendantState;
