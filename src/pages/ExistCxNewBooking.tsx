import { FC } from "react";
import * as React from "react";
import { newCustomer } from "@/services/custService";
import { newBooking } from "@/services/bookingService";
import ShowConfirmation from "@/components/ShowConfirmation";
import { useParams } from "react-router-dom";
import { customerSignup } from "@/services/authService";

interface ExistingCustomer {
  email: string;
  password: string;
}

type FormBooking = {
  roomId: string;
  startDate: string;
  endDate: string;
};

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

interface DecodedUser {
  username: string;
  user_id: number;
  role: string;
  iat: number; // issued at time
  exp: number;
}
const ExistCxNewBookingPage: FC = () => {
  const { roomId, startDate, endDate } = useParams();
  const [error, setError] = React.useState<string | null>(null);
  const [customerData, setCustomerData] = React.useState<ExistingCustomer>({
    email: "",
    password: "",
  });

  const [bookingData, setBookingData] = React.useState<FormBooking>({
    roomId: roomId || "",
    startDate: startDate || "",
    endDate: endDate || "",
  });
  const [confBookingData, setConfBookingData] = React.useState<NewConfBooking>({
    message: "",
    booking: {
      booking_id: null,
      room_id: null,
      customer_id: null,
      start_date: "",
      end_date: "",
      status: "",
      date_created: "",
      last_modified: "",
    },
  });

  const [reservationSuccessful, setReservationSuccessful] =
    React.useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let customerId: string | null = null; // Declare customerId in the outer scope
    let user: DecodedUser | null = null;

    // Step 1: Customer logs in
    try {
      const newSubmitResponse = await customerLogin(customerData);
      customerId = newSubmitResponse.customer.customer_id; // Assign value to customerId
      console.log("Customer logged in successfully:", customerId);
    } catch (err) {
      console.error("Failed to create customer:", err);
      setError("Failed to submit customer data");
      return; // Exit if fail to log in
    }

    // Step 2: Signup the customer
    try {
      const { email, password } = customerData;
      const cxSignUpData = { email, password };
      user = await customerSignup(cxSignUpData);
    } catch (err) {
      console.error("Failed to signup customer:", err);
      setError("Failed to signup customer data");
      return; // Exit if customer signup fails
    }

    // Step 3: Create the booking
    if (customerId && user) {
      // Ensure customerId is set before attempting the booking
      try {
        const newBookingData = {
          customerId, // Now customerId is accessible here
          ...bookingData, // Assume you have bookingDetails prepared
        };

        const newBookingResponse = await newBooking(newBookingData);
        setConfBookingData(newBookingResponse);
        setReservationSuccessful(true);
      } catch (err) {
        console.error("Failed to create booking:", err);
        setError("Failed to submit new booking");
      }
    }
  };
  return <></>;
};

export default ExistCxNewBookingPage;
