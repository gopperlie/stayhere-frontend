import { FC } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ExistingCustomer {
  email: string;
  password: string;
}

type FormBooking = {
  roomId: string;
  startDate: string;
  endDate: string;
};

interface ExistCxNewBookingFormProps {
  customerData: ExistingCustomer;
  bookingData: FormBooking;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangeBooking: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

const ExistCxNewBookingForm: FC = () => {
  return <></>;
};

export default ExistCxNewBookingForm;
