const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

interface Dates {
  startDate: string | null;
  endDate: string | null;
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
    return json;
    if (json.error) {
      throw new Error(json.error);
    }
  } catch (err) {
    console.log(err as Error);
    throw err;
  }
};

const getAllBookings = async (dates: Dates) => {
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
    return json;
    if (json.error) {
      throw new Error(json.error);
    }
  } catch (err) {
    console.log(err as Error);
    throw err;
  }
};

export { getAvailableRooms, getAllBookings };
