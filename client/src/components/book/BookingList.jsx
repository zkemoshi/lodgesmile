import React from 'react';
import PropTypes from 'prop-types';

const BookItem = ({ room }) => {
  const { number } = room;

  return <span className='round badge badge-danger'>{number}</span>;
};

BookItem.propTypes = {
  room: PropTypes.object.isRequired,
};
export default BookItem;
