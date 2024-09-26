import { FC } from "react";
import { Box, TextField, Button } from "@mui/material";

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

interface NewCxNewBookingFormProps {
  customerData: Customer;
  bookingData: FormBooking;
  error: string | null;
  handleChangeEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeCxExEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBooking: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const NewCxNewBookingForm: FC<NewCxNewBookingFormProps> = ({
  customerData,
  bookingData,
  error,
  handleChangeEmail,
  handleChangeCxExEmail,
  handleSubmit,
  //   handleChangeBooking,
}) => {
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
      onSubmit={handleSubmit}
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
      <Button variant="contained" type="submit">
        Submit new request
      </Button>
    </Box>
  );
};

export default NewCxNewBookingForm;
