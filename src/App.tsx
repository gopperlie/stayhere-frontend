import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FindListingsPage from "./pages/FindListings";
import AdminLogInPage from "./pages/AdminLogIn";
import { useState, createContext } from "react";
import * as authService from "../src/services/authService";
import AdminDashPage from "./pages/AdminDash";
export const AuthedUserContext = createContext(null);

function App() {
  const [user, setUser] = useState(authService.getUser());
  return (
    <AuthedUserContext.Provider value={user}>
      <Routes>
        {user ? (
          <>
            {/* Protected Route for Admin */}
            <Route path="/admin-dashboard" element={<AdminDashPage />} />
          </>
        ) : (
          <>
            {/*Public Routes*/}
            <Route path="/" element={<HomePage />} />
          </>
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="/listings" element={<FindListingsPage />} />
        <Route
          path="/admin-login"
          element={<AdminLogInPage setUser={setUser} />}
        />

        {/* <Route path="/allProperties" element={<StayhereProperties />} />
        <Route path="/allRooms" element={<StayhereRooms />} />
        <Route path="/allCustomers" element={<Customers />} />
        <Route path="/allBookings" element={<Bookings />} /> */}
      </Routes>
    </AuthedUserContext.Provider>
  );
}

export default App;
