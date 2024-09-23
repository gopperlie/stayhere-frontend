import { FC } from "react";
import DatesSelector from "../components/DateSelector";
import { Greeting } from "../components/Greeting";

const HomePage: FC = () => {
  return (
    <>
      <Greeting />
      <DatesSelector />
    </>
  );
};

export default HomePage;
