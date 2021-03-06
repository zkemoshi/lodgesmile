import { makeStyles } from '@material-ui/core';
import { Button, TextField, Typography } from '@mui/material';
import React, { useContext, useState, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';
import roomContext from '../../context/room/roomContext';
// import NumberFormat from 'react-number-format';

// const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(
//   props,
//   ref
// ) {
//   const { onChange, ...other } = props;

//   return (
//     <NumberFormat
//       {...other}
//       getInputRef={ref}
//       onValueChange={(values) => {
//         onChange({
//           target: {
//             name: props.name,
//             value: values.value,
//           },
//         });
//       }}
//       thousandSeparator
//       isNumericString
//       prefix='TZS '
//     />
//   );
// });

const useStyle = makeStyles({
  box: {
    maxWidth: '400px',
    margin: '1rem auto',
  },
});
const btnSytle = {
  margin: '8px 0',
};

const RoomRegister = (props) => {
  const classes = useStyle();

  const { setAlert } = useContext(AlertContext);
  const {
    current,
    clearCurrent,
    updateRoom,
    rooms,
    addRoom,
    error,
    clearErrors,
  } = useContext(roomContext);

  const [room, setRoom] = useState({
    name: '',
    number: '',
   
  });

  useEffect(() => {
    if (current !== null) {
      setRoom(current);
    } else {
      setRoom({
        name: '',
        number: '',
       
      });
    }
    //eslint-disable-next-line
  }, [error, current, rooms]);

  const { name, number } = room;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (current !== null) {
      updateRoom(room);
    } else {
      addRoom({
        name,
        number,
      });
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <div className={classes.box}>
      <Alerts />
      <Typography align='center'> Add Rooms</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          variant='standard'
          fullWidth
          type='text'
          name='name'
          value={name}
          required
          id='standard-basic'
          label='Name'
          placeholder='Enter room name'
          onChange={(e) => setRoom({ ...room, name: e.target.value })}
        />

        <TextField
          variant='standard'
          fullWidth
          id='standard-basic'
          label='Number'
          name='number'
          value={number}
          required
          placeholder='Enter Room Number'
          minLength='6'
          onChange={(e) => setRoom({ ...room, number: e.target.value })}
        />

        {/* <TextField
          value={price}
          onChange={(e) => setRoom({ ...room, price: e.target.value })}
          InputProps={{
            inputComponent: NumberFormatCustom,
          }}
          variant='standard'
          label='Price'
          color='primary'
          placeholder='Enter Room Price'
          fullWidth
          required
        /> */}

        <Button
          type='submit'
          color='primary'
          variant='contained'
          fullWidth
          style={btnSytle}
        >
          {current ? 'Update Room' : 'Add Room'}
        </Button>
        {current && (
          <div>
            <Button
              type='submit'
              color='primary'
              variant='standard'
              fullWidth
              style={btnSytle}
              onClick={clearAll}
            >
              Clear
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default RoomRegister;
