'use client';

import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainInteractorInterface from "./components/MainInteractorInterface";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "black",
        minHeight: "100vh",
        width: "100vw", 
        position: "relative",
        padding: 5, 
      }}
    >
      {token ? (
        <Box>
          <Typography variant="h6" color="white" ml={4}>Welcome!</Typography>
          <MainInteractorInterface />
          <Button sx={{ml: 4}} variant="contained" color="error" onClick={handleLogout}>Logout</Button>
        </Box>
      ) : (
        <>
          <Login onLogin={(newToken) => setToken(newToken)} />
          <Typography variant="h6" color="white" mx={"auto"}>Or</Typography>

          <Signup onLogin={(newToken) => setToken(newToken)} />
        </>
      )}
    </Stack>
  );
}
