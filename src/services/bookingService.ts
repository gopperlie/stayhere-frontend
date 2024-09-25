const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

interface Dates {
  startDate: string | null;
  endDate: string | null;
}

interface Booking {
  roomId: string;
  customerId: string;
  startDate: string;
  endDate: string;
}

const getAvailableRooms = async (dates: Dates) => {
  try {
    const res = await fetch(
      `${BACKEND_URL}/api/bookings/check-available-rooms`,
      {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dates),
      }
    );
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    console.log(err as Error);
    throw err;
  }
};

const newBooking = async (newBooking: Booking) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bookings/new`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    });

    if (!res.ok) {
      const error = await res.json(); // Check for JSON response first
      throw new Error(error.message || "Failed to create new booking");
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const modifyBooking = async (
  booking: Booking,
  bookingId: string | undefined
) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bookings/modify/${bookingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to modify booking");
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const cancelBooking = async (bookingId: string | undefined) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bookings/cancel/${bookingId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Failed to cancel booking");
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getAllBookings = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bookings/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(dates),
    });
    const json = await res.json();
    if (json.error) {
      throw new Error(json.error);
    }
    return json;
  } catch (err) {
    console.log(err as Error);
    throw err;
  }
};

const getBookingById = async (bookingId: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/bookings/${bookingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Booking not found or server error: ${res.status}`);
    }

    const json = await res.json();

    // Handle the case where the server returns an array
    if (!Array.isArray(json) || json.length === 0) {
      throw new Error("No booking found with the provided booking ID");
    }

    return json[0]; // Return the first booking object from the array
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export {
  getAvailableRooms,
  newBooking,
  modifyBooking,
  cancelBooking,
  getAllBookings,
  getBookingById,
};
