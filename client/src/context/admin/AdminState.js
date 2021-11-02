import React, { useReducer } from 'react';
import axios from 'axios';
import AdminContext from './adminContext';
import AdminReducer from './adminReducer';

import { GET_USERS, USERS_ERROR } from '../types';

// Initial State
const AdminState = (props) => {
  const InitialState = {
    users: [],
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(AdminReducer, InitialState);

  // Get Payments
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/admin/users');
      dispatch({
        type: GET_USERS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USERS_ERROR,
        payload: error.response.message,
      });
    }
  };

  
  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        current: state.current,
        loading: state.loading,
        error: state.error,
        getUsers,
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
