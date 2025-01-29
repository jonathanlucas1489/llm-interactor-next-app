import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useLogin } from "../hooks/useLogin";

interface LoginProps {
  onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, login } = useLogin();

  const handleLogin = async () => {
    const response = await login(email, password);
    if (response) {
      localStorage.setItem("token", response.token);
      onLogin(response.token);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, bgcolor: "white", p: 5 }}>
      {error && <Alert variant="filled" severity="error">{error}</Alert>}
      <Typography variant="h6" color="black">Login</Typography>
      <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" onClick={handleLogin} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>
    </Box>
  );
}
