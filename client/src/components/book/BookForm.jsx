import React, { Fragment, useContext, useState, useEffect } from 'react';
import BookContext from '../../context/booking/bookContext';
import AlertContext from '../../context/alert/alertContext';

const BookForm = () => {
  const bookContext = useContext(BookContext);
  const alertContext = useContext(AlertContext);

  const { addBooking, current, clearCurrent, error, clearErrors } = bookContext;
  const { setAlert } = alertContext;

  const [book, setBooking] = useState({
    name: '',
    number: '',
    price: '',
    checkOut: null,
    vacancy: false,
  });

  useEffect(() => {
    if (current !== null) {
      setBooking({ ...current, vacancy: false });
    } else {
      setBooking({
        name: '',
        number: '',
        price: '',
        checkOut: null,
        vacancy: false,
      });
    }
    if (error === 'Room Already Booked') {
      setAlert(error, 'danger', 2000);
      clearErrors();
    }
  }, [current, error]);

  const { name, number, price, checkOut } = book;

  const handleSubmit = (e) => {
    e.preventDefault();
    addBooking(book);
    clearAll();
    setAlert('Booked Successfully', 'danger', 2000);
    clearErrors();
  };

  const clearAll = () => {
    clearCurrent();
  };
  return (
    <Fragment>
      {current && (
        <form onSubmit={handleSubmit}>
          <div className='card bg-light'>
            <input
              type='text'
              placeholder='Room Name'
              name='name'
              value={name}
              required
              disabled
              onChange={(e) => setBooking({ ...book, name: e.target.value })}
            />
            <input
              type='number'
              placeholder='Room Number'
              name='number'
              value={number}
              required
              disabled
              onChange={(e) => setBooking({ ...book, number: e.target.value })}
            />
            <input
              type='number'
              placeholder='Room Price'
              name='price'
              value={price}
              required
              disabled
              onChange={(e) => setBooking({ ...book, price: e.target.value })}
            />
            <input
              type='hidden'
              name='vacancy'
              value='false'
              required
              disabled
              onChange={(e) => setBooking({ ...book, vacancy: e.target.value })}
            />
            <label htmlFor='Checkout'>Check-Out</label>
            <input
              type='datetime-local'
              name='checkOut'
              value={checkOut}
              required
              onChange={(e) =>
                setBooking({ ...book, checkOut: e.target.value })
              }
            />
            <div>
              <input
                type='submit'
                value='Confirm Booking'
                className='btn btn-primary btn-block'
              />
            </div>
            {current && (
              <div>
                <button className='btn btn-danger btn-block' onClick={clearAll}>
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </Fragment>
  );
};
export default BookForm;
