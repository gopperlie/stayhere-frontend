import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindListingsPage from "./pages/FindListings";
import AdminLogInPage from "./pages/AdminLogIn";
import * as authService from "../src/services/authService";
import AdminDashPage from "./pages/AdminDash";
import NavbarAdmin from "./components/NavbarAdmin";
import BookingsPage from "./pages/Bookings";
import ModifyBookingPage from "./pages/ModifyBookingPage";
import NewCxNewBookingPage from "./pages/NewCxNewBooking";
import { useAuthedUser } from "./providers/useAuthedUserHook";
import UnauthorizedPage from "./pages/UnauthorisedPage";
import ExistCxNewBookingPage from "./pages/ExistCxNewBooking";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function App() {
  const { user, setUser } = useAuthedUser();
  const handleSignout: () => void = () => {
    authService.signout(); // Call the signout function
    setUser(null); // Reset user state
  };

  const theme = createTheme({
    palette: {
      primary: {
        light: "#62d8f9",
        main: "#08b2e3",
        dark: "067d9d",
        contrastText: "#0b070e",
      },
      secondary: {
        light: "#75180c",
        main: "#ee6352",
        dark: "067d9d",
        contrastText: "#0b070e",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 10, // Set default border radius
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      {user && <NavbarAdmin handleSignout={handleSignout} />}
      <Routes>
        {/* Protected Route for Admin */}
        <Route
          path="/admin-dashboard"
          element={user ? <AdminDashPage /> : <Navigate to="/unauthorized" />}
        />
        <Route
          path="/list-bookings"
          element={user ? <BookingsPage /> : <Navigate to="/unauthorized" />}
        />
        <Route
          path="/modify-booking/:bookingId"
          element={
            user ? <ModifyBookingPage /> : <Navigate to="/unauthorized" />
          }
        />

        {/*Public Routes*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<FindListingsPage />} />
        <Route
          path="/newcxnewbooking/:roomId/:startDate/:endDate"
          element={<NewCxNewBookingPage />}
        />
        <Route
          path="/extcxnewbooking/:roomId/:startDate/:endDate"
          element={<ExistCxNewBookingPage />}
        />
        <Route path="/admin-login" element={<AdminLogInPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* <Route path="/testpage" element={<Testpage />} /> */}

        {/* <Route path="/allProperties" element={<StayhereProperties />} />
        <Route path="/allRooms" element={<StayhereRooms />} />
        <Route path="/allCustomers" element={<Customers />} />*/}
      </Routes>
    </ThemeProvider>
  );
}

export default App;
