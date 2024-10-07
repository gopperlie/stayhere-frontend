import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRange } from "react-day-picker";
import { Container, Button } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { DatePickerWithRange } from "./DateRangePicker";

interface DateSelectorProps {
  initialDates: { from: string | undefined; to: string | undefined };
}

const DateSelectorNew: FC<DateSelectorProps> = ({ initialDates }) => {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: initialDates?.from ? dayjs(initialDates.from).toDate() : undefined,
    to: initialDates?.to ? dayjs(initialDates.to).toDate() : undefined,
  });

  const navigate = useNavigate();

  const convertDateToDayjs = (date: Date | undefined): Dayjs | undefined => {
    return date ? dayjs(date) : undefined; // Convert to dayjs or return null if undefined
  };

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    if (selectedDate) {
      setDate({
        from: convertDateToDayjs(selectedDate.from)?.toDate() || undefined,
        to: convertDateToDayjs(selectedDate.to)?.toDate() || undefined,
      });
    } else {
      setDate(undefined); // Handle case where no date is selected
    }
    console.log(selectedDate); // You can use `selectedDate` in the parent component
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const formattedDates = {
      startDate: date?.from ? dayjs(date.from).format("YYYY-MM-DD") : null,
      endDate: date?.to ? dayjs(date.to).format("YYYY-MM-DD") : null,
    };

    const params = new URLSearchParams();
    if (formattedDates.startDate) {
      params.append("startDate", formattedDates.startDate);
    }
    if (formattedDates.endDate) {
      params.append("endDate", formattedDates.endDate);
    }
    navigate(`/listings?${params.toString()}`);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container
        maxWidth="sm"
        style={{
          display: "flex",
          justifyContent: "space-between",
          border: "2px solid black", // Visible border to make the margin more apparent
        }}
      >
        <DatePickerWithRange onDateChange={handleDateChange} />

        <Button variant="contained" onClick={handleSubmit}>
          Find rooms
        </Button>
      </Container>
    </LocalizationProvider>
  );
};

export default DateSelectorNew;
