import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

interface Room {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
}

interface RoomsListProps {
  rooms: Room[];
}

const ShowListings: React.FC<RoomsListProps> = ({ rooms }) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
      {rooms.map((room) => (
        <Card key={room.room_id} sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            alt={room.room_type}
            height="140"
            // image="/static/images/cards/contemplative-reptile.jpg"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {room.room_type}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Price per night: ${room.price_per_night} - Capacity:{" "}
              {room.capacity} persons
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Book</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ShowListings;
