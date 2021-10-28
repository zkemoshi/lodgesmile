import React, { useContext } from 'react';
import BookContext from '../../context/booking/bookContext';
import Spinner from '../layout/Spinner';
import BookingList from './BookingList';

const Book = () => {
  const bookContext = useContext(BookContext);
  const { loading, currentBooking } = bookContext;

  
  if (currentBooking !== null && currentBooking.length === 0 && !loading) {
    return <h4>No Bookings Today</h4>;
  }
  return (
    <div className='card grid-5 bg-light '>
      {currentBooking !== null && !loading ? (
        <>
          {currentBooking.map((item) => (
            <BookingList key={item._id} room={item} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Book;
