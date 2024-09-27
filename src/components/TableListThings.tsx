import { FC, useEffect, useState } from "react";
import { getAllBookings } from "@/services/bookingService";
import { getDateInSingapore } from "@/utils/getDateWithoutTime";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Booking {
  booking_id: number;
  room_id: number;
  customer_id: number;
  start_date: string; // or Date
  end_date: string; // or Date
  status: string;
  date_created: string;
  last_modified: string;
}
import { cancelBooking } from "@/services/bookingService";

const TableListThings: FC = () => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]); // Set the type to an array of bookings
  const [error, setError] = useState<string | null>(null);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  // useEffect to fetch bookings on component mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookings = await getAllBookings();
        setAllBookings(bookings);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      }
    };

    fetchBookings();
  }, [reload]); // Empty dependency array to run once on mount

  // Render loading or error state
  if (error) {
    return <div>{error}</div>;
  }

  if (!allBookings.length) {
    return <div>Loading...</div>;
  }

  const handleCancel = async (bookingId: string) => {
    try {
      await cancelBooking(bookingId); // Await the cancellation
      setReload(!reload);
    } catch (err) {
      console.error("Failed to cancel", err);
    }
  };
  return (
    <TableContainer component={Paper} sx={{ width: "75%", margin: "0 auto" }}>
      <h1>Bookings Table</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Room ID</TableCell>
            <TableCell>Customer ID</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date Created</TableCell>
            <TableCell>Last Modified</TableCell>

            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allBookings.map((booking) => (
            <TableRow key={booking.booking_id}>
              <TableCell>{booking.booking_id}</TableCell>
              <TableCell>{booking.room_id}</TableCell>
              <TableCell>{booking.customer_id}</TableCell>
              <TableCell>{getDateInSingapore(booking.start_date)}</TableCell>
              <TableCell>{getDateInSingapore(booking.end_date)}</TableCell>
              <TableCell>{booking.status}</TableCell>
              <TableCell>{getDateInSingapore(booking.date_created)}</TableCell>
              <TableCell>{booking.last_modified}</TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginRight: 10 }}
                  onClick={() =>
                    navigate(`/modify-booking/${booking.booking_id}`)
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleCancel(String(booking.booking_id))}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableListThings;
