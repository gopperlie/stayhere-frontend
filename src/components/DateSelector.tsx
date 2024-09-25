import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange } from "@mui/x-date-pickers-pro/models";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Container, Button } from "@mui/material";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// interface Dates {
//   startDate: Dayjs | null;
//   endDate: Dayjs | null;
// }

interface DateSelectorProps {
  initialDates: { startDate: string | null; endDate: string | null };
}

const DateSelector: FC<DateSelectorProps> = ({ initialDates }) => {
  const [dates, setDates] = React.useState<DateRange<Dayjs>>([
    initialDates.startDate ? dayjs(initialDates.startDate) : null,
    initialDates.endDate ? dayjs(initialDates.endDate) : null,
  ]);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(`searchParams:${searchParams}`);

  const handleDateRangeChange = (newRange: DateRange<Dayjs>) => {
    setDates(newRange);
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const formattedDates = {
      startDate: dates[0] ? dates[0]!.format("YYYY-MM-DD") : null,
      endDate: dates[1] ? dates[1]!.format("YYYY-MM-DD") : null,
    };

    const params = new URLSearchParams();
    if (formattedDates.startDate) {
      params.append("startDate", formattedDates.startDate);
    }
    if (formattedDates.endDate) {
      params.append("endDate", formattedDates.endDate);
    }
    setSearchParams(params);

    // Navigate to listings with the new params
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="sm"
        // style={{
        //   display: "flex", // Enable flexbox
        //   flexDirection: "column", // Stack items vertically
        //   justifyContent: "center", // Center items vertically
        //   alignItems: "center", // Center items horizontally
        //   minHeight: "100vh", // Make the container fill the viewport height
        // }}
      >
        <DateRangePicker
          value={dates}
          localeText={{
            start: "From",
            end: "To",
          }}
          onChange={handleDateRangeChange}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Find rooms
        </Button>
      </Container>
    </LocalizationProvider>
  );
};

export default DateSelector;
