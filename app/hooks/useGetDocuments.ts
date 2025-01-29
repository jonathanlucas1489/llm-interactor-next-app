/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export const useGetDocuments = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [documents, setDocuments] = useState<any[]>([]); 
  const [error, setError] = useState<string | null>(null); 

  const getDocuments = async (): Promise<void> => {
    setIsLoading(true);
    const userId = localStorage.getItem("userId");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}documents/get-documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: userId }),
      });

      if (!response.ok) throw new Error("Failed to process the backend request.");

      const backendData = await response.json();
      
      setDocuments(backendData.documents);
    } catch (error: any) {
      console.error(error);
      setError("There was an error processing the backend request.");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, documents, error, getDocuments };
};
