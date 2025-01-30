/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Stack, Typography, Box, Divider, CircularProgress, Button } from "@mui/material";
import { ImageKitProvider } from "imagekitio-next";
import UploadComponent from "./UploadComponent";
import ResponseComponent from "./ReponseComponent";
import QuestionForm from "./QuestionForm";
import { useAskQuestion } from "../hooks/useAskQuestion";
import { useUpload } from "../hooks/useUpload";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfDocument from "./PdfCreator";
import { DocumentProps } from "../page";

interface MainInteractorInterfaceProps {
  selectedDocument: DocumentProps | null;
  setSelectedDocument: (document: DocumentProps | null) => void;
  messages: { text: string; isUser: boolean }[];
  setMessages: (messages: { text: string; isUser: boolean }[]) => void;
  getDocuments: () => void;
  setIsCurrentInChat: (isInChat: boolean) => void;
  isCurrentInChat: boolean;
}


const authenticator = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_OWN_API_URL}api/auth`);
  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  return response.json();
};

export default function MainInteractorInterface({ isCurrentInChat, setIsCurrentInChat, selectedDocument, setSelectedDocument, messages, setMessages, getDocuments }: MainInteractorInterfaceProps) {
  const { isLoading, uploadDocument } = useUpload();

  const { askQuestion, isLoading: isLoadingAskQuestion, error } = useAskQuestion();

  const onError = (err: any) => {
    console.error("Error uploading file", err);
    alert("There was an error uploading the file. Please try again.");
  };

  const onSuccess = async (res: any) => {
    const imageUrl = res.url;
    try {
      await uploadDocument(imageUrl, setMessages);
      setIsCurrentInChat(true)
      getDocuments()
    } catch (e) {
      console.log("Error uploading image", e)
    }
  };

  const onResetChat = async () => {
    setMessages([]);
    setIsCurrentInChat(false)
    setSelectedDocument(null)
  };

  const onAsk = async (question: string) => {
    await askQuestion(question, setMessages);
  };

  return (
    <Stack spacing={4} alignItems="center" bgcolor="black" p={4}>

      {isCurrentInChat || selectedDocument ? <Button sx={{ ml: 4 }} variant="contained" color="info" onClick={onResetChat}>New Chat</Button> : null}
      {selectedDocument && (
        <PDFDownloadLink
          document={<PdfDocument imageUrl={selectedDocument.documentUrl} messages={messages} />}
        fileName={`${selectedDocument.selectedDocumentId}.pdf`}
          style={{ textDecoration: 'none', backgroundColor: 'green', padding: 8, borderRadius: 4 }}
        >
          Download PDF on this interaction
        </PDFDownloadLink>
      )}
      {!isCurrentInChat && !selectedDocument ? <Box textAlign="center" width="100%" minWidth="1500px">
        <Typography color="white" variant="h6" mb={2}>
          Select and Upload Your Document
        </Typography>
        <ImageKitProvider publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY} urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT} authenticator={authenticator}>
          <UploadComponent
            onSuccess={onSuccess}
            onError={onError}
            isLoading={isLoading}
          />
        </ImageKitProvider>
      </Box> : null}
      <Box width="100%">
        <Stack spacing={2}>
          {messages.map((message, index) => (
            <ResponseComponent
              key={index}
              responseText={message.text}
              isUser={message.isUser}
            />
          ))}
        </Stack>
      </Box>
      <Divider sx={{ backgroundColor: "gray" }} />
      {isLoadingAskQuestion ? <CircularProgress /> : null}
      {isCurrentInChat ? <QuestionForm onAsk={onAsk} disabled={!(messages.length > 0 && !isLoadingAskQuestion)} /> : null}
    </Stack>
  );
}
