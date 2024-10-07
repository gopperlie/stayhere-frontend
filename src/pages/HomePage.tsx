import { FC } from "react";
// import DatesSelector from "../components/DateSelector";
import { Greeting } from "../components/Greeting";
import { useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";
import DateSelectorNew from "../components/DateSelectorNew";
// import { DatePickerWithRange } from "@/components/DateRangePicker";

const HomePage: FC = () => {
  const [searchParams] = useSearchParams();
  const from = searchParams.get("startDate") || undefined;
  const to = searchParams.get("endDate") || undefined;

  return (
    <Container
      sx={{
        // height: "5",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        minHeight: "50vh",
        border: "2px solid black", // Visible border to make the margin more apparent
        // padding: "16px", // Add padding inside the container
        backgroundColor: "lightgray", // Set a background color to highlight the container
      }}
      maxWidth="xl"
    >
      <Greeting />
      <DateSelectorNew initialDates={{ from, to }} />
      {/* <DatePickerWithRange /> */}
    </Container>
  );
};

export default HomePage;
