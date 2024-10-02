import { FC } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Paper, Button } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";
import { useAuthedUser } from "@/providers/useAuthedUserHook";

// type user = {
//   username: string;
//   user_id: number;
//   role: string;
//   iat: number;
//   exp: number;
// };

// interface AdminLogInPageProps {
//   setUser: React.Dispatch<user | null>;
// }

const AdminLogInPage: FC = () => {
  const { setUser } = useAuthedUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const updateMessage = (msg: string) => {
    setMessage(msg);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const user = await authService.signin(formData);
      setUser(user);
      console.log(user);
      navigate("/admin-dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        updateMessage(err.message);
      } else {
        updateMessage("An unknown error occurred");
      }
    }
  };

  return (
    <Box
      component="form"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      noValidate
      autoComplete="off"
    >
      <Paper elevation={10} sx={{ padding: 6 }}>
        <p>{message}</p>
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            id="username"
            label="Username"
            fullWidth
            margin="dense"
            variant="outlined"
            value={formData.username}
            name="username"
            onChange={handleChange}
            required
          />
        </Box>
        <Box sx={{ marginBottom: 3 }}>
          <TextField
            id="password"
            label="Password"
            fullWidth
            margin="dense"
            variant="outlined"
            type="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </Paper>
    </Box>
  );
};
export default AdminLogInPage;
