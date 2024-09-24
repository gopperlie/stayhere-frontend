import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindListingsPage from "./pages/FindListings";
import AdminLogInPage from "./pages/AdminLogIn";
import { useState, createContext } from "react";
import * as authService from "../src/services/authService";
import AdminDashPage from "./pages/AdminDash";
import NavbarAdmin from "./components/NavbarAdmin";
import BookingsPage from "./pages/Bookings";
export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(authService.getUser());
  const handleSignout: () => void = () => {
    authService.signout(); // Call the signout function
    setUser(null); // Reset user state
  };

  return (
    <AuthedUserContext.Provider value={user}>
      {user && <NavbarAdmin handleSignout={handleSignout} />}
      <Routes>
        {user ? (
          <>
            {/* Protected Route for Admin */}
            <Route path="/admin-dashboard" element={<AdminDashPage />} />
            <Route path="/list-bookings" element={<BookingsPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<HomePage />} />
          </>
        )}
        {/*Public Routes*/}
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<FindListingsPage />} />
        <Route
          path="/admin-login"
          element={<AdminLogInPage setUser={setUser} />}
        />

        {/* <Route path="/allProperties" element={<StayhereProperties />} />
        <Route path="/allRooms" element={<StayhereRooms />} />
        <Route path="/allCustomers" element={<Customers />} />*/}
      </Routes>
    </AuthedUserContext.Provider>
  );
}

export default App;
