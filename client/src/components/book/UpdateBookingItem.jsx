import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BookContext from '../../context/booking/bookContext';

const UpdateBookingItem = ({ booking }) => {
  const { _id, number, price, name, checkIn, checkOut } = booking;

  const bookContext = useContext(BookContext);
  const { setCurrent, deleteBooking, clearCurrent } = bookContext;

  const deleteBook = (id) => {
    deleteBooking(id);
    clearCurrent();
  };

  return (
    <div className='card bg-white'>
      <h3 className='text-primary text-left'>
        <span className='badge badge-primary'>{number}</span>
        {name}{' '}
        <span style={{ float: 'right' }} className='badge badge-primary'>
          {`TZS ${price}`}
        </span>
      </h3>
      <h3 className='list text-left'>
        <h5>
          <i class='far fa-clock'></i>
          {` In: ${checkIn}`}
        </h5>
        <h5>
          <i class='far fa-clock'></i>
          {` Out: ${checkOut}`}
        </h5>
      </h3>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(booking)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={deleteBook(_id)}>
          Delete
        </button>
      </p>
    </div>
  );
};

UpdateBookingItem.propTypes = {
  room: PropTypes.object.isRequired,
};
export default UpdateBookingItem;
