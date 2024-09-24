import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  LinearProgress,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Placeholder data for monthly bookings
const monthlyData = [
  { month: "Jan", bookings: 10 },
  { month: "Feb", bookings: 15 },
  { month: "Mar", bookings: 20 },
  { month: "Apr", bookings: 25 },
  { month: "May", bookings: 30 },
  { month: "Jun", bookings: 35 },
  { month: "Jul", bookings: 40 },
  { month: "Aug", bookings: 30 },
  { month: "Sep", bookings: 50 },
  { month: "Oct", bookings: 60 },
  { month: "Nov", bookings: 70 },
  { month: "Dec", bookings: 80 },
];

const Dashboard = () => {
  // Placeholder data for total bookings and customers
  const totalBookings = 120;
  const totalCustomers = 75;
  const bookingsThisMonth = 30;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hotel Booking Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Total Bookings Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Bookings
              </Typography>
              <Typography variant="h2">{totalBookings}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Total Customers Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Total Customers
              </Typography>
              <Typography variant="h2">{totalCustomers}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Bookings This Month Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Bookings This Month
              </Typography>
              <Typography variant="h2">{bookingsThisMonth}</Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                View Details
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Progress Indicator */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Monthly Booking Progress</Typography>
              <LinearProgress
                variant="determinate"
                value={(bookingsThisMonth / 100) * 100}
              />
              <Typography variant="caption" sx={{ mt: 1 }}>
                {bookingsThisMonth} bookings this month out of 100 goal
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5">Monthly Bookings</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
