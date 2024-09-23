import * as React from "react";
import { FC, useEffect } from "react";
// import DatesSelector from "../components/DateSelector";
// import ShowListings from "../components/ShowListings";
import { useSearchParams } from "react-router-dom";
import { getAvailableRooms } from "../services/bookingService";
import ShowListings from "../components/ShowListings";

interface Room {
  room_id: number;
}

interface RoomsResponse {
  availableRooms: Room[];
}

const FindListingsPage: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [rooms, setRooms] = React.useState<RoomsResponse>({
    availableRooms: [],
  });
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    // If startDate and endDate are available, load data
    if (startDate && endDate) {
      const loadData = async () => {
        const formattedDates = { startDate, endDate };

        try {
          const response: RoomsResponse = await getAvailableRooms(
            formattedDates
          );
          setRooms(response);
        } catch (err) {
          console.error((err as Error).message);
        }
      };

      loadData();
    }
  }, [startDate, endDate]);

  return (
    <>
      <h1>All available listings</h1>
      <ShowListings rooms={rooms.availableRooms} />
    </>
  );
};

export default FindListingsPage;
