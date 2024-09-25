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
import { getBookingById } from "@/services/bookingService";
import { formatDateForInput } from "@/utils/getDateWithoutTime";

type booking = {
  room_id: string;
  customer_id: string;
  start_date: string;
  end_date: string;
  status: string;
};

const ModifyBookingPage: FC = () => {
  // const navigate = useNavigate();
  const [error, setError] = React.useState<string | null>(null);
  const { bookingId } = useParams<{ bookingId: string }>();
  console.log(bookingId);
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
          const data = await getBookingById(bookingId); // Ensure id is a string
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(bookingData);
    // try {
    //   const newSubmitResponse = await modifyBooking(bookingData);
    //   console.log(newSubmitResponse);
    //   navigate("/bookings");
    // } catch (err) {
    //   console.error(err);
    //   setError("Failed to submit changes");
    // }
  };
  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = event.target;
  //   setBookingData({ ...bookingData, [name]: value });
  // };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsLoading(true);
  //   try {
  //     const newTransferResponse = await newTransfer({
  //       ...transferData,
  //       amount,
  //     });
  //     console.log(newTransferResponse);
  //     navigate("/account/main");
  //   } catch (err) {
  //     console.error(err.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
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
            onChange={handleChange}
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
