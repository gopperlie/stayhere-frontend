import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Room {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
}

interface RoomsListProps {
  rooms: Room[];
  startDate: string | null;
  endDate: string | null;
}

const ShowListings: React.FC<RoomsListProps> = ({
  rooms,
  startDate,
  endDate,
}) => {
  const navigate = useNavigate();

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
            <Button
              size="small"
              onClick={() =>
                navigate(
                  `/newcxnewbooking/${room.room_id}/${startDate}/${endDate}`
                )
              }
            >
              Book
            </Button>
            <Button
              size="small"
              onClick={() =>
                navigate(
                  `/extcxnewbooking/${room.room_id}/${startDate}/${endDate}`
                )
              }
            >
              Re Cx Book
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default ShowListings;
