import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
// import * as authService from "../src/services/authService";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/listings" element={<FindListings />} />
        <Route path="/allProperties" element={<StayhereProperties />} />
        <Route path="/allRooms" element={<StayhereRooms />} />
        <Route path="/allCustomers" element={<Customers />} />
        <Route path="/allBookings" element={<Bookings />} /> */}
      </Routes>
    </>
  );
}

export default App;
