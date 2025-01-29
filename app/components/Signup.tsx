import { useState } from "react";
import { Box, TextField, Button, Typography, Alert, CircularProgress } from "@mui/material";
import { useSignup } from "../hooks/useSignup";

interface SignupProps {
  onLogin: (token: string) => void;
}

export default function Signup({ onLogin }: SignupProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, signup } = useSignup();

  const handleSignup = async () => {
    const response = await signup(email, password);
    if (response) {
      localStorage.setItem("token", response.token);
      onLogin(response.token);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: 300, bgcolor: "white", p: 5 }}>
      {error && <Alert variant="filled" severity="error">{error}</Alert>}
      <Typography variant="h6" color="black">Signup</Typography>
      <TextField label="Email" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField label="Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="secondary" onClick={handleSignup} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : "Signup"}
      </Button>
    </Box>
  );
}
