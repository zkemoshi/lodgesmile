import React from 'react';
import PropTypes from 'prop-types';

const RoomItem = ({ room }) => {
  const { name, number, price } = room;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        {name} {'   '}
        {'   '}
        <span className='text-danger text-center'>{`TZS ${price}`}</span>
        <span style={{ float: 'right' }} className='badge badge-primary'>
          {number}
        </span>
      </h3>
    </div>
  );
};

RoomItem.propTypes = {
  room: PropTypes.object.isRequired,
};
export default RoomItem;
