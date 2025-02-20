/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import { DocumentProps } from "../page";

interface PastDocumentsListProps {
  selectedDocument: DocumentProps | null;
  setSelectedDocument: (document: DocumentProps) => void;
  setMessages: (messages: { text: string; isUser: boolean }[]) => void;
  isLoading: boolean;
  documents: any[];
  error: string | null;
  getDocuments: () => void;
  setIsCurrentInChat: (isInChat: boolean) => void;
}

export default function PastDocumentsList({ 
  selectedDocument, 
  setSelectedDocument, 
  setMessages, 
  isLoading, 
  documents, 
  error, 
  getDocuments,
  setIsCurrentInChat
}: PastDocumentsListProps) {
  useEffect(() => {
    getDocuments();
  }, []);

  if (isLoading) return <Typography color="white">Loading...</Typography>;
  if (error) return <Typography color="red">{error}</Typography>;

  return (
    <Box
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        padding: "10px",
        borderRadius: "8px",
        zIndex: 1000,
      }}
    >
      <Typography color="white" variant="h6" mb={2}>
        Past Documents
      </Typography>
      <List>
        {documents.map((document, index) => (
          <ListItem
            key={index}
            sx={{
              display: "flex",
              alignItems: "center",
              marginBottom: "20px",
              cursor: "pointer",
              border: selectedDocument === document.id ? "1px solid #00bcd4" : "1px solid white",
            }}
            onClick={() => {
              setSelectedDocument({documentUrl: document.imageUrl, selectedDocumentId: document.id, name: document.name});
              const interactions = document.interactions.map((interaction: { content: string; isFromUser: boolean; }) => ({
                text: interaction.content,
                isUser: interaction.isFromUser,
              }));
              setMessages(interactions); 
              setIsCurrentInChat(true);
              localStorage.setItem("documentId", document.id);
            }}
          >
            {document.imageUrl && (
              <Box sx={{ marginRight: "10px" }}>
                <Image
                  src={document.imageUrl}
                  alt={document.url}
                  width={50}
                  height={50}
                  style={{
                    objectFit: "cover",
                    borderRadius: "5px",
                  }}
                />
              </Box>
            )}

            <ListItemText
              primary={<Typography color="white">{document.url}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
