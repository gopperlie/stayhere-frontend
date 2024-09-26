import { FC } from "react";
import * as React from "react";
import { newCustomer } from "@/services/custService";
import { newBooking } from "@/services/bookingService";
import ShowConfirmation from "@/components/ShowConfirmation";
import NewCxNewBookingForm from "@/components/NewCxNewBookingForm";

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
        setConfBookingData(newBookingResponse);
        setReservationSuccessful(true);
      } catch (err) {
        console.error("Failed to create booking:", err);
        setError("Failed to submit new booking");
      }
    }
  };

  return (
    <>
      {reservationSuccessful ? (
        <ShowConfirmation
          customerData={customerData}
          confBookingData={confBookingData}
        />
      ) : (
        <NewCxNewBookingForm
          customerData={customerData}
          bookingData={bookingData}
          error={error}
          handleChangeEmail={handleChangeEmail}
          handleChangeCxExEmail={handleChangeCxExEmail}
          handleChangeBooking={handleChangeBooking}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default NewCxNewBookingPage;
