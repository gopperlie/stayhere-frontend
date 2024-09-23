import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container, Button } from "@mui/material";
import { getAvailableRooms } from "../services/bookingService";
// import { debugLog } from "../utils/debug";

interface Dates {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export default function DatesSelector() {
  // State to hold both start and end dates in an array
  const [dates, setDates] = React.useState<Dates>({
    startDate: dayjs("2024-09-10"),
    endDate: dayjs("2024-09-20"),
  });

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

    try {
      const newTransferResponse = await getAvailableRooms(formattedDates);
      console.log(newTransferResponse); //object
    } catch (err) {
      console.error((err as Error).message);
    }
  };

  return (
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
  );
}
