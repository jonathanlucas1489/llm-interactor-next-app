/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useAskQuestion = () => {
  const [isLoading, setIsLoading] = useState(false);

  const askQuestion = async (question: string, setMessages: any) => {
    setMessages((prevMessages: any[]) => [
      ...prevMessages,
      { text: question, isUser: true },
    ]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}documents/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: question }),
      });

      if (!response.ok) throw new Error("Failed to process the question.");

      const backendData = await response.json();
      setMessages((prevMessages: any[]) => [
        ...prevMessages,
        { text: backendData.llmResponse || "No text extracted.", isUser: false },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, askQuestion };
};
