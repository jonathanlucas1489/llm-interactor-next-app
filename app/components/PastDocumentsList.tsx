/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from "react";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import { useGetDocuments } from "../hooks/useGetDocuments";

interface PastDocumentsListProps {
  selectedDocument: string | null;
  setSelectedDocument: (id: string) => void;
  setMessages: (messages: { text: string; isUser: boolean }[]) => void;
}

export default function PastDocumentsList({ selectedDocument, setSelectedDocument, setMessages }: PastDocumentsListProps) {
  const { isLoading, documents, error, getDocuments } = useGetDocuments();

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
              setSelectedDocument(document.id)
              const interactions = document.interactions.map((interaction: { content: string; isFromUser: boolean; }) => ({
                text: interaction.content,
                isUser: interaction.isFromUser,
              }));
              setMessages(interactions); 
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
