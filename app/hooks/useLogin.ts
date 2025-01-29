/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Invalid email or password. Please try again.");
        return null;
      }

      const data = await response.json();
      return { token: data.token };
    } catch (err) {
      setError("An error occurred. Please try again later.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, login };
};
