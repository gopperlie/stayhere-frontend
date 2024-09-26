import { FC } from "react";

interface Customer {
  family_name: string;
  given_name: string;
  email: string;
  nationality: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
}

type ConfBooking = {
  booking_id: number | null;
  room_id: number | null;
  customer_id: number | null;
  start_date: string;
  end_date: string;
  status: string;
  date_created: string;
  last_modified: string;
};

interface NewConfBooking {
  message: string;
  booking: ConfBooking;
}

interface ShowConfirmationProps {
  customerData: Customer;
  confBookingData: NewConfBooking;
}

const ShowConfirmation: FC<ShowConfirmationProps> = ({
  customerData,
  confBookingData,
}) => {
  return (
    <>
      <h1>Confirmation Details</h1>
      <p>
        Customer: {customerData.given_name} {customerData.family_name}
      </p>
      <p>Message: {confBookingData.message}</p>
      <p>Booking ID: {confBookingData.booking.booking_id}</p>
      <p>Room ID: {confBookingData.booking.room_id}</p>
      {/* Add more details as needed */}
    </>
  );
};

export default ShowConfirmation;
