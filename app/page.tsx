'use client';

import { useState, useEffect } from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MainInteractorInterface from "./components/MainInteractorInterface";
import PastDocumentsList from "./components/PastDocumentsList";
import { useGetDocuments } from "./hooks/useGetDocuments";

export interface DocumentInteraction {
  content: string;
  createdAt: string;
  documentId: string;
  id: string;
  isFromUser: boolean;
}

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [isCurrentInChat, setIsCurrentInChat ] = useState<boolean>(false);

  const { isLoading, documents, error, getDocuments } = useGetDocuments();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("documentId");
    setSelectedDocument(null);
    setMessages([]);
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
      <Typography variant="h1" color="white" textAlign="center" mb={8}>Paggo - OCR Case</Typography>
      {token ? (
        <Box>
          <Stack direction="row">
            <PastDocumentsList 
              selectedDocument={selectedDocument} 
              setSelectedDocument={setSelectedDocument}  
              setMessages={setMessages}
              isLoading={isLoading} 
              documents={documents} 
              error={error}
              getDocuments={getDocuments}
              setIsCurrentInChat={setIsCurrentInChat}
            />
            <MainInteractorInterface 
              selectedDocument={selectedDocument} 
              setSelectedDocument={setSelectedDocument} 
              messages={messages} 
              setMessages={setMessages} 
              getDocuments={getDocuments}
              isCurrentInChat={isCurrentInChat}
              setIsCurrentInChat={setIsCurrentInChat}
            />
          </Stack>
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
