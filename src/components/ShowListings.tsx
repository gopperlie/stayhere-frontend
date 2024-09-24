interface Room {
  room_id: number;
}

interface RoomsListProps {
  rooms: Room[];
}

const ShowListings: React.FC<RoomsListProps> = ({ rooms }) => {
  return (
    <div>
      {rooms.map((room) => (
        <div key={room.room_id}>Room ID: {room.room_id}</div>
      ))}
    </div>
    //need to add a button to book. before that need to sign up as customer
  );
};

export default ShowListings;
