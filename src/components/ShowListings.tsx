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
  );
};

export default ShowListings;
