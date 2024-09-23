import { FC } from "react";
import DatesSelector from "../components/DateSelector";
import { Greeting } from "../components/Greeting";
import { useSearchParams } from "react-router-dom";

const HomePage: FC = () => {
  const [searchParams] = useSearchParams();
  const startDate = searchParams.get("startDate") || null;
  const endDate = searchParams.get("endDate") || null;
  return (
    <>
      <Greeting />
      <DatesSelector initialDates={{ startDate, endDate }} />
    </>
  );
};

export default HomePage;
