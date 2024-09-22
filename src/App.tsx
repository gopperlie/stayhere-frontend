import "./App.css";
import * as React from "react";
import { Greeting } from "./components/Greeting";
import dayjs, { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Container } from "@mui/material";

function App() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs("2022-04-17"));

  return (
    <>
      <Greeting />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container maxWidth="sm">
          <DatePicker
            label="Uncontrolled picker"
            defaultValue={dayjs("2022-04-17")}
          />
          <DatePicker
            label="Controlled picker"
            value={value}
            onChange={(newValue) => setValue(newValue)}
          />
        </Container>
      </LocalizationProvider>
    </>
  );
}

export default App;
