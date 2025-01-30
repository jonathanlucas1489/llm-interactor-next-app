/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

interface SignupResponse {
  token: string;
  userId: string;
}

export const useSignup = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const signup = async (email: string, password: string): Promise<SignupResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Error during signup. Try a different email.");
        return null;
      }

      const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API_URL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!loginResponse.ok) {
        setError("Signup succeeded, but login failed.");
        return null;
      }

      const data = await loginResponse.json();

      return { token: data.token, userId: data.userId };

    } catch (err) {
      setError("An error occurred. Please try again later.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, signup };
};
