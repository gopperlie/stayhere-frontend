import { FC } from "react";
import * as React from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getBookingById, modifyBooking } from "@/services/bookingService";
import { formatDateForInput } from "@/utils/getDateWithoutTime";

type booking = {
  room_id: string;
  customer_id: string;
  start_date: string;
  end_date: string;
  status: string;
};

type FormBooking = {
  roomId: string;
  customerId: string;
  startDate: string;
  endDate: string;
};

const ModifyBookingPage: FC = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const { bookingId } = useParams<{ bookingId: string }>();

  const [bookingData, setBookingData] = React.useState<booking>({
    room_id: "Room ID",
    customer_id: "Customer ID",
    start_date: new Date().toISOString().split("T")[0],
    end_date: new Date().toISOString().split("T")[0],
    status: "active",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        if (bookingId) {
          const data = await getBookingById(bookingId);
          setBookingData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch bookings");
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = e.target;

    // Ensure 'name' is treated as a string
    if (typeof name === "string") {
      setBookingData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
    console.log(bookingData);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const typedBookingData: FormBooking = {
      roomId: bookingData.room_id, // Make sure these are mapped correctly
      customerId: bookingData.customer_id,
      startDate: bookingData.start_date,
      endDate: bookingData.end_date,
    };

    try {
      const newSubmitResponse = await modifyBooking(
        typedBookingData,
        bookingId
      );
      console.log(newSubmitResponse);
      navigate("/list-bookings");
    } catch (err) {
      console.error(err);
      setError("Failed to submit changes");
      console.log(error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1.5, width: "35ch" }, // TextField margin and width
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
        height: "100vh",
        paddingTop: "64px",
      }}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h5" gutterBottom>
        Modify Booking
      </Typography>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <TextField
            label="Room ID"
            name="room_id"
            value={bookingData.room_id}
            onChange={handleChange}
            required
          />
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <TextField
            label="Customer ID"
            name="customer_id"
            value={bookingData.customer_id}
            onChange={handleChange}
            required
          />
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <TextField
            label="Start Date"
            name="start_date"
            value={formatDateForInput(new Date(bookingData.start_date))}
            type="date"
            onChange={handleChange}
            required
          />
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <TextField
            label="End Date"
            name="end_date"
            value={formatDateForInput(new Date(bookingData.end_date))}
            type="date"
            onChange={handleChange}
            required
          />
        </FormControl>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <FormControl fullWidth>
          <TextField
            select
            label="Status"
            name="status"
            value={bookingData.status}
            required
          >
            <MenuItem value="active">Active</MenuItem>
            <MenuItem value="cancelled">Cancelled</MenuItem>
          </TextField>
        </FormControl>
      </div>
      <Button variant="contained" onClick={handleSubmit}>
        Submit changes
      </Button>
    </Box>
  );
};

export default ModifyBookingPage;
