/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadDocument = async (imageUrl: string, setMessages: any): Promise<void> => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId")

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}documents/upload`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filePath: imageUrl, userId }),
      });

      if (!response.ok) throw new Error("Failed to process the backend request.");

      const backendData = await response.json();
      setMessages((prevMessages: any[]) => [
        ...prevMessages,
        { text: backendData.llmResponse || "No text extracted.", isUser: false },
      ]);
      localStorage.setItem("documentId", backendData.documentId);
    } catch (error) {
      console.error(error);
      alert("There was an error processing the backend request.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, uploadDocument };
};
