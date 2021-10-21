import { Alert } from '@mui/material';
import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  const { alerts } = alertContext;

  return (
    alerts.length > 0 &&
    alerts.map((alert) => (
      
      <Alert severity={alert.type}>{alert.msg}</Alert>
    ))
  );
};

export default Alerts;
