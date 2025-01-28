'use client';

import { Stack, Typography, Button, Box, TextField } from "@mui/material";
import { useState } from "react";

export default function Home() {
  // const [file, setFile] = useState<File | null>(null);
  const [responseText, setResponseText] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    const filePath = "https://upload.wikimedia.org/wikipedia/commons/7/75/Dan%27l_Druce%2C_Blacksmith_-_Illustrated_London_News%2C_November_18%2C_1876_-_text.png"; 
  
    try {
      setIsLoading(true);
  
      const response = await fetch("http://localhost:3030/documents/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filePath }), 
      });
  
      console.log(response)
      if (!response.ok) {
        throw new Error("Failed to upload the file.");
      }
  
      const data = await response.json();
      setResponseText(data.llmResponse || "No text extracted.");
    } catch (error) {
      console.error(error);
      alert("There was an error uploading the file.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack spacing={4} justifyContent="center" alignItems="center" bgcolor="black" minHeight="100vh" p={4}>
      <Box textAlign="center" width="100%" maxWidth="500px">
        <Typography color="white" variant="h6" mb={2}>
          Select and Upload Your Document
        </Typography>
        <TextField
          type="file"
          fullWidth
          inputProps={{ accept: ".png,.jpg,.jpeg,.pdf" }}
          onChange={handleFileChange}
          sx={{ bgcolor: "white", borderRadius: 1, mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleUpload}
          disabled={isLoading}
          fullWidth
        >
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </Box>
      
      {responseText && (
        <Box textAlign="center" mt={4} p={2} bgcolor="white" borderRadius={2} maxWidth="500px">
          <Typography variant="body1" color="black">
            Extracted Text:
          </Typography>
          <Typography variant="body2" color="gray">
            {responseText}
          </Typography>
        </Box>
      )}
    </Stack>
  );
}
