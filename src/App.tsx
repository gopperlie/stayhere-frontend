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
import { useAuthedUser } from "./components/useAuthedUserHook";
import UnauthorizedPage from "./pages/UnauthorisedPage";
import ExistCxNewBookingPage from "./pages/ExistCxNewBooking";

function App() {
  const { user, setUser } = useAuthedUser();
  const handleSignout: () => void = () => {
    authService.signout(); // Call the signout function
    setUser(null); // Reset user state
  };

  return (
    <>
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

        {/* <Route path="/allProperties" element={<StayhereProperties />} />
        <Route path="/allRooms" element={<StayhereRooms />} />
        <Route path="/allCustomers" element={<Customers />} />*/}
      </Routes>
    </>
  );
}

export default App;
