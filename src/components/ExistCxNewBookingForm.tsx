import { FC } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ExistingCustomer {
  username: string;
  password: string;
}

type FormBooking = {
  roomId: string;
  startDate: string;
  endDate: string;
};

interface ExistCxNewBookingFormProps {
  extCustomerData: ExistingCustomer;
  bookingData: FormBooking;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ExistCxNewBookingForm: FC<ExistCxNewBookingFormProps> = ({
  extCustomerData,
  bookingData,
  handleChange,
  handleSubmit,
}) => {
  const navigate = useNavigate();
  return (
    <>
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
        onSubmit={handleSubmit}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Align the text fields and labels to the left
          }}
        >
          <Box sx={{ marginRight: 2 }}>Username email:</Box>
          <TextField
            id="username"
            label="input email"
            name="username"
            value={extCustomerData.username}
            onChange={handleChange}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end", // Align the text fields and labels to the left
          }}
        >
          <Box sx={{ marginRight: 2 }}>Password:</Box>
          <TextField
            id="password"
            label="Password"
            name="password"
            type="password"
            value={extCustomerData.password}
            onChange={handleChange}
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
            disabled={true}
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
            disabled={true}
          />
        </Box>
        <Box
          sx={{
            display: "flex", // Align buttons horizontally
            justifyContent: "space-between", // Optional: space between buttons
            gap: 2, // Optional: gap between buttons
          }}
        >
          <Button variant="contained" color="primary" type="submit">
            Pay and confirm
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/")}
          >
            Select new dates
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ExistCxNewBookingForm;
