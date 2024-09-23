import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container, Button } from "@mui/material";
import { getAvailableRooms } from "../services/bookingService";
import ShowListings from "./ShowListings";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// import { debugLog } from "../utils/debug";

interface Dates {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface Room {
  room_id: number;
}

interface RoomsResponse {
  availableRooms: Room[];
}
const DateSelector: FC = () => {
  // State to hold both start and end dates in an array
  const [dates, setDates] = React.useState<Dates>({
    startDate: dayjs("2024-09-10"),
    endDate: dayjs("2024-09-20"),
  });

  const [rooms, setRooms] = React.useState<RoomsResponse>({
    availableRooms: [],
  });

  //   const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleStartDateChange = (newDate: Dayjs | null) => {
    setDates((prevDates) => ({ ...prevDates, startDate: newDate }));
  };

  const handleEndDateChange = (newDate: Dayjs | null) => {
    setDates((prevDates) => ({ ...prevDates, endDate: newDate }));
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Format the dates to YYYY-MM-DD
    const formattedDates = {
      startDate: dates.startDate ? dates.startDate.format("YYYY-MM-DD") : null,
      endDate: dates.endDate ? dates.endDate.format("YYYY-MM-DD") : null,
    };

    const params = new URLSearchParams();
    if (formattedDates.startDate) {
      params.append("startDate", formattedDates.startDate);
    }
    if (formattedDates.endDate) {
      params.append("endDate", formattedDates.endDate);
    }
    setSearchParams(params);
    console.log(searchParams);

    // Navigate to the listings page
    // navigate("/listings");
    try {
      const response: RoomsResponse = await getAvailableRooms(formattedDates);
      setRooms(response);
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm">
          <DatePicker
            label="Start Date"
            value={dates.startDate}
            onChange={handleStartDateChange}
            //   renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={dates.endDate}
            onChange={handleEndDateChange}
            //   renderInput={(params) => <TextField {...params} />}
          />
          <Button variant="contained" onClick={handleSubmit}>
            Find rooms
          </Button>
        </Container>
      </LocalizationProvider>
      <ShowListings rooms={rooms.availableRooms} />
    </>
  );
};

export default DateSelector;
