import * as React from "react";
import { FC, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAvailableRooms } from "../services/bookingService";
import ShowListings from "../components/ShowListings";
import DateSelector from "../components/DateSelector";

interface Room {
  room_id: number;
  room_type: string;
  price_per_night: number;
  capacity: number;
}

interface RoomsResponse {
  availableRooms: Room[];
}

const FindListingsPage: FC = () => {
  const [searchParams] = useSearchParams();
  const [rooms, setRooms] = React.useState<RoomsResponse>({
    availableRooms: [],
  });

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  useEffect(() => {
    if (startDate && endDate) {
      const loadData = async () => {
        const formattedDates = { startDate, endDate };
        // console.log(formattedDates);
        try {
          const response: RoomsResponse = await getAvailableRooms(
            formattedDates
          );
          setRooms(response);
          // console.log(response);
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
      <DateSelector initialDates={{ startDate, endDate }} />
      <ShowListings
        rooms={rooms.availableRooms}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default FindListingsPage;
