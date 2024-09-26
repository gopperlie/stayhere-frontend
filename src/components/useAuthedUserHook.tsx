import { useContext } from "react";
import AuthedUserContext from "./AuthedUserContext"; // Adjust the path as necessary

export const useAuthedUser = () => {
  const context = useContext(AuthedUserContext);
  if (context === undefined) {
    throw new Error("useAuthedUser must be used within an AuthedUserProvider");
  }
  return context;
};
