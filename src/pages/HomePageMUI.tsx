import { FC } from "react";
import DatesSelector from "../components/DateSelector";
import { Greeting } from "../components/Greeting";
import { useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";

const HomePage: FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") || null;
  const endDate = searchParams.get("endDate") || null;

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
      <DatesSelector initialDates={{ startDate, endDate }} />
    </Container>
  );
};

export default HomePage;
