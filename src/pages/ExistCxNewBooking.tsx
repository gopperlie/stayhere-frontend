import { FC } from "react";
import * as React from "react";
import { newBooking } from "@/services/bookingService";
import ShowConfirmation from "@/components/ShowConfirmation";
import { useParams } from "react-router-dom";
import { getCustomerId, cxLogin } from "@/services/custService";
import ExistCxNewBookingForm from "@/components/ExistCxNewBookingForm";

interface ExistingCustomer {
  username: string;
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
  const customerData = {
    family_name: "Sir",
    given_name: "Madam",
    email: "",
    phone_number: "",
    nationality: "",
    date_of_birth: "",
    gender: "",
    password: "",
  };
  const { roomId, startDate, endDate } = useParams();
  const [error, setError] = React.useState<string | null>(null);
  const [extCustomerData, setExtCustomerData] =
    React.useState<ExistingCustomer>({
      username: "",
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
    setExtCustomerData((prevData) => ({
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
      user = await cxLogin(extCustomerData); // Assign value to customerId
      console.log("Customer logged in successfully");
    } catch (err) {
      console.error("Failed to log in customer:", err);
      setError("Failed to log in");
      console.log(error);
      return; // Exit if fail to log in
    }

    if (user) {
      try {
        const { username } = extCustomerData;
        const cxEmail = {
          email: username,
        };
        const submitResponse = await getCustomerId(cxEmail);
        customerId = submitResponse.customer_id;
        console.log(customerId);
      } catch (err) {
        console.error("Failed to get customer ID:", err);
        setError("Failed to get customer ID");
        console.log(error);
        return; // Exit if customer signup fails
      }
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

  React.useEffect(() => {
    if (roomId) {
      setBookingData((prev) => ({ ...prev, roomId }));
    }
    if (startDate) {
      setBookingData((prev) => ({ ...prev, startDate }));
    }
    if (endDate) {
      setBookingData((prev) => ({ ...prev, endDate }));
    }
  }, [roomId, startDate, endDate]);
  return (
    <>
      {reservationSuccessful ? (
        <ShowConfirmation
          customerData={customerData}
          confBookingData={confBookingData}
        />
      ) : (
        <ExistCxNewBookingForm
          extCustomerData={extCustomerData}
          bookingData={bookingData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default ExistCxNewBookingPage;
