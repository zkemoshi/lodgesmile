import React, { useReducer } from 'react';
import axios from 'axios';
import PaymentContext from './paymentContext';
import PaymentReducer from './paymentReducer';

import {
  ADD_PAYMENT,
  SET_CURRENT,
  CLEAR_CURRENT,
  PAYMENT_ERROR,
  GET_PAYMENT,
  CLEAR_PAYMENT,
  CLEAR_ERRORS,
} from '../types';

// Initial State
const PaymentState = (props) => {
  const InitialState = {
    payments: [],
    current: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = useReducer(PaymentReducer, InitialState);

  //Add Payment
  const addPayment = async (payment) => {
    const { price, days, scheme } = payment;
    console.log(payment);

    try {
      const res = await axios.get(`/api/payments/${price}/${days}/${scheme}`);
      dispatch({
        type: ADD_PAYMENT,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response.data.msg,
      });
    }
  };

  // Get Payments
  const getPayments = async () => {
    try {
      const res = await axios.get('/api/payments');
      dispatch({
        type: GET_PAYMENT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: PAYMENT_ERROR,
        payload: error.response.message,
      });
    }
  };

  //Set Current payment
  const setCurrent = (payment) => {
    dispatch({ type: SET_CURRENT, payload: payment });
  };

  //Clear Current payment
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Clear Payments
  const clearPayments = () => {
    dispatch({ type: CLEAR_PAYMENT });
  };

  //Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
  return (
    <PaymentContext.Provider
      value={{
        payments: state.receipts,
        current: state.current,
        loading: state.loading,
        error: state.error,
        setCurrent,
        clearCurrent,
        addPayment,
        getPayments,
        clearErrors,
        clearPayments,
      }}
    >
      {props.children}
    </PaymentContext.Provider>
  );
};

export default PaymentState;
