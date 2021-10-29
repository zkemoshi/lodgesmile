import React, { useContext } from 'react';
import bookContext from '../../context/booking/bookContext';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange, deepPurple } from '@mui/material/colors';

const BookItem = ({ room }) => {
  const { setCurrent } = useContext(bookContext);

  const { number, vacancy } = room;

  const bookHandler = () => {
    setCurrent(room);
  };
  const color = vacancy ? deepPurple[500] : deepOrange[500];
  return (
    <Stack direction='row' spacing={2}>
      <Avatar sx={{ bgcolor: color }} onClick={bookHandler}>
        {number}
      </Avatar>
    </Stack>
  );
};

BookItem.propTypes = {
  room: PropTypes.object.isRequired,
};
export default BookItem;
