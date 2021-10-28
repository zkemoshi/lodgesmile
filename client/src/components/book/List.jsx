import React, { Fragment, useContext, useEffect } from 'react';
import RoomContext from '../../context/room/roomContext';
import Spinner from '../layout/Spinner';
import RoomList from './RoomList';

const List = () => {
  const roomContext = useContext(RoomContext);

  const { rooms, getRooms, loading } = roomContext;

  useEffect(() => {
    getRooms();
    //eslint-disable-next-line
  }, []);

  if (rooms !== null && rooms.length === 0 && !loading) {
    return <h4>Please add rooms</h4>;
  }
  return (
    <div className='card'>
      {rooms !== null && !loading ? (
        <>
          {rooms.map((room) => (
            <RoomList key={room._id} room={room} />
          ))}
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default List;
