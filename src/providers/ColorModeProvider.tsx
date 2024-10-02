import { createContext, useContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material";

type ColorTheme = {
  color: string;
};
interface ColorThemeContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const ColorModeContext = createContext(undefined);

export const useColorMode = () => {
  return useContext(ColorModeContext);
};
