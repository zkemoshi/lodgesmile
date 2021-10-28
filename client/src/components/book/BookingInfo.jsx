import React, { useContext } from 'react';
import BookContext from '../../context/booking/bookContext';

const BookingInfo = () => {
  const bookContext = useContext(BookContext);
  const { currentBooking } = bookContext;
  let totalCollected, totalBooked;
  if (currentBooking !== null && currentBooking.length !== 0) {
    totalCollected = currentBooking.reduce((currentTotal, item) => {
      return item.price + currentTotal;
    }, 0);
    totalBooked = currentBooking.length;
  } else {
    totalCollected = 0;
    totalBooked = 0;
  }
  return (
    <div className='card bg-light '>
      <h4 className='text-left'>
        Today's Collection:{' '}
        <span className='text-danger'>{`TZS ${totalCollected}`}</span>{' '}
        <span style={{ float: 'right' }} className='badge badge-primary'>
          Rooms: {totalBooked}
        </span>
      </h4>
    </div>
  );
};

export default BookingInfo;
