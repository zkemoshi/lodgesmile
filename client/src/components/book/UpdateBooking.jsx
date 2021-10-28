import React, { Fragment, useContext, useState, useEffect } from 'react';
import BookContext from '../../context/booking/bookContext';
import Spinner from '../layout/Spinner';
import UpdateBookingItem from './UpdateBookingItem';

const UpdateBooking = () => {
  const bookContext = useContext(BookContext);
  const { loading, booking, getBooking } = bookContext;

  const [datecheck, setDatecheck] = useState(null);

  console.log(datecheck);
  useEffect(() => {
    getBooking();
    //eslint-disable-next-line
  }, []);

  let filteredBooking;
  if (booking !== null && booking.length !== 0) {
    filteredBooking = booking.filter(
      (filtered) => filtered.checkIn.substr(0, 10) === datecheck
    );
  }
  console.log(filteredBooking);
  return (
    <Fragment>
      <div>
        <form action=''>
          <label for='start'>Filter by date:</label>

          <input
            type='date'
            id='start'
            name='trip-start'
            value={datecheck}
            onChange={(e) => setDatecheck(e.target.value)}
          />
        </form>
      </div>
      <div className='card grid-1 bg-light '>
        {booking !== null && !loading ? (
          <>
            {filteredBooking !== null
              ? filteredBooking.map((item) => (
                  <UpdateBookingItem key={item._id} booking={item} />
                ))
              : booking.map((item) => (
                  <UpdateBookingItem key={item._id} booking={item} />
                ))}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </Fragment>
  );
};

export default UpdateBooking;
