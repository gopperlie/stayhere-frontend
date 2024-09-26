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
import { newCustomer } from "@/services/custService";
import { newBooking } from "@/services/bookingService";

interface Customer {
  family_name: string;
  given_name: string;
  email: string;
  nationality: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
}

type FormBooking = {
  roomId: string;
  startDate: string;
  endDate: string;
};

const NewCxNewBookingPage: FC = () => {
  const [error, setError] = React.useState<string | null>(null);
  const [customerData, setCustomerData] = React.useState<Customer>({
    family_name: "",
    given_name: "",
    email: "",
    nationality: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
  });

  const [bookingData, setBookingData] = React.useState<FormBooking>({
    roomId: "",
    startDate: "",
    endDate: "",
  });
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Set the customer data with the current value of the input
    setCustomerData((prevData) => ({
      ...prevData,
      email: value,
    }));

    // Validate the email
    if (value === "") {
      setError(null); // Clear error if the email is empty
    } else if (emailRegex.test(value)) {
      setError(null); // Clear error if valid
    } else {
      setError("Invalid email address."); // Set error if invalid
    }
  };
  const handleChangeCxExEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeBooking = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let customerId: string | null = null; // Declare customerId in the outer scope

    try {
      const newSubmitResponse = await newCustomer(customerData);
      customerId = newSubmitResponse.customer.customer_id; // Assign value to customerId
      console.log("Customer created successfully:", customerId);
    } catch (err) {
      console.error("Failed to create customer:", err);
      setError("Failed to submit customer data");
      return; // Exit if customer creation fails
    }

    // Ensure customerId is set before attempting the booking
    if (customerId) {
      try {
        const newBookingData = {
          customerId, // Now customerId is accessible here
          ...bookingData, // Assume you have bookingDetails prepared
        };

        const newBookingResponse = await newBooking(newBookingData);
        console.log("Booking created successfully:", newBookingResponse);
      } catch (err) {
        console.error("Failed to create booking:", err);
        setError("Failed to submit new booking");
      }
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Family Name:</Box>
        <TextField
          id="family name"
          label="Family Name"
          name="family_name"
          value={customerData.family_name}
          onChange={handleChangeCxExEmail}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Given Name:</Box>
        <TextField
          id="family name"
          label="Given Name"
          name="given_name"
          value={customerData.given_name}
          onChange={handleChangeCxExEmail}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Email Add:</Box>
        <TextField
          id="email"
          label="Email"
          name="email"
          value={customerData.email}
          onChange={handleChangeEmail}
          helperText={error}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Nationality:</Box>
        <TextField
          id="nationality"
          label="Nationality"
          name="nationality"
          value={customerData.nationality}
          onChange={handleChangeCxExEmail}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Date of Birth:</Box>
        <TextField
          id="date_of_birth"
          label="YYYY-MM-DD"
          name="date_of_birth"
          value={customerData.date_of_birth}
          onChange={handleChangeCxExEmail}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Gender:</Box>
        <TextField
          id="gender"
          label="Gender"
          name="gender"
          value={customerData.gender}
          onChange={handleChangeCxExEmail}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Room ID:</Box>
        <TextField
          id="roomId"
          label="roomId"
          name="roomId"
          value={bookingData.roomId}
          onChange={handleChangeBooking}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>Start Date:</Box>
        <TextField
          id="startDate"
          label="YYYY-MM-DD"
          name="startDate"
          value={bookingData.startDate}
          onChange={handleChangeBooking}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end", // Align the text fields and labels to the left
        }}
      >
        <Box sx={{ marginRight: 2 }}>End Date:</Box>
        <TextField
          id="endDate"
          label="YYYY-MM-DD"
          name="endDate"
          value={bookingData.endDate}
          onChange={handleChangeBooking}
        />
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Submit new request
      </Button>
    </Box>
  );
};

export default NewCxNewBookingPage;
