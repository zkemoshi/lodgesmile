import React, { useContext } from 'react';
import bookContext from '../../context/booking/bookContext';
import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

const BookItem = ({ room }) => {
  const { setCurrent } = useContext(bookContext);

  const { number } = room;

  const bookHandler = () => {
    setCurrent(room);
  };
  return (
    <Stack direction='row' spacing={2}>
      <Avatar
        sx={{ bgcolor: deepOrange[500] }}
        alt='Remy Sharp'
        src='/broken-image.jpg'
        onClick={bookHandler}
      >
        {number}
      </Avatar>
    </Stack>
  );
};

BookItem.propTypes = {
  room: PropTypes.object.isRequired,
};
export default BookItem;
