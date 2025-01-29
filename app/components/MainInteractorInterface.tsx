/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from "react";
import { Stack, Typography, Box, Divider, CircularProgress } from "@mui/material";
import { ImageKitProvider } from "imagekitio-next";
import UploadComponent from "./UploadComponent";
import ResponseComponent from "./ReponseComponent";
import QuestionForm from "./QuestionForm";
import { useAskQuestion } from "../hooks/useAskQuestion";
import { useUpload } from "../hooks/useUpload";

const authenticator = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_OWN_API_URL}api/auth`);
  if (!response.ok) {
    throw new Error("Authentication failed");
  }
  return response.json();
};

export default function MainInteractorInterface() {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const { isLoading, uploadDocument } = useUpload();
  const { askQuestion, isLoading: isLoadingAskQuestion } = useAskQuestion();

  console.log(messages)

  const onError = (err: any) => {
    console.error("Error uploading file", err);
    alert("There was an error uploading the file. Please try again.");
  };

  const onSuccess = async (res: any) => {
    const imageUrl = res.url;
    await uploadDocument(imageUrl, setMessages);
  };


  const onAsk = async (question: string) => {
    await askQuestion(question, setMessages);
  };

  return (
    <Stack spacing={4} justifyContent="center" alignItems="center" bgcolor="black" p={4}>
      <Box textAlign="center" width="100%" maxWidth="500px">
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
      </Box>

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
      <Divider sx={{backgroundColor: "gray"}}/>
      {isLoadingAskQuestion ? <CircularProgress/> : null}
      <QuestionForm onAsk={onAsk} disabled={!(messages.length > 0 && !isLoadingAskQuestion)} />
    </Stack>
  );
}
