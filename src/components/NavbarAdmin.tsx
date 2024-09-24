import { FC } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface NavbarAdminProps {
  handleSignout: () => void;
}

const NavbarAdmin: FC<NavbarAdminProps> = ({ handleSignout }) => {
  const navigate = useNavigate();
  const handleSignoutClick = () => {
    handleSignout();
    navigate("/admin-login"); // Redirect to admin-login after signing out
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          stayhere Admin
        </Typography>
        <Button color="inherit" component={Link} to="/list-bookings">
          All Bookings
        </Button>
        <Button color="inherit" component={Link} to="">
          Customers
        </Button>
        <Button color="inherit" onClick={handleSignoutClick}>
          Signout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;
